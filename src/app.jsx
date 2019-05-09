import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch  } from 'react-router-dom';
//import { Router, Route, Redirect, Link, hashHistory } from 'react-router';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/issues">Home</Link>
        </li>
        
        <li>
          <Link to="*">No Match</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/issues" component={IssueList} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="*" component={NoMatch} />        
      </Switch>

    </div>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}