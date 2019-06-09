/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import {
  NavItem, Modal, Form, FormGroup, FormControl,
  Button, ButtonToolbar, FormLabel, Row, Col
} from 'react-bootstrap';
import Toast from './Toast.jsx';

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.submit = this.submit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  submit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.issueAdd;
    const newIssue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    };
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          this.props.history.push(`/issues/${updatedIssue._id}`);
        });
      } else {
        response.json().then((error) => {
          alert(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    return (
      <NavItem
        style={{ color: 'white', alignSelf: 'center' }}
      >
        <i className="fa fa-plus-square" aria-hidden="true" onClick={this.showModal}/>
        <Modal keyboard show={this.state.showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup as={Row}>
                <Col sm={3}>Owner</Col>
                <Col sm={9}>
                  <FormControl name="owner" />
                </Col>
              </FormGroup>
            
              <FormGroup as={Row}>
                <Col sm={3}>Title</Col>
                <Col sm={9}>
                  <FormControl name="title" />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" variant="primary" onClick={this.submit}>
                Submit
                    </Button>
              <Button variant="light" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={this.state.showing} message={this.state.toastMessage}
          onDismiss={this.dismissToast} variant={this.state.toastType} />
      </NavItem>
    );
  }
}

IssueAddNavItem.propTypes = {
  router: PropTypes.object
}

export default withRouter(IssueAddNavItem);
