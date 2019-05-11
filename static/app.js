'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _reactRouter = require('react-router');

var _IssueList = require('./IssueList.jsx');

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = require('./IssueEdit.jsx');

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');
var NoMatch = function NoMatch() {
  return _react2.default.createElement(
    'p',
    null,
    'Page Not Found'
  );
};

var RoutedApp = function RoutedApp() {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/issues' },
            'Home'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '*' },
            'No Match'
          )
        )
      ),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/issues', component: _IssueList2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/issues/:id', component: _IssueEdit2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '*', component: NoMatch })
    )
  );
};

_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);

if (module.hot) {
  module.hot.accept();
}