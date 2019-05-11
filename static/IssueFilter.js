'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueFilter = function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: 'render',

    // constructor() {
    //   super();
    //   this.clearFilter = this.clearFilter.bind(this);
    //   this.setFilterOpen = this.setFilterOpen.bind(this);
    //   this.setFilterAssigned = this.setFilterAssigned.bind(this);
    // }

    // setFilterOpen(e) {
    //   e.preventDefault();
    //   this.props.setFilter({ status: 'Open' });
    // }

    // setFilterAssigned(e) {
    //   e.preventDefault();
    //   this.props.setFilter({ status: 'Assigned' });
    // }

    // clearFilter(e) {
    //   e.preventDefault();
    //   this.props.setFilter({});
    // }

    value: function render() {
      var Separator = function Separator() {
        return _react2.default.createElement(
          'span',
          null,
          ' | '
        );
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/issues' },
          'All Issues'
        ),
        _react2.default.createElement(Separator, null),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: { pathname: '/issues', query: { status: 'Open' } } },
          'Open Issues'
        ),
        _react2.default.createElement(Separator, null),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: { pathname: '/issues', query: { status: 'Assigned' } } },
          'Assigned Issues'
        )
      );
    }
  }]);

  return IssueFilter;
}(_react2.default.Component);

exports.default = IssueFilter;


IssueFilter.propTypes = {
  setFilter: _propTypes2.default.func.isRequired
};