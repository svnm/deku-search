'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

var _SearchItemInArray = require('./SearchItemInArray');

var _SearchItemInArray2 = _interopRequireDefault(_SearchItemInArray);

var _SearchItemInArrayObjects = require('./SearchItemInArrayObjects');

var _SearchItemInArrayObjects2 = _interopRequireDefault(_SearchItemInArrayObjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = {
  initialState: function initialState() {
    return { matchingItems: [] };
  },
  render: function render(component) {
    var props = component.props;
    var state = component.state;
    var matchingItems = state.matchingItems;

    var items = [];

    if (props.keys !== undefined) {
      /* items for hash results */
      items = matchingItems.map(function (item, i) {
        return (0, _virtualElement2.default)(
          'li',
          { key: i,
            'class': 'menu-item',
            onClick: selectAutoComplete },
          props.keys.map(function (itemKey, j) {
            return (0, _virtualElement2.default)(
              'a',
              { key: j },
              item[itemKey]
            );
          })
        );
      });
    } else {
      /* items for a simple array */
      items = matchingItems.map(function (item, i) {
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
    }

    return (0, _virtualElement2.default)(
      'div',
      { 'class': 'deku-search' },
      (0, _virtualElement2.default)('input', { type: 'text',
        'class': 'input',
        placeholder: props.placeHolder,
        onKeyUp: changeInput.bind(this) }),
      (0, _virtualElement2.default)(
        'div',
        { 'class': 'menu menu-hidden' },
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
    var props = component.props;
    var state = component.state;
  },
  beforeUnmount: function beforeUnmount(component) {
    var props = component.props;
    var state = component.state;
  }
}; /** @jsx element */

exports.default = Search;

function changeInput(e, component, setState) {
  var props = component.props;
  var state = component.state;

  /* change menu to open */

  var menu = e.target.parentElement.querySelectorAll('.menu')[0];
  menu.className = 'menu menu-open';

  var searchValue = e.target.value;
  var result = undefined;
  if (props.keys !== undefined && props.searchKey !== undefined) {
    /* hash */
    result = (0, _SearchItemInArrayObjects2.default)(props.items, searchValue, props.searchKey);
  } else {
    /* array */
    result = (0, _SearchItemInArray2.default)(props.items, searchValue);
  }
  setState({ matchingItems: result });

  if (typeof props.onChange !== 'undefined') {
    props.onChange(e, result);
  }
}

function selectAutoComplete(e, component, setState) {
  var props = component.props;
  var state = component.state;

  /* change menu to hidden */

  e.target.parentNode.parentNode.parentNode.className = 'menu menu-hidden';

  /* set selected search result */
  var result = e.target.innerHTML;
  var input = e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input')[0];
  input.value = result;

  if (typeof props.onClick !== 'undefined') {
    props.onClick(e, result);
  }
}