import React from 'react';
import PropTypes from 'prop-types';
export default class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status || '',
      effort_gte: props.effort_gte || '',
      effort_lte: props.effort_lte || '',
      changed: false,      
    }
    
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffort_gte = this.onChangeEffort_gte.bind(this);
    this.onChangeEffort_lte = this.onChangeEffort_lte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.status || '',
      effort_gte: newProps.effort_gte || '',
      effort_lte: newProps.effort_lte || '',
      changed: false
    });
  }

  onChangeStatus(e){
    this.setState({status: e.target.value, changed: true});
  }
  onChangeEffort_gte(e){
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/))
      this.setState({effort_gte: effortString, changed: true});
  }
  onChangeEffort_lte(e){
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/))
      this.setState({effort_lte: effortString, changed: true});
  }

  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    
    
    this.props.setFilter(newFilter);
  }

  clearFilter() {
    this.props.setFilter({});
  }

  resetFilter() {
    this.setState({
      status: this.props.status || '',
      changed: false,
    });
  }

  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">Any</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="New">New</option>
        </select>

        Effect between:
        <input size={5} value={this.state.effort_gte} onChange={this.onChangeEffort_gte}/>
        <input size={5} value={this.state.effort_lte} onChange={this.onChangeEffort_lte}/>
        <button onClick={this.applyFilter}>Apply</button>
        <button onClick={this.resetFilter}>Reset</button>
        <button onClick={this.clearFilter}>Clear</button>
      </div>
    );
  }
}

IssueFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}
