'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deku = require('deku');

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

var _SearchItemInArray = require('./SearchItemInArray');

var _SearchItemInArray2 = _interopRequireDefault(_SearchItemInArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = {
  initialState: function initialState() {
    return { matchingItems: [] };
  },
  render: function render(component) {
    var props = component.props;
    var state = component.state;
    var matchingItems = state.matchingItems;

    var items = state.matchingItems.map(function (item, i) {
      return (0, _virtualElement2.default)(
        'li',
        { key: i, 'class': 'menu-item' },
        (0, _virtualElement2.default)(
          'a',
          { onClick: selectAutoComplete },
          item
        )
      );
    });

    return (0, _virtualElement2.default)(
      'div',
      { 'class': 'deku-search' },
      (0, _virtualElement2.default)('input', {
        type: 'text',
        'class': 'input',
        placeholder: props.placeHolder,
        ref: 'searchInput',
        onKeyUp: changeInput }),
      (0, _virtualElement2.default)(
        'div',
        { 'class': 'menu', ref: 'autocomplete' },
        (0, _virtualElement2.default)(
          'ul',
          { 'class': 'menu-items' },
          items
        )
      )
    );
  },
  afterUpdate: function afterUpdate(component) {
    var props = component.props;
    var state = component.state;
  },
  afterMount: function afterMount(component, el, setState) {
    var counter = 0;
    component.interval = setInterval(function () {
      setState({ secondsElapsed: counter++ });
    }, 1000);
  },
  beforeUnmount: function beforeUnmount(component) {
    clearInterval(component.interval);
  }
}; /** @jsx element */

exports.default = Search;

function changeInput(e) {
  if (typeof props.onChange !== 'undefined') {
    props.onChange(e);
  }
  var searchValue = this.refs.searchInput.value;
  var result = (0, _SearchItemInArray2.default)(props.items, searchValue);
  this.setState({ matchingItems: result });
}

function selectAutoComplete(e) {
  if (typeof props.onClick !== 'undefined') {
    props.onClick(e);
  }

  var result = e.target.innerHTML;
  this.refs.searchInput.value = result;
}