import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Link, Route, HashRouter } from 'react-router-dom';
import { Redirect, withRouter } from "react-router";

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = ({match}) => {
  return (
    <div>
      <div className="header">
        <h1>Issue Tracker</h1>
      </div>
      <div className="content">
      
        <HashRouter>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/issues">Issues</Link>
            </li>
            <li>
              <Link to="*">No Match</Link>
            </li>
          </ul>
        </HashRouter>
        <RoutedApp/>
      </div>
      <div className="footer">
        Full source code available at this   <nbsp/>
        <a href="https://github.com/vasansr/pro-mearn-stack">Github Link</a> <br />
        And Update 2019 at this    <nbsp/>
        <a href="https://github.com/nguyenvandai61/Pro-MERN-Stack">Github Link</a>
      </div>
    </div> 
  )
}

App.propTypes = {
  children: PropTypes.object.isRequired
}


const RoutedApp = () => (
  <Router>
    <div>
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



ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}