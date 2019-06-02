import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID} from 'mongodb';
import Issue from './issue.js';
import path from 'path';
import { objectTypeIndexer } from '@babel/types';
const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());


let db;

app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.effort_gte || req.query.effort_lte) filter.effort = {};

  if (req.query.effort_gte) {
    filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  }

  if (req.query.effort_lte) {
    filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  }


  db.collection('issues').find(filter).toArray()
  .then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/issues/:id', (req, res)=> {
  let issueId;
  try {
    issueId = new ObjectID(req.params.id); 
  } catch (error) {
    res.status(422).json({message: `Invalid issue Id format ${req.params.id}`});
    return;
  }

  // Tra ve an issue
  db.collection('issues').find({_id: issueId}).limit(1)
  .next().then( issue => {
    if (!issue) res.status(404).json({message: `No such issue: ${issueId}`})
      else res.json(issue);
  }).catch(error => {
    res.status(500).json({message: `Internal server Error: ${error}`})
  })
})

app.get('*', (req, res)=>{
  res.sendFile(path.resolve('static/index.html'));
})




app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }
  console.log(newIssue);
  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then(result =>
    db.collection('issues').find({ _id: result.insertedId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }).then((connection) => {
  db = connection.db('issuetracker');
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch((error) => {
  console.log('ERROR:', error);
});
