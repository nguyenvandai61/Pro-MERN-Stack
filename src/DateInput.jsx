/* eslint-disable linebreak-style */
import React from 'react';
export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', focused: false, valid: true };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const value = this.unformat(this.state.value);
    const valid = this.state.value === '' || value != null;
    if (valid !== this.state.valid && this.props.onValidityChange) {
      this.props.onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) this.props.onChange(e, value);
  }

  displayFormat(date) {
    return date != null ? date : '';
  }

  editFormat(date) {
    return date != null ? date.toISOString().substr(0, 10) : '';
  }

  unformat(str) {
    const val = new Date(str);
    return isNaN(val.getTime()) ? null : val;
  }

  render() {
    const value = (this.state.focused || !this.state.valid) ? this.state.value
      : this.displayFormat(this.props.value);
    const childProps = Object.assign({}, this.props);
    delete childProps.onValidityChange;
    return (
      <input
        type="text"
        size={20}
        {...childProps}
        value={value}
        placeholder={this.state.focused ? 'yyyy-mm-dd' : ''}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
