/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Collapse } from 'react-bootstrap';

export default class Toast extends React.Component {
  componentDidUpdate() {
    if (this.props.showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(this.props.onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    return (
      <Collapse in={this.props.showing}>
        <div>
          <Alert variant={this.props.variant}>
            {this.props.message}
          </Alert>
        </div>
      </Collapse>
    );
  }
}

Toast.defaultProps = {
  variant: 'success',
};
