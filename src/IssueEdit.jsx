/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Card, Form, FormGroup, FormControl, ButtonToolbar, Button,
} from 'react-bootstrap';
import { Col, Row, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DateInput from './DateInput.jsx';
import NumInput from './NumInput.jsx';
import Toast from './Toast.jsx';

export default class IssueEdit extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      issue: {
        _id: '',
        title: '',
        status: '',
        owner: '',
        effort: null,
        completionDate: null,
        created: null,
      },
      invalidFields: {},
      showingValidation: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);

    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.issue !== this.props.issue) { this.loadData(); }
  }

  onChange(e, convertedValue) {
    const issue = Object.assign({}, this.state.issue);
    const value = (convertedValue !== undefined) ? convertedValue : e.target.value;
    issue[e.target.name] = value;
    this.setState({ issue });
  }

  onValidityChange(e, valid) {
    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[e.target.name] = true;
    } else {
      delete invalidFields[e.target.name];
    }
    this.setState({ invalidFields });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showValidation: false });
  }

  showSuccess(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  onSubmit(e) {
    e.preventDefault();
    this.showValidation();
    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }
    fetch(`/api/issues/${this.props.match.params.id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(this.state.issue),
      }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          this.setState({ issue: updatedIssue });
          this.showSuccess('Updated issue successfully!!');
        });
      } else {
        response.json().then((err) => {
          this.showError(`Failed to update issue: ${err.message}`);
        });
      }
    }).catch((err) => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  loadData() {
    fetch(`/api/issues/${this.props.match.params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((issue) => {
          issue.created = new Date(issue.created);
          issue.completionDate = issue.completionDate != null
            ? new Date(issue.completionDate) : '';
          issue.effort = (issue.effort) ? issue.effort.toString() : '';
          this.setState({ issue });
        });
      } else {
        res.json().then((err) => {
          alert(`Failed to fetch issue: ${err}`);
        });
      }
    }).catch((err) => {
      alert(`Error in Fetching data from server: ${err}`);
    });
  }


  render() {
    const { issue } = this.state;
    let validationMessage = null;
    if (Object.keys(this.state.invalidFields)
      .length !== 0 && this.state.showingValidation) {
      validationMessage = (
        <Alert variant="danger" onDismiss={this.dismissValidation}>
          Please correct invalid fields before submitting.
        </Alert>
      );
    }

    return (
      <Card>
        <Card.Header>Edit Issue</Card.Header>
        <Form onSubmit={this.onSubmit}>
          <FormGroup as={Row}>
            <Col sm={3}>ID</Col>
            <Col sm={9}>
              {issue._id}
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm={3}>Created</Col>
            <Col sm={9}>{issue.created ? issue.created.toDateString() : ''}</Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm={3}>Status</Col>
            <Col sm={9}>
              <FormControl as="select" name="status" value={issue.status} onChange={this.onChange}>
                <option value="Open">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="New">New</option>
                <option value="Fixed">Fixed</option>
                <option value="Verified">Verified</option>
                <option value="Closed">Closed</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm={3}>Owner</Col>
            <Col sm={9}>
              <FormControl name="Owner" value={issue.owner} onChange={this.onChange} />
            </Col>
          </FormGroup>


          <FormGroup as={Row}>
            <Col sm={3}>Effort</Col>
            <Col sm={9}>
              <FormControl as={NumInput} name="effort" value={issue.effort} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm={3}>Completion Date</Col>
            <Col sm={9}>
              <FormControl
                as={DateInput}
                name="completionDate"
                value={issue.completionDate}
                onChange={this.onChange}
                onValidityChange={this.onValidityChange}
              />

            </Col>
          </FormGroup>

          <FormGroup as={Row}>
            <Col sm={3}>Title</Col>
            <Col sm={9}>
              <FormControl name="Title" value={issue.title} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm={{ size: 6, offset: 3 }}>
              <ButtonToolbar>
                <Button type="submit">Submit</Button>
                <LinkContainer to="/issues">
                  <Button>
                    Back
                  </Button>
                </LinkContainer>

              </ButtonToolbar>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm={{ size: 9, offset: 3 }}>{validationMessage}</Col>
          </FormGroup>
        </Form>
        <Toast
          showing={this.state.toastVisible}
          message={this.state.toastMessage}
          onDismiss={this.state.dismissToast}
          variant={this.state.toastType}
        />
      </Card>
    );
  }
}

// IssueEdit.propTypes = {
//   params: PropTypes.object.isRequired,
// };
