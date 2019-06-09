import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
 BrowserRouter as Router, Switch, Link, Route,
} from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import {
 Navbar, Nav, NavItem, NavDropdown,
} from 'react-bootstrap';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;


const Header = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Issue Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/issues">Issues</Nav.Link>
        <Nav.Link href="/reports">Reports</Nav.Link>
      </Nav>
      <Nav inline="true">
        <NavItem
          style={{ color: 'white', alignSelf: 'center' }}
        >
          <i className="fa fa-plus-square" aria-hidden="true" />
          Create Issue
        </NavItem>
        <NavDropdown
          id="collasible-nav-dropdown"
          title={<i className="fa fa-align-justify" aria-hidden="true" />
          }
        >
          <NavDropdown.Item>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const App = ({ match }) => (
  <Router history={Router}>
    <div>
      <Header />

      <div className="content">
        <div className="container-fluid">
          <RoutedApp />
          <hr />
          <h5>
            <small>
              Full source code available at this &nbsp;
              <a href="https://github.com/vasansr/pro-mearn-stack">Github Link</a>
              <br />
              And Update 2019 at this &nbsp;
              <a href="https://github.com/nguyenvandai61/Pro-MERN-Stack">Github Link</a>
            </small>
          </h5>
        </div>
      </div>

    </div>
  </Router>
);
const RoutedApp = () => (
  <div>
    <Switch>
      <Route path="/issues" exact component={withRouter(IssueList)} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </div>
);
ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}
