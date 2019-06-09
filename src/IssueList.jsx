import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { Button, Table, Card, Collapse } from 'react-bootstrap';

import IssueFilter from './IssueFilter.jsx';


const IssueRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }
  return (
    <tr>
      <td><Link to={`/issues/${props.issue._id}`}>
        {props.issue._id.substr(-4)}
      </Link>
      </td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
      <td>{props.issue.title}</td>
      <td><Button onClick={onDeleteClick}> 
        <i className="fa fa-trash"></i> 
      </Button></td>
    </tr>
  );
}

IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
};

function IssueTable(props) {
  const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />);
  return (
    <Table bordered condensed="true" hover responsive>
      <thead>
        <tr>
          <th>Idd</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </Table>
  );
}

IssueTable.propTypes = {
  issues: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func.isRequired
};


export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    // this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);

  }

  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (newQuery === oldQuery) return;
    this.loadData();
  }

  loadData() {
    let newqs = qs.stringify(this.props.location.query);

    fetch(`/api/issues?${newqs}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch issues ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err}`);
    });
  }


  setFilter(query) {
    this.props.history.push({
      pathname: this.props.location.pathname,
      query: query
    })
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) {
        alert('Failed to delete issues');
      } else { this.loadData() }
    }).catch((err) => {
      err.json(err.message);
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Card>
            <Card.Header as="h4">
              Filter
            </Card.Header>
            <Card.Body>
              <IssueFilter setFilter={this.setFilter} />
            </Card.Body>
        </Card>
        <hr />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <hr />
      </div>
    );
  }


}

IssueList.propTypes = {
  history: PropTypes.object.isRequired
}