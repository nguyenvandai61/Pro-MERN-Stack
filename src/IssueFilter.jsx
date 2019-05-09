import React from 'react';
import { Link } from 'react-router-dom';
export default class IssueFilter extends React.Component {
    render() {
      const Separation = () => <span> | </span>
      return (
        <div>
          <Link to="/issues">All Issues</Link>
          <Separation/>
          <Link to={{pathname: "/issues", query: {status: 'Open'}}}>
          Open Issues </Link>
          <Separation/>
          <Link to={{pathname: "/issues", query: {status: 'Assigned'}}}>
            Assigned Issues
          </Link>
        </div>
      )
    }
}