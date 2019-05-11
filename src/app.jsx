import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Link, Route, HashRouter } from 'react-router-dom';
import { Redirect, withRouter } from "react-router";

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
  <Router>

    <div>
    <HashRouter>
      <ul>
        <li>
          <Link to="/issues">Home</Link>
        </li>

        <li>
          <Link to="*">No Match</Link>
        </li>
      </ul>
    </HashRouter>
      <HashRouter>
        <Switch>
          <Route path="/issues" exact component={withRouter(IssueList)} />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </HashRouter>

    </div>
  </Router>
);

// function getConfirmation(message, callback) {
//   const allowTransition = window.confirm(message);
//   callback(allowTransition);
// }

// <HashRouter getUserConfirmation={getConfirmation} />;


ReactDOM.render(<RoutedApp/>, contentNode);

if (module.hot) {
  module.hot.accept();
}