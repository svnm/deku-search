/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Search = __webpack_require__(1);
	
	var _Search2 = _interopRequireDefault(_Search);
	
	var _deku = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @jsx element */
	function HiItems(items) {
	  console.log(items);
	}
	
	var items = [{ id: 0, value: 'ruby' }, { id: 1, value: 'javascript' }, { id: 2, value: 'lua' }, { id: 3, value: 'go' }, { id: 4, value: 'julia' }];
	
	function update() {
	  render((0, _deku.element)(_Search2.default, { items: items,
	    placeholder: 'Pick your language',
	    NotFoundPlaceholder: 'No items found...',
	    maxSelected: 3,
	    multiple: true,
	    onItemsChanged: function onItemsChanged() {
	      return HiItems();
	    } }), {});
	}
	
	var render = (0, _deku.createApp)(document.body, update);
	update();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(2);
	
	var _dekuStateful = __webpack_require__(27);
	
	var _dekuStateful2 = _interopRequireDefault(_dekuStateful);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/** @jsx element */
	
	/**
	 * Autocomplete Search component
	**/
	function initialState() {
	  return {
	    menuItems: [],
	    selectedItems: [],
	    searchValue: '',
	    menuVisible: false
	  };
	}
	
	function onCreate(_ref) {
	  var props = _ref.props;
	  var state = _ref.state;
	  var setState = _ref.setState;
	  var items = props.items;
	
	  console.log('onCreate', props, state);
	  /* need to copy component mount still */
	}
	
	function render(_ref2) {
	  var props = _ref2.props;
	  var state = _ref2.state;
	  var setState = _ref2.setState;
	
	  console.log('render', props, state);
	
	  var items = props.items;
	  var initialSelected = props.initialSelected;
	  var onItemsChanged = props.onItemsChanged;
	  var placeholder = props.placeholder;
	  var NotFoundPlaceholder = props.NotFoundPlaceholder;
	  var maxSelected = props.maxSelected;
	  var multiple = props.multiple;
	  var onKeyChange = props.onKeyChange;
	  var getItemsAsync = props.getItemsAsync;
	  var menuItems = state.menuItems;
	  var selectedItems = state.selectedItems;
	  var searchValue = state.searchValue;
	  var menuVisible = state.menuVisible;
	
	  function SearchItemInArrayObjects(items, input, searchKey) {
	    var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ''), 'i');
	    return items.filter(function (item) {
	      if (reg.test(item[searchKey])) {
	        return item;
	      }
	    });
	  }
	
	  function selectMenuItem(item) {
	    multiple ? addSelected(item) : setSelected([item]);
	    hideMenu();
	  }
	
	  function showMenu() {
	    setState({ menuVisible: true });
	  }
	
	  function hideMenu() {
	    setState({ menuVisible: false });
	    resetPlaceholder();
	  }
	
	  function triggerItemsChanged() {
	    if (onItemsChanged !== undefined) {
	      onItemsChanged(selectedItems);
	    }
	  }
	
	  function triggerKeyChange(searchValue) {
	    if (onKeyChange !== undefined) {
	      onKeyChange(searchValue);
	    }
	  }
	
	  function triggerGetItemsAsync(searchValue) {
	    if (getItemsAsync !== undefined) {
	      getItemsAsync(searchValue, function () {
	        updateSearchValue(searchValue);
	      });
	    }
	  }
	
	  function setSelected(selected) {
	    setState({ selectedItems: selected }, function () {
	      triggerItemsChanged();
	    });
	  }
	
	  function addSelected(selected) {
	    var items = selectedItems;
	    items.push(selected);
	    setState({ selectedItems: items }, function () {
	      triggerItemsChanged();
	    });
	  }
	
	  function removeSelected(itemId) {
	    var items = selectedItems;
	    var itemsUpdated = items.filter(function (i) {
	      return i.id != itemId;
	    });
	    setState({ selectedItems: itemsUpdated }, function () {
	      triggerItemsChanged();
	    });
	  }
	
	  function updateSearchValue(value) {
	    setState({ searchValue: value }, function () {
	      var menuItems = SearchItemInArrayObjects(items, searchValue, 'value');
	      setMenuItems(menuItems);
	    });
	  }
	
	  function showAllMenuItems() {
	    setState({ searchValue: '' });
	    var menuItems = SearchItemInArrayObjects(items, '', 'value');
	    setMenuItems(menuItems);
	  }
	
	  function setMenuItems(items) {
	    setState({ menuItems: items });
	    if (items.length || getItemsAsync != undefined) {
	      showMenu();
	    } else {
	      hideMenu();
	    }
	  }
	
	  function itemSelected(itemId) {
	    var item = selectedItems.find(function (s) {
	      return s.id === itemId;
	    });
	    return item != undefined ? true : false;
	  }
	
	  function focusInput() {
	    showAllMenuItems();
	    document.querySelector('#searchInput').placeholder = '';
	    document.querySelector('#searchInput').value = '';
	    setTimeout(function () {
	      document.querySelector('#searchInput').focus();
	    }, 100);
	  }
	
	  function resetPlaceholder() {
	    document.querySelector('#searchInput').placeholder = '';
	  }
	
	  function handleRemove(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    removeSelected(e.target.dataset.id);
	  }
	
	  function handleFocus(e) {
	    focusInput();
	  }
	
	  function handleClick(e) {
	    focusInput();
	  }
	
	  function handleItemClick(e) {
	    focusInput();
	  }
	
	  function handleSelect(e) {
	    var element = e.currentTarget.children[0];
	    var item = { id: parseInt(element.dataset.id), value: element.innerHTML.replace(/&amp;/g, '&') };
	    selectMenuItem(item);
	  }
	
	  function handleKeyChange(e) {
	    var value = document.querySelector('#searchInput').value;
	    triggerKeyChange(value);
	    if (getItemsAsync != undefined) {
	      triggerGetItemsAsync(value);
	    } else {
	      updateSearchValue(value);
	    }
	  }
	
	  function renderMenuItems() {
	    if (!menuItems.length) {
	      return (0, _deku.element)('li', { 'class': 'autocomplete__item autocomplete__item--disabled' }, (0, _deku.element)('span', { 'data-id': 0 }, NotFoundPlaceholder));
	    }
	
	    var items = menuItems.map(function (item, i) {
	      if (itemSelected(item.id)) {
	        return (0, _deku.element)('li', { key: i, 'class': 'autocomplete__item autocomplete__item--disabled' }, (0, _deku.element)('span', { key: i, 'data-id': item.id, innerHTML: { __html: item.value } }));
	      } else {
	        return (0, _deku.element)('li', { key: i, 'class': 'autocomplete__item', onClick: function onClick() {
	            return handleSelect();
	          } }, (0, _deku.element)('span', { key: i, 'data-id': item.id, innerHTML: { __html: item.value } }));
	      }
	    });
	    return items;
	  }
	
	  function renderSelectedItems() {
	    if (!selectedItems.length && multiple) return null;
	
	    if (!selectedItems.length && !multiple) {
	      return (0, _deku.element)('li', { 'class': 'autocomplete__item autocomplete__item--selected autocomplete__item__dropdown',
	        onClick: function onClick() {
	          return handleItemClick();
	        } }, (0, _deku.element)('span', { innerHTML: { __html: placeholder } }), (0, _deku.element)('span', { 'class': 'autocomplete__dropdown' }));
	    }
	
	    var items = selectedItems.map(function (item, i) {
	      var itemClass = 'autocomplete__item autocomplete__item--selected autocomplete__item__dropdown';
	      var dropDown = (0, _deku.element)('span', { 'class': 'autocomplete__dropdown' });
	      var icon = (0, _deku.element)('span', { 'data-id': item.id, 'class': 'autocomplete__close',
	        onClick: function onClick() {
	          return handleRemove();
	        } });
	
	      if (multiple) {
	        dropDown = null;
	        itemClass = 'autocomplete__item autocomplete__item--selected';
	      }
	
	      return (0, _deku.element)('li', { key: i, 'class': itemClass, onClick: function onClick() {
	          return handleItemClick();
	        } }, (0, _deku.element)('span', { 'data-id': item.id, innerHTML: { __html: item.value } }), icon, dropDown);
	    });
	    return items;
	  }
	
	  function renderInput() {
	    var inputClass = 'autocomplete__input';
	    if (multiple && selectedItems.length >= maxSelected) {
	      inputClass = 'autocomplete__input autocomplete__input--hidden';
	    }
	
	    return (0, _deku.element)('input', { type: 'text',
	      'class': inputClass,
	      id: 'searchInput',
	      placeholder: placeholder,
	      onClick: function onClick() {
	        return handleClick();
	      },
	      onFocus: function onFocus() {
	        return handleFocus();
	      },
	      onKeyUp: function onKeyUp() {
	        return handleKeyChange();
	      } });
	  }
	
	  function menuClass() {
	    var menuClass = 'autocomplete__menu autocomplete__menu--hidden';
	    if (menuVisible && !multiple) {
	      menuClass = 'autocomplete__menu';
	    }
	    if (menuVisible && selectedItems.length < maxSelected) {
	      menuClass = 'autocomplete__menu';
	    }
	    return menuClass;
	  }
	
	  return (0, _deku.element)('div', { 'class': 'autocomplete' }, (0, _deku.element)('div', { 'class': 'autocomplete__selected' }, (0, _deku.element)('ul', { 'class': 'autocomplete__items' }, renderSelectedItems())), multiple ? renderInput() : null, (0, _deku.element)('div', { 'class': 'autocomplete__menu--wrap' }, (0, _deku.element)('div', { id: 'autocomplete', 'class': menuClass() }, !multiple ? renderInput() : null, (0, _deku.element)('ul', { 'class': 'autocomplete__items' }, renderMenuItems()))));
	}
	
	var Search = (0, _dekuStateful2.default)({ initialState: initialState, onCreate: onCreate, render: render });
	
	exports.default = Search;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.h = exports.dom = exports.diff = exports.vnode = exports.string = exports.element = exports.createApp = undefined;
	
	var _diff = __webpack_require__(3);
	
	var diff = _interopRequireWildcard(_diff);
	
	var _element = __webpack_require__(4);
	
	var vnode = _interopRequireWildcard(_element);
	
	var _string = __webpack_require__(13);
	
	var string = _interopRequireWildcard(_string);
	
	var _dom = __webpack_require__(15);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _app = __webpack_require__(26);
	
	var app = _interopRequireWildcard(_app);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var element = vnode.create;
	var h = vnode.create;
	var createApp = app.create;
	
	exports.createApp = createApp;
	exports.element = element;
	exports.string = string;
	exports.vnode = vnode;
	exports.diff = diff;
	exports.dom = dom;
	exports.h = h;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Actions = undefined;
	exports.diffAttributes = diffAttributes;
	exports.diffChildren = diffChildren;
	exports.diffNode = diffNode;
	
	var _element = __webpack_require__(4);
	
	var _dift = __webpack_require__(5);
	
	var diffActions = _interopRequireWildcard(_dift);
	
	var _unionType = __webpack_require__(7);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Any = function Any() {
	  return true;
	};
	var Path = function Path() {
	  return String;
	};
	
	/**
	 * Patch actions
	 */
	
	var Actions = exports.Actions = (0, _unionType2.default)({
	  setAttribute: [String, Any, Any],
	  removeAttribute: [String, Any],
	  insertChild: [Any, Number, Path],
	  removeChild: [Number],
	  updateChild: [Number, Array],
	  updateChildren: [Array],
	  insertBefore: [Number],
	  replaceNode: [Any, Any, Path],
	  removeNode: [Any],
	  sameNode: [],
	  updateThunk: [Any, Any, Path]
	});
	
	/**
	 * Diff two attribute objects and return an array of actions that represent
	 * changes to transform the old object into the new one.
	 */
	
	function diffAttributes(previous, next) {
	  var setAttribute = Actions.setAttribute;
	  var removeAttribute = Actions.removeAttribute;
	
	  var changes = [];
	  var pAttrs = previous.attributes;
	  var nAttrs = next.attributes;
	
	  for (var name in nAttrs) {
	    if (nAttrs[name] !== pAttrs[name]) {
	      changes.push(setAttribute(name, nAttrs[name], pAttrs[name]));
	    }
	  }
	
	  for (var name in pAttrs) {
	    if (!(name in nAttrs)) {
	      changes.push(removeAttribute(name, pAttrs[name]));
	    }
	  }
	
	  return changes;
	}
	
	/**
	 * Compare two arrays of virtual nodes and return an array of actions
	 * to transform the left into the right. A starting path is supplied that use
	 * recursively to build up unique paths for each node.
	 */
	
	function diffChildren(previous, next, parentPath) {
	  var insertChild = Actions.insertChild;
	  var updateChild = Actions.updateChild;
	  var removeChild = Actions.removeChild;
	  var insertBefore = Actions.insertBefore;
	  var updateChildren = Actions.updateChildren;
	  var CREATE = diffActions.CREATE;
	  var UPDATE = diffActions.UPDATE;
	  var MOVE = diffActions.MOVE;
	  var REMOVE = diffActions.REMOVE;
	
	  var previousChildren = (0, _element.groupByKey)(previous.children);
	  var nextChildren = (0, _element.groupByKey)(next.children);
	  var key = function key(a) {
	    return a.key;
	  };
	  var changes = [];
	
	  function effect(type, prev, next, pos) {
	    var nextPath = next ? (0, _element.createPath)(parentPath, next.key == null ? next.index : next.key) : null;
	    switch (type) {
	      case CREATE:
	        {
	          changes.push(insertChild(next.item, pos, nextPath));
	          break;
	        }
	      case UPDATE:
	        {
	          var actions = diffNode(prev.item, next.item, nextPath);
	          if (actions.length > 0) {
	            changes.push(updateChild(prev.index, actions));
	          }
	          break;
	        }
	      case MOVE:
	        {
	          var actions = diffNode(prev.item, next.item, nextPath);
	          actions.push(insertBefore(pos));
	          changes.push(updateChild(prev.index, actions));
	          break;
	        }
	      case REMOVE:
	        {
	          changes.push(removeChild(prev.index));
	          break;
	        }
	    }
	  }
	
	  (0, diffActions.default)(previousChildren, nextChildren, effect, key);
	
	  return updateChildren(changes);
	}
	
	/**
	 * Compare two virtual nodes and return an array of changes to turn the left
	 * into the right.
	 */
	
	function diffNode(prev, next, path) {
	  var changes = [];
	  var replaceNode = Actions.replaceNode;
	  var setAttribute = Actions.setAttribute;
	  var sameNode = Actions.sameNode;
	  var removeNode = Actions.removeNode;
	  var updateThunk = Actions.updateThunk;
	
	  // No left node to compare it to
	  // TODO: This should just return a createNode action
	
	  if (prev === null || prev === undefined) {
	    throw new Error('Left node must not be null or undefined');
	  }
	
	  // Bail out and skip updating this whole sub-tree
	  if (prev === next) {
	    changes.push(sameNode());
	    return changes;
	  }
	
	  // Remove
	  if (prev != null && next == null) {
	    changes.push(removeNode(prev));
	    return changes;
	  }
	
	  // Replace
	  if (prev.type !== next.type) {
	    changes.push(replaceNode(prev, next, path));
	    return changes;
	  }
	
	  // Text
	  if ((0, _element.isText)(next)) {
	    if (prev.nodeValue !== next.nodeValue) {
	      changes.push(setAttribute('nodeValue', next.nodeValue, prev.nodeValue));
	    }
	    return changes;
	  }
	
	  // Thunk
	  if ((0, _element.isThunk)(next)) {
	    if ((0, _element.isSameThunk)(prev, next)) {
	      changes.push(updateThunk(prev, next, path));
	    } else {
	      changes.push(replaceNode(prev, next, path));
	    }
	    return changes;
	  }
	
	  // Empty
	  if ((0, _element.isEmpty)(next)) {
	    return changes;
	  }
	
	  changes = diffAttributes(prev, next);
	  changes.push(diffChildren(prev, next, path));
	
	  return changes;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.createTextElement = createTextElement;
	exports.createEmptyElement = createEmptyElement;
	exports.createThunkElement = createThunkElement;
	exports.isValidAttribute = isValidAttribute;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * This function lets us create virtual nodes using a simple
	 * syntax. It is compatible with JSX transforms so you can use
	 * JSX to write nodes that will compile to this function.
	 *
	 * let node = element('div', { id: 'foo' }, [
	 *   element('a', { href: 'http://google.com' },
	 *     element('span', {}, 'Google'),
	 *     element('b', {}, 'Link')
	 *   )
	 * ])
	 */
	
	function create(type, attributes) {
	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }
	
	  if (!type) throw new TypeError('element() needs a type.');
	
	  attributes = attributes || {};
	  children = (children || []).reduce(reduceChildren, []);
	
	  var key = typeof attributes.key === 'string' || typeof attributes.key === 'number' ? attributes.key : undefined;
	
	  delete attributes.key;
	
	  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' || typeof type === 'function') {
	    return createThunkElement(type, key, attributes, children);
	  }
	
	  return {
	    attributes: attributes,
	    children: children,
	    type: type,
	    key: key
	  };
	}
	
	/**
	 * Cleans up the array of child elements.
	 * - Flattens nested arrays
	 * - Converts raw strings and numbers into vnodes
	 * - Filters out undefined elements
	 */
	
	function reduceChildren(children, vnode) {
	  if (typeof vnode === 'string' || typeof vnode === 'number') {
	    children.push(createTextElement(vnode));
	  } else if (vnode === null) {
	    children.push(createEmptyElement());
	  } else if (Array.isArray(vnode)) {
	    children = [].concat(_toConsumableArray(children), _toConsumableArray(vnode.reduce(reduceChildren, [])));
	  } else if (typeof vnode === 'undefined') {
	    throw new Error('vnode can\'t be undefined. Did you mean to use null?');
	  } else {
	    children.push(vnode);
	  }
	  return children;
	}
	
	/**
	 * Text nodes are stored as objects to keep things simple
	 */
	
	function createTextElement(text) {
	  return {
	    type: '#text',
	    nodeValue: text
	  };
	}
	
	/**
	 * Text nodes are stored as objects to keep things simple
	 */
	
	function createEmptyElement() {
	  return {
	    type: '#empty'
	  };
	}
	
	/**
	 * Lazily-rendered virtual nodes
	 */
	
	function createThunkElement(component, key, props, children) {
	  return {
	    type: '#thunk',
	    children: children,
	    props: props,
	    component: component,
	    key: key
	  };
	}
	
	/**
	 * Is a vnode a thunk?
	 */
	
	var isThunk = exports.isThunk = function isThunk(node) {
	  return node.type === '#thunk';
	};
	
	/**
	 * Is a vnode a text node?
	 */
	
	var isText = exports.isText = function isText(node) {
	  return node.type === '#text';
	};
	
	/**
	 * Is a vnode an empty placeholder?
	 */
	
	var isEmpty = exports.isEmpty = function isEmpty(node) {
	  return node.type === '#empty';
	};
	
	/**
	 * Determine if two virtual nodes are the same type
	 */
	
	var isSameThunk = exports.isSameThunk = function isSameThunk(left, right) {
	  return isThunk(left) && isThunk(right) && left.component === right.component;
	};
	
	/**
	 * Group an array of virtual elements by their key, using index as a fallback.
	 */
	
	var groupByKey = exports.groupByKey = function groupByKey(children) {
	  return children.reduce(function (acc, child, i) {
	    if (child != null && child !== false) {
	      acc.push({
	        key: String(child.key || i),
	        item: child,
	        index: i
	      });
	    }
	    return acc;
	  }, []);
	};
	
	/**
	 * Check if an attribute should be rendered into the DOM.
	 */
	
	function isValidAttribute(value) {
	  if (typeof value === 'boolean') return value;
	  if (typeof value === 'function') return false;
	  if (value === '') return true;
	  if (value === undefined) return false;
	  if (value === null) return false;
	  return true;
	}
	
	/**
	 * Create a node path, eg. (23,5,2,4) => '23.5.2.4'
	 */
	
	var createPath = exports.createPath = function createPath() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  return args.join('.');
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;
	
	var _bitVector = __webpack_require__(6);
	
	/**
	 * Actions
	 */
	
	var CREATE = 0; /**
	                 * Imports
	                 */
	
	var UPDATE = 1;
	var MOVE = 2;
	var REMOVE = 3;
	
	/**
	 * dift
	 */
	
	function dift(prev, next, effect, key) {
	  var pStartIdx = 0;
	  var nStartIdx = 0;
	  var pEndIdx = prev.length - 1;
	  var nEndIdx = next.length - 1;
	  var pStartItem = prev[pStartIdx];
	  var nStartItem = next[nStartIdx];
	
	  // List head is the same
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
	    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
	    pStartItem = prev[++pStartIdx];
	    nStartItem = next[++nStartIdx];
	  }
	
	  // The above case is orders of magnitude more common than the others, so fast-path it
	  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
	    return;
	  }
	
	  var pEndItem = prev[pEndIdx];
	  var nEndItem = next[nEndIdx];
	  var movedFromFront = 0;
	
	  // Reversed
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
	    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
	    pStartItem = prev[++pStartIdx];
	    nEndItem = next[--nEndIdx];
	    ++movedFromFront;
	  }
	
	  // Reversed the other way (in case of e.g. reverse and append)
	  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
	    effect(MOVE, pEndItem, nStartItem, nStartIdx);
	    pEndItem = prev[--pEndIdx];
	    nStartItem = next[++nStartIdx];
	    --movedFromFront;
	  }
	
	  // List tail is the same
	  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
	    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
	    pEndItem = prev[--pEndIdx];
	    nEndItem = next[--nEndIdx];
	  }
	
	  if (pStartIdx > pEndIdx) {
	    while (nStartIdx <= nEndIdx) {
	      effect(CREATE, null, nStartItem, nStartIdx);
	      nStartItem = next[++nStartIdx];
	    }
	
	    return;
	  }
	
	  if (nStartIdx > nEndIdx) {
	    while (pStartIdx <= pEndIdx) {
	      effect(REMOVE, pStartItem);
	      pStartItem = prev[++pStartIdx];
	    }
	
	    return;
	  }
	
	  var created = 0;
	  var pivotDest = null;
	  var pivotIdx = pStartIdx - movedFromFront;
	  var keepBase = pStartIdx;
	  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);
	
	  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);
	
	  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
	    var oldIdx = prevMap[key(nStartItem)];
	
	    if (isUndefined(oldIdx)) {
	      effect(CREATE, null, nStartItem, pivotIdx++);
	      ++created;
	    } else if (pStartIdx !== oldIdx) {
	      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
	      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
	    } else {
	      pivotDest = nStartIdx;
	    }
	  }
	
	  if (pivotDest !== null) {
	    (0, _bitVector.setBit)(keep, 0);
	    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
	  }
	
	  // If there are no creations, then you have to
	  // remove exactly max(prevLen - nextLen, 0) elements in this
	  // diff. You have to remove one more for each element
	  // that was created. This means once we have
	  // removed that many, we can stop.
	  var necessaryRemovals = prev.length - next.length + created;
	  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
	    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
	      effect(REMOVE, pStartItem);
	      ++removals;
	    }
	  }
	
	  function equal(a, b) {
	    return key(a) === key(b);
	  }
	}
	
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	function keyMap(items, start, end, key) {
	  var map = {};
	
	  for (var i = start; i < end; ++i) {
	    map[key(items[i])] = i;
	  }
	
	  return map;
	}
	
	/**
	 * Exports
	 */
	
	exports.default = dift;
	exports.CREATE = CREATE;
	exports.UPDATE = UPDATE;
	exports.MOVE = MOVE;
	exports.REMOVE = REMOVE;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Use typed arrays if we can
	 */
	
	var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;
	
	/**
	 * Bit vector
	 */
	
	function createBv(sizeInBits) {
	  return new FastArray(Math.ceil(sizeInBits / 32));
	}
	
	function setBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;
	
	  v[pos] |= 1 << r;
	}
	
	function clearBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;
	
	  v[pos] &= ~(1 << r);
	}
	
	function getBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;
	
	  return !!(v[pos] & 1 << r);
	}
	
	/**
	 * Exports
	 */
	
	exports.createBv = createBv;
	exports.setBit = setBit;
	exports.clearBit = clearBit;
	exports.getBit = getBit;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var curryN = __webpack_require__(8);
	
	function isString(s) { return typeof s === 'string'; }
	function isNumber(n) { return typeof n === 'number'; }
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	function isFunction(f) { return typeof f === 'function'; }
	var isArray = Array.isArray || function(a) { return 'length' in a; };
	
	var mapConstrToFn = curryN(2, function(group, constr) {
	  return constr === String    ? isString
	       : constr === Number    ? isNumber
	       : constr === Object    ? isObject
	       : constr === Array     ? isArray
	       : constr === Function  ? isFunction
	       : constr === undefined ? group
	                              : constr;
	});
	
	function Constructor(group, name, validators) {
	  validators = validators.map(mapConstrToFn(group));
	  var constructor = curryN(validators.length, function() {
	    var val = [], v, validator;
	    for (var i = 0; i < arguments.length; ++i) {
	      v = arguments[i];
	      validator = validators[i];
	      if ((typeof validator === 'function' && validator(v)) ||
	          (v !== undefined && v !== null && v.of === validator)) {
	        val[i] = arguments[i];
	      } else {
	        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);
	      }
	    }
	    val.of = group;
	    val.name = name;
	    return val;
	  });
	  return constructor;
	}
	
	function rawCase(type, cases, action, arg) {
	  if (type !== action.of) throw new TypeError('wrong type passed to case');
	  var name = action.name in cases ? action.name
	           : '_' in cases         ? '_'
	                                  : undefined;
	  if (name === undefined) {
	    throw new Error('unhandled value passed to case');
	  } else {
	    return cases[name].apply(undefined, arg !== undefined ? action.concat([arg]) : action);
	  }
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function Type(desc) {
	  var obj = {};
	  for (var key in desc) {
	    obj[key] = Constructor(obj, key, desc[key]);
	  }
	  obj.case = typeCase(obj);
	  obj.caseOn = caseOn(obj);
	  return obj;
	}
	
	module.exports = Type;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(9);
	var _curryN = __webpack_require__(11);
	var arity = __webpack_require__(12);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the
	 * specified arity. The curried function has two unusual capabilities.
	 * First, its arguments needn't be provided one at a time. If `g` is
	 * `R.curryN(3, f)`, the following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`,
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var addFourNumbers = function() {
	 *        return R.sum([].slice.call(arguments, 0, 4));
	 *      };
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  return arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(10);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f2;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 1) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function(a) { return fn(a, b); });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else {
	      return fn(a, b);
	    }
	  };
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0) {
	      return f1;
	    } else if (a != null && a['@@functional/placeholder'] === true) {
	      return f1;
	    } else {
	      return fn(a);
	    }
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var arity = __webpack_require__(12);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @return {array} An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (received[combinedIdx] == null ||
	           received[combinedIdx]['@@functional/placeholder'] !== true ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (result == null || result['@@functional/placeholder'] !== true) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(9);
	
	
	/**
	 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
	 * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
	 * functions produced by `arity` will pass all provided arguments to the wrapped function.
	 *
	 * @func
	 * @memberOf R
	 * @sig (Number, (* -> *)) -> (* -> *)
	 * @category Function
	 * @param {Number} n The desired arity of the returned function.
	 * @param {Function} fn The function to wrap.
	 * @return {Function} A new function wrapping `fn`. The new function is
	 *         guaranteed to be of arity `n`.
	 * @deprecated since v0.15.0
	 * @example
	 *
	 *      var takesTwoArgs = function(a, b) {
	 *        return [a, b];
	 *      };
	 *      takesTwoArgs.length; //=> 2
	 *      takesTwoArgs(1, 2); //=> [1, 2]
	 *
	 *      var takesOneArg = R.arity(1, takesTwoArgs);
	 *      takesOneArg.length; //=> 1
	 *      // All arguments are passed through to the wrapped function
	 *      takesOneArg(1, 2); //=> [1, 2]
	 */
	module.exports = _curry2(function(n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0: return function() {return fn.apply(this, arguments);};
	    case 1: return function(a0) {return fn.apply(this, arguments);};
	    case 2: return function(a0, a1) {return fn.apply(this, arguments);};
	    case 3: return function(a0, a1, a2) {return fn.apply(this, arguments);};
	    case 4: return function(a0, a1, a2, a3) {return fn.apply(this, arguments);};
	    case 5: return function(a0, a1, a2, a3, a4) {return fn.apply(this, arguments);};
	    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.apply(this, arguments);};
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.apply(this, arguments);};
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.apply(this, arguments);};
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.apply(this, arguments);};
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.apply(this, arguments);};
	    default: throw new Error('First argument to arity must be a non-negative integer no greater than ten');
	  }
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = undefined;
	
	var _renderString = __webpack_require__(14);
	
	var render = _renderString.renderString;
	
	exports.render = render;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderString = renderString;
	
	var _element = __webpack_require__(4);
	
	/**
	 * Turn an object of key/value pairs into a HTML attribute string. This
	 * function is responsible for what attributes are allowed to be rendered and
	 * should handle any other special cases specific to deku.
	 */
	
	function attributesToString(attributes) {
	  var str = '';
	  for (var name in attributes) {
	    var value = attributes[name];
	    if (name === 'innerHTML') continue;
	    if ((0, _element.isValidAttribute)(value)) str += ' ' + name + '="' + attributes[name] + '"';
	  }
	  return str;
	}
	
	/**
	 * Render a virtual element to a string. You can pass in an option state context
	 * object that will be given to all components.
	 */
	
	function renderString(element, context) {
	  var path = arguments.length <= 2 || arguments[2] === undefined ? '0' : arguments[2];
	
	  if ((0, _element.isText)(element)) {
	    return element.nodeValue;
	  }
	
	  if ((0, _element.isEmpty)(element)) {
	    return '<noscript></noscript>';
	  }
	
	  if ((0, _element.isThunk)(element)) {
	    var props = element.props;
	    var component = element.component;
	    var _children = element.children;
	    var render = component.render;
	
	    var output = render({
	      children: _children,
	      props: props,
	      path: path,
	      context: context
	    });
	    return renderString(output, context, path);
	  }
	
	  var attributes = element.attributes;
	  var type = element.type;
	  var children = element.children;
	
	  var innerHTML = attributes.innerHTML;
	  var str = '<' + type + attributesToString(attributes) + '>';
	
	  if (innerHTML) {
	    str += innerHTML;
	  } else {
	    str += children.map(function (child, i) {
	      return renderString(child, context, path + '.' + (child.key == null ? i : child.key));
	    }).join('');
	  }
	
	  str += '</' + type + '>';
	  return str;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.update = exports.create = undefined;
	
	var _create = __webpack_require__(16);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _update = __webpack_require__(25);
	
	var _update2 = _interopRequireDefault(_update);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.create = _create2.default;
	exports.update = _update2.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createElement;
	
	var _element = __webpack_require__(4);
	
	var _setAttribute = __webpack_require__(17);
	
	var _svg = __webpack_require__(23);
	
	var _svg2 = _interopRequireDefault(_svg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cache = {};
	
	/**
	 * Create a real DOM element from a virtual element, recursively looping down.
	 * When it finds custom elements it will render them, cache them, and keep going,
	 * so they are treated like any other native element.
	 */
	
	function createElement(vnode, path, dispatch, context) {
	  if ((0, _element.isText)(vnode)) {
	    var value = typeof vnode.nodeValue === 'string' || typeof vnode.nodeValue === 'number' ? vnode.nodeValue : '';
	    return document.createTextNode(value);
	  }
	
	  if ((0, _element.isEmpty)(vnode)) {
	    return document.createElement('noscript');
	  }
	
	  if ((0, _element.isThunk)(vnode)) {
	    var props = vnode.props;
	    var component = vnode.component;
	    var children = vnode.children;
	    var onCreate = component.onCreate;
	
	    var render = typeof component === 'function' ? component : component.render;
	    var model = {
	      children: children,
	      props: props,
	      path: path,
	      dispatch: dispatch,
	      context: context
	    };
	    var output = render(model);
	    var _DOMElement = createElement(output, (0, _element.createPath)(path, output.key || '0'), dispatch, context);
	    if (onCreate) onCreate(model);
	    vnode.state = {
	      vnode: output,
	      model: model
	    };
	    return _DOMElement;
	  }
	
	  var cached = cache[vnode.type];
	
	  if (typeof cached === 'undefined') {
	    cached = cache[vnode.type] = _svg2.default.isElement(vnode.type) ? document.createElementNS(_svg2.default.namespace, vnode.type) : document.createElement(vnode.type);
	  }
	
	  var DOMElement = cached.cloneNode(false);
	
	  for (var name in vnode.attributes) {
	    (0, _setAttribute.setAttribute)(DOMElement, name, vnode.attributes[name]);
	  }
	
	  vnode.children.forEach(function (node, index) {
	    if (node === null || node === undefined) {
	      return;
	    }
	    var child = createElement(node, (0, _element.createPath)(path, node.key || index), dispatch, context);
	    DOMElement.appendChild(child);
	  });
	
	  return DOMElement;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeAttribute = removeAttribute;
	exports.setAttribute = setAttribute;
	
	var _svgAttributeNamespace = __webpack_require__(18);
	
	var _svgAttributeNamespace2 = _interopRequireDefault(_svgAttributeNamespace);
	
	var _element = __webpack_require__(4);
	
	var _indexOf = __webpack_require__(19);
	
	var _indexOf2 = _interopRequireDefault(_indexOf);
	
	var _setify = __webpack_require__(20);
	
	var _setify2 = _interopRequireDefault(_setify);
	
	var _events = __webpack_require__(22);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function removeAttribute(DOMElement, name, previousValue) {
	  var eventType = _events2.default[name];
	  if (eventType) {
	    if (typeof previousValue === 'function') {
	      DOMElement.removeEventListener(eventType, previousValue);
	    }
	    return;
	  }
	  switch (name) {
	    case 'checked':
	    case 'disabled':
	    case 'selected':
	      DOMElement[name] = false;
	      break;
	    case 'innerHTML':
	    case 'nodeValue':
	      DOMElement.innerHTML = '';
	      break;
	    case 'value':
	      DOMElement.value = '';
	      break;
	    default:
	      DOMElement.removeAttribute(name);
	      break;
	  }
	}
	
	function setAttribute(DOMElement, name, value, previousValue) {
	  var eventType = _events2.default[name];
	  if (value === previousValue) {
	    return;
	  }
	  if (eventType) {
	    if (typeof previousValue === 'function') {
	      DOMElement.removeEventListener(eventType, previousValue);
	    }
	    DOMElement.addEventListener(eventType, value);
	    return;
	  }
	  if (!(0, _element.isValidAttribute)(value)) {
	    removeAttribute(DOMElement, name, previousValue);
	    return;
	  }
	  switch (name) {
	    case 'checked':
	    case 'disabled':
	    case 'innerHTML':
	    case 'nodeValue':
	      DOMElement[name] = value;
	      break;
	    case 'selected':
	      DOMElement.selected = value;
	      // Fix for IE/Safari where select is not correctly selected on change
	      if (DOMElement.tagName === 'OPTION' && DOMElement.parentNode) {
	        var select = DOMElement.parentNode;
	        select.selectedIndex = (0, _indexOf2.default)(select.options, DOMElement);
	      }
	      break;
	    case 'value':
	      (0, _setify2.default)(DOMElement, value);
	      break;
	    default:
	      DOMElement.setAttributeNS((0, _svgAttributeNamespace2.default)(name), name, value);
	      break;
	  }
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = module.exports['default'] = SvgAttributeNamespace
	
	/*
	 * Supported SVG attribute namespaces by prefix.
	 *
	 * References:
	 * - http://www.w3.org/TR/SVGTiny12/attributeTable.html
	 * - http://www.w3.org/TR/SVG/attindex.html
	 * - http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-ElSetAttrNS
	 */
	
	var namespaces = module.exports.namespaces = {
	  ev: 'http://www.w3.org/2001/xml-events',
	  xlink: 'http://www.w3.org/1999/xlink',
	  xml: 'http://www.w3.org/XML/1998/namespace',
	  xmlns: 'http://www.w3.org/2000/xmlns/'
	}
	
	/**
	 * Get namespace of svg attribute
	 *
	 * @param {String} attributeName
	 * @return {String} namespace
	 */
	
	function SvgAttributeNamespace (attributeName) {
	  // if no prefix separator in attributeName, then no namespace
	  if (attributeName.indexOf(':') === -1) return null
	
	  // get prefix from attributeName
	  var prefix = attributeName.split(':', 1)[0]
	
	  // if prefix in supported prefixes
	  if (namespaces.hasOwnProperty(prefix)) {
	    // then namespace of prefix
	    return namespaces[prefix]
	  } else {
	    // else unsupported prefix
	    throw new Error('svg-attribute-namespace: prefix "' + prefix + '" is not supported by SVG.')
	  }
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*!
	 * index-of <https://github.com/jonschlinkert/index-of>
	 *
	 * Copyright (c) 2014-2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	module.exports = function indexOf(arr, ele, start) {
	  start = start || 0;
	  var idx = -1;
	
	  if (arr == null) return idx;
	  var len = arr.length;
	  var i = start < 0
	    ? (len + start)
	    : start;
	
	  if (i >= arr.length) {
	    return -1;
	  }
	
	  while (i < len) {
	    if (arr[i] === ele) {
	      return i;
	    }
	    i++;
	  }
	
	  return -1;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var naturalSelection = __webpack_require__(21);
	
	module.exports = function(element, value){
	    var canSet = naturalSelection(element) && element === document.activeElement;
	
	    if (canSet) {
	        var start = element.selectionStart,
	            end = element.selectionEnd;
	
	        element.value = value;
	        element.setSelectionRange(start, end);
	    } else {
	        element.value = value;
	    }
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	var supportedTypes = ['text', 'search', 'tel', 'url', 'password'];
	
	module.exports = function(element){
	    return !!(element.setSelectionRange && ~supportedTypes.indexOf(element.type));
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Special attributes that map to DOM events.
	 */
	
	exports.default = {
	  onAbort: 'abort',
	  onAnimationStart: 'animationstart',
	  onAnimationIteration: 'animationiteration',
	  onAnimationEnd: 'animationend',
	  onBlur: 'blur',
	  onCanPlay: 'canplay',
	  onCanPlayThrough: 'canplaythrough',
	  onChange: 'change',
	  onClick: 'click',
	  onContextMenu: 'contextmenu',
	  onCopy: 'copy',
	  onCut: 'cut',
	  onDoubleClick: 'dblclick',
	  onDrag: 'drag',
	  onDragEnd: 'dragend',
	  onDragEnter: 'dragenter',
	  onDragExit: 'dragexit',
	  onDragLeave: 'dragleave',
	  onDragOver: 'dragover',
	  onDragStart: 'dragstart',
	  onDrop: 'drop',
	  onDurationChange: 'durationchange',
	  onEmptied: 'emptied',
	  onEncrypted: 'encrypted',
	  onEnded: 'ended',
	  onError: 'error',
	  onFocus: 'focus',
	  onInput: 'input',
	  onInvalid: 'invalid',
	  onKeyDown: 'keydown',
	  onKeyPress: 'keypress',
	  onKeyUp: 'keyup',
	  onLoad: 'load',
	  onLoadedData: 'loadeddata',
	  onLoadedMetadata: 'loadedmetadata',
	  onLoadStart: 'loadstart',
	  onPause: 'pause',
	  onPlay: 'play',
	  onPlaying: 'playing',
	  onProgress: 'progress',
	  onMouseDown: 'mousedown',
	  onMouseEnter: 'mouseenter',
	  onMouseLeave: 'mouseleave',
	  onMouseMove: 'mousemove',
	  onMouseOut: 'mouseout',
	  onMouseOver: 'mouseover',
	  onMouseUp: 'mouseup',
	  onPaste: 'paste',
	  onRateChange: 'ratechange',
	  onReset: 'reset',
	  onScroll: 'scroll',
	  onSeeked: 'seeked',
	  onSeeking: 'seeking',
	  onSubmit: 'submit',
	  onStalled: 'stalled',
	  onSuspend: 'suspend',
	  onTimeUpdate: 'timeupdate',
	  onTransitionEnd: 'transitionend',
	  onTouchCancel: 'touchcancel',
	  onTouchEnd: 'touchend',
	  onTouchMove: 'touchmove',
	  onTouchStart: 'touchstart',
	  onVolumeChange: 'volumechange',
	  onWaiting: 'waiting',
	  onWheel: 'wheel'
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isSvgElement = __webpack_require__(24);
	
	var namespace = 'http://www.w3.org/2000/svg';
	
	exports.default = {
	  isElement: _isSvgElement.isElement,
	  namespace: namespace
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Supported SVG elements
	 *
	 * @type {Array}
	 */
	
	exports.elements = {
	  'animate': true,
	  'circle': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'mask': true,
	  'path': true,
	  'pattern': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'svg': true,
	  'text': true,
	  'tspan': true
	}
	
	/**
	 * Is element's namespace SVG?
	 *
	 * @param {String} name
	 */
	
	exports.isElement = function (name) {
	  return name in exports.elements
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.insertAtIndex = undefined;
	exports.default = patch;
	
	var _setAttribute2 = __webpack_require__(17);
	
	var _element = __webpack_require__(4);
	
	var _create = __webpack_require__(16);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _diff = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Modify a DOM element given an array of actions. A context can be set
	 * that will be used to render any custom elements.
	 */
	
	function patch(dispatch, context) {
	  return function (DOMElement, action) {
	    _diff.Actions.case({
	      setAttribute: function setAttribute(name, value, previousValue) {
	        (0, _setAttribute2.setAttribute)(DOMElement, name, value, previousValue);
	      },
	      removeAttribute: function removeAttribute(name, previousValue) {
	        (0, _setAttribute2.removeAttribute)(DOMElement, name, previousValue);
	      },
	      insertBefore: function insertBefore(index) {
	        insertAtIndex(DOMElement.parentNode, index, DOMElement);
	      },
	      sameNode: function sameNode() {},
	      updateChildren: function updateChildren(changes) {
	        // Create a clone of the children so we can reference them later
	        // using their original position even if they move around
	        var childNodes = Array.prototype.slice.apply(DOMElement.childNodes);
	
	        changes.forEach(function (change) {
	          _diff.Actions.case({
	            insertChild: function insertChild(vnode, index, path) {
	              insertAtIndex(DOMElement, index, (0, _create2.default)(vnode, path, dispatch, context));
	            },
	            removeChild: function removeChild(index) {
	              DOMElement.removeChild(childNodes[index]);
	            },
	            updateChild: function updateChild(index, actions) {
	              var update = patch(dispatch, context);
	              actions.forEach(function (action) {
	                return update(childNodes[index], action);
	              });
	            }
	          }, change);
	        });
	      },
	      updateThunk: function updateThunk(prev, next, path) {
	        var props = next.props;
	        var children = next.children;
	        var component = next.component;
	        var onUpdate = component.onUpdate;
	
	        var render = typeof component === 'function' ? component : component.render;
	        var prevNode = prev.state.vnode;
	        var model = {
	          children: children,
	          props: props,
	          path: path,
	          dispatch: dispatch,
	          context: context
	        };
	        var nextNode = render(model);
	        var changes = (0, _diff.diffNode)(prevNode, nextNode, (0, _element.createPath)(path, '0'));
	        DOMElement = changes.reduce(patch(dispatch, context), DOMElement);
	        if (onUpdate) onUpdate(model);
	        next.state = {
	          vnode: nextNode,
	          model: model
	        };
	      },
	      replaceNode: function replaceNode(prev, next, path) {
	        var newEl = (0, _create2.default)(next, path, dispatch, context);
	        var parentEl = DOMElement.parentNode;
	        if (parentEl) parentEl.replaceChild(newEl, DOMElement);
	        DOMElement = newEl;
	        removeThunks(prev);
	      },
	      removeNode: function removeNode(prev) {
	        removeThunks(prev);
	        DOMElement.parentNode.removeChild(DOMElement);
	        DOMElement = null;
	      }
	    }, action);
	
	    return DOMElement;
	  };
	}
	
	/**
	 * Recursively remove all thunks
	 */
	
	function removeThunks(vnode) {
	  while ((0, _element.isThunk)(vnode)) {
	    var _vnode = vnode;
	    var component = _vnode.component;
	    var state = _vnode.state;
	    var onRemove = component.onRemove;
	    var model = state.model;
	
	    if (onRemove) onRemove(model);
	    vnode = state.vnode;
	  }
	
	  if (vnode.children) {
	    for (var i = 0; i < vnode.children.length; i++) {
	      removeThunks(vnode.children[i]);
	    }
	  }
	}
	
	/**
	 * Slightly nicer insertBefore
	 */
	
	var insertAtIndex = exports.insertAtIndex = function insertAtIndex(parent, index, el) {
	  var target = parent.childNodes[index];
	  if (target) {
	    parent.insertBefore(el, target);
	  } else {
	    parent.appendChild(el);
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	
	var _dom = __webpack_require__(15);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _diff = __webpack_require__(3);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Create a DOM renderer using a container element. Everything will be rendered
	 * inside of that container. Returns a function that accepts new state that can
	 * replace what is currently rendered.
	 */
	
	function create(container, dispatch) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  var oldVnode = null;
	  var node = null;
	  var rootId = options.id || '0';
	
	  if (container && container.childNodes.length > 0) {
	    container.innerHTML = '';
	  }
	
	  var update = function update(newVnode, context) {
	    var changes = (0, _diff.diffNode)(oldVnode, newVnode, rootId);
	    node = changes.reduce(dom.update(dispatch, context), node);
	    oldVnode = newVnode;
	    return node;
	  };
	
	  var create = function create(vnode, context) {
	    node = dom.create(vnode, rootId, dispatch, context);
	    if (container) container.appendChild(node);
	    oldVnode = vnode;
	    return node;
	  };
	
	  return function (vnode) {
	    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return node !== null ? update(vnode, context) : create(vnode, context);
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(28)
	var debounce = __webpack_require__(29)
	
	module.exports = function stateful (Component, options) {
	  if (typeof Component === 'function') {
	    Component = { render: Component }
	  }
	
	  if (!options) options = {}
	  if (!options.action) options.action = { type: 'UI_STATE_CHANGE' }
	
	  var states = {}
	  var dispatch
	
	  var update = debounce(function () {
	    dispatch(options.action)
	  }, 0)
	
	  /*
	   * Pass through `render()` with state and setState added.
	   * Also, if it's the first render, call `initialState` if it exists.
	   */
	
	  function render (model) {
	    if (!states.hasOwnProperty(model.path)) {
	      states[model.path] = (Component.initialState && Component.initialState(model))
	    }
	
	    return Component.render(decorateModel(model))
	  }
	
	  /*
	   * Updates state and schedules a dispatch on the next tick.
	   */
	
	  function setState (model) {
	    return function (values) {
	      if (typeof states[model.path] === 'object' && typeof values === 'object') {
	        states[model.path] = assign({}, states[model.path], values)
	      } else {
	        states[model.path] = values
	      }
	      dispatch = model.dispatch
	      update()
	    }
	  }
	
	  /*
	   * Clear out states on remove.
	   */
	
	  function onRemove (model) {
	    if (Component.onRemove) Component.onRemove(decorateModel(model))
	    delete states[model.path]
	  }
	
	  /*
	   * Pass through `onUpdate()` with state and setState added.
	   */
	
	  function onUpdate (model) {
	    if (Component.onUpdate) Component.onUpdate(decorateModel(model))
	  }
	
	  function onCreate (model) {
	    if (Component.onCreate) Component.onCreate(decorateModel(model))
	  }
	
	  /*
	   * Adds `state` and `setState` to the model.
	   */
	
	  function decorateModel (model) {
	    return assign({}, model, {
	      state: states[model.path],
	      getState: function () { return states[model.path] },
	      setState: setState(model)
	    })
	  }
	
	  return assign({}, Component, {
	    render: render,
	    onRemove: onRemove,
	    onUpdate: onUpdate,
	    onCreate: onCreate
	  })
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	// thanks https://github.com/riot/route/blob/master/lib/index.js
	module.exports = function debounce (fn, delay) {
	  var t
	  return function () {
	    clearTimeout(t)
	    t = setTimeout(fn, delay)
	  }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWZjZWNkODE2M2M2NzM3YzA3OTQiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi4vbGliL1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWt1L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWt1L2xpYi9kaWZmL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L2Rla3UvbGliL2VsZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vZGlmdC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vYml0LXZlY3Rvci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vdW5pb24tdHlwZS91bmlvbi10eXBlLmpzIiwid2VicGFjazovLy8uLi9+L3JhbWRhL3NyYy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vLy4uL34vcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTEuanMiLCJ3ZWJwYWNrOi8vLy4uL34vcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vLy4uL34vcmFtZGEvc3JjL2FyaXR5LmpzIiwid2VicGFjazovLy8uLi9+L2Rla3UvbGliL3N0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWt1L2xpYi9zdHJpbmcvcmVuZGVyU3RyaW5nLmpzIiwid2VicGFjazovLy8uLi9+L2Rla3UvbGliL2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWt1L2xpYi9kb20vY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi9+L2Rla3UvbGliL2RvbS9zZXRBdHRyaWJ1dGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc3ZnLWF0dHJpYnV0ZS1uYW1lc3BhY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vaW5kZXgtb2YvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vc2V0aWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L25hdHVyYWwtc2VsZWN0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L2Rla3UvbGliL2RvbS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vZGVrdS9saWIvZG9tL3N2Zy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9pcy1zdmctZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWt1L2xpYi9kb20vdXBkYXRlLmpzIiwid2VicGFjazovLy8uLi9+L2Rla3UvbGliL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9kZWt1LXN0YXRlZnVsL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L2Rla3Utc3RhdGVmdWwvfi9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L3NpbXBsZXItZGVib3VuY2UvaW5kZXguanMiXSwibmFtZXMiOlsiSGlJdGVtcyIsIml0ZW1zIiwiY29uc29sZSIsImxvZyIsImlkIiwidmFsdWUiLCJ1cGRhdGUiLCJyZW5kZXIiLCJkb2N1bWVudCIsImJvZHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJfZGVrdSIsInJlcXVpcmUiLCJfZGVrdVN0YXRlZnVsIiwiX2Rla3VTdGF0ZWZ1bDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJpbml0aWFsU3RhdGUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZEl0ZW1zIiwic2VhcmNoVmFsdWUiLCJtZW51VmlzaWJsZSIsIm9uQ3JlYXRlIiwiX3JlZiIsInByb3BzIiwic3RhdGUiLCJzZXRTdGF0ZSIsIl9yZWYyIiwiaW5pdGlhbFNlbGVjdGVkIiwib25JdGVtc0NoYW5nZWQiLCJwbGFjZWhvbGRlciIsIk5vdEZvdW5kUGxhY2Vob2xkZXIiLCJtYXhTZWxlY3RlZCIsIm11bHRpcGxlIiwib25LZXlDaGFuZ2UiLCJnZXRJdGVtc0FzeW5jIiwiU2VhcmNoSXRlbUluQXJyYXlPYmplY3RzIiwiaW5wdXQiLCJzZWFyY2hLZXkiLCJyZWciLCJSZWdFeHAiLCJzcGxpdCIsImpvaW4iLCJyZXBsYWNlIiwiZmlsdGVyIiwiaXRlbSIsInRlc3QiLCJzZWxlY3RNZW51SXRlbSIsImFkZFNlbGVjdGVkIiwic2V0U2VsZWN0ZWQiLCJoaWRlTWVudSIsInNob3dNZW51IiwicmVzZXRQbGFjZWhvbGRlciIsInRyaWdnZXJJdGVtc0NoYW5nZWQiLCJ1bmRlZmluZWQiLCJ0cmlnZ2VyS2V5Q2hhbmdlIiwidHJpZ2dlckdldEl0ZW1zQXN5bmMiLCJ1cGRhdGVTZWFyY2hWYWx1ZSIsInNlbGVjdGVkIiwicHVzaCIsInJlbW92ZVNlbGVjdGVkIiwiaXRlbUlkIiwiaXRlbXNVcGRhdGVkIiwiaSIsInNldE1lbnVJdGVtcyIsInNob3dBbGxNZW51SXRlbXMiLCJsZW5ndGgiLCJpdGVtU2VsZWN0ZWQiLCJmaW5kIiwicyIsImZvY3VzSW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwic2V0VGltZW91dCIsImZvY3VzIiwiaGFuZGxlUmVtb3ZlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiZGF0YXNldCIsImhhbmRsZUZvY3VzIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVJdGVtQ2xpY2siLCJoYW5kbGVTZWxlY3QiLCJlbGVtZW50IiwiY3VycmVudFRhcmdldCIsImNoaWxkcmVuIiwicGFyc2VJbnQiLCJpbm5lckhUTUwiLCJoYW5kbGVLZXlDaGFuZ2UiLCJyZW5kZXJNZW51SXRlbXMiLCJtYXAiLCJrZXkiLCJfX2h0bWwiLCJvbkNsaWNrIiwicmVuZGVyU2VsZWN0ZWRJdGVtcyIsIml0ZW1DbGFzcyIsImRyb3BEb3duIiwiaWNvbiIsInJlbmRlcklucHV0IiwiaW5wdXRDbGFzcyIsInR5cGUiLCJvbkZvY3VzIiwib25LZXlVcCIsIm1lbnVDbGFzcyIsIlNlYXJjaCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7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LHdDQUF1Qyw2QkFBNkIsWUFBWSxFQUFFLE9BQU8saUJBQWlCLG1CQUFtQix1QkFBdUIsNEVBQTRFLEVBQUUsRUFBRSxzQkFBc0IsZUFBZSxFQUFFOztBQUUzUTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDMU1B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QTtBQUNBLDBDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEMsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQW9CO0FBQ3BCO0FBQ0EsOEJBQTZCLDRCQUE0QjtBQUN6RDtBQUNBLE1BQUs7QUFDTDs7QUFFQSxtQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7Ozs7Ozs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFrQixvQkFBb0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL2V4YW1wbGUvcHVibGljL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcInB1YmxpY1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZWZjZWNkODE2M2M2NzM3YzA3OTRcbiAqKi8iLCIvKiogQGpzeCBlbGVtZW50ICovXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2xpYi9TZWFyY2gnXG5pbXBvcnQgeyBlbGVtZW50LCBjcmVhdGVBcHAgfSBmcm9tICdkZWt1J1xuXG5mdW5jdGlvbiBIaUl0ZW1zKGl0ZW1zKSB7XG4gIGNvbnNvbGUubG9nKGl0ZW1zKVxufVxuXG5sZXQgaXRlbXMgPSBbXG4gIHsgaWQ6IDAsIHZhbHVlOiAncnVieScgfSxcbiAgeyBpZDogMSwgdmFsdWU6ICdqYXZhc2NyaXB0JyB9LFxuICB7IGlkOiAyLCB2YWx1ZTogJ2x1YScgfSxcbiAgeyBpZDogMywgdmFsdWU6ICdnbycgfSxcbiAgeyBpZDogNCwgdmFsdWU6ICdqdWxpYScgfVxuXVxuXG5mdW5jdGlvbiB1cGRhdGUgKCkge1xuICByZW5kZXIoPFNlYXJjaCBpdGVtcz17aXRlbXN9XG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdQaWNrIHlvdXIgbGFuZ3VhZ2UnXG4gICAgICAgICAgICAgICAgIE5vdEZvdW5kUGxhY2Vob2xkZXI9J05vIGl0ZW1zIGZvdW5kLi4uJ1xuICAgICAgICAgICAgICAgICBtYXhTZWxlY3RlZD17M31cbiAgICAgICAgICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgIG9uSXRlbXNDaGFuZ2VkPXsgKCkgPT4gSGlJdGVtcygpIH0gLz4sIHt9KVxufVxuXG52YXIgcmVuZGVyID0gY3JlYXRlQXBwKGRvY3VtZW50LmJvZHksIHVwZGF0ZSlcbnVwZGF0ZSgpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2V4YW1wbGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZGVrdSA9IHJlcXVpcmUoJ2Rla3UnKTtcblxudmFyIF9kZWt1U3RhdGVmdWwgPSByZXF1aXJlKCdkZWt1LXN0YXRlZnVsJyk7XG5cbnZhciBfZGVrdVN0YXRlZnVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Rla3VTdGF0ZWZ1bCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKiBAanN4IGVsZW1lbnQgKi9cblxuLyoqXG4gKiBBdXRvY29tcGxldGUgU2VhcmNoIGNvbXBvbmVudFxuKiovXG5mdW5jdGlvbiBpbml0aWFsU3RhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgbWVudUl0ZW1zOiBbXSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBbXSxcbiAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgbWVudVZpc2libGU6IGZhbHNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uQ3JlYXRlKF9yZWYpIHtcbiAgdmFyIHByb3BzID0gX3JlZi5wcm9wcztcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZTtcbiAgdmFyIHNldFN0YXRlID0gX3JlZi5zZXRTdGF0ZTtcbiAgdmFyIGl0ZW1zID0gcHJvcHMuaXRlbXM7XG5cbiAgY29uc29sZS5sb2coJ29uQ3JlYXRlJywgcHJvcHMsIHN0YXRlKTtcbiAgLyogbmVlZCB0byBjb3B5IGNvbXBvbmVudCBtb3VudCBzdGlsbCAqL1xufVxuXG5mdW5jdGlvbiByZW5kZXIoX3JlZjIpIHtcbiAgdmFyIHByb3BzID0gX3JlZjIucHJvcHM7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgc2V0U3RhdGUgPSBfcmVmMi5zZXRTdGF0ZTtcblxuXG4gIGNvbnNvbGUubG9nKCdyZW5kZXInLCBwcm9wcywgc3RhdGUpO1xuXG4gIHZhciBpdGVtcyA9IHByb3BzLml0ZW1zO1xuICB2YXIgaW5pdGlhbFNlbGVjdGVkID0gcHJvcHMuaW5pdGlhbFNlbGVjdGVkO1xuICB2YXIgb25JdGVtc0NoYW5nZWQgPSBwcm9wcy5vbkl0ZW1zQ2hhbmdlZDtcbiAgdmFyIHBsYWNlaG9sZGVyID0gcHJvcHMucGxhY2Vob2xkZXI7XG4gIHZhciBOb3RGb3VuZFBsYWNlaG9sZGVyID0gcHJvcHMuTm90Rm91bmRQbGFjZWhvbGRlcjtcbiAgdmFyIG1heFNlbGVjdGVkID0gcHJvcHMubWF4U2VsZWN0ZWQ7XG4gIHZhciBtdWx0aXBsZSA9IHByb3BzLm11bHRpcGxlO1xuICB2YXIgb25LZXlDaGFuZ2UgPSBwcm9wcy5vbktleUNoYW5nZTtcbiAgdmFyIGdldEl0ZW1zQXN5bmMgPSBwcm9wcy5nZXRJdGVtc0FzeW5jO1xuICB2YXIgbWVudUl0ZW1zID0gc3RhdGUubWVudUl0ZW1zO1xuICB2YXIgc2VsZWN0ZWRJdGVtcyA9IHN0YXRlLnNlbGVjdGVkSXRlbXM7XG4gIHZhciBzZWFyY2hWYWx1ZSA9IHN0YXRlLnNlYXJjaFZhbHVlO1xuICB2YXIgbWVudVZpc2libGUgPSBzdGF0ZS5tZW51VmlzaWJsZTtcblxuXG4gIGZ1bmN0aW9uIFNlYXJjaEl0ZW1JbkFycmF5T2JqZWN0cyhpdGVtcywgaW5wdXQsIHNlYXJjaEtleSkge1xuICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKGlucHV0LnNwbGl0KCcnKS5qb2luKCdcXFxcdyonKS5yZXBsYWNlKC9cXFcvLCAnJyksICdpJyk7XG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKHJlZy50ZXN0KGl0ZW1bc2VhcmNoS2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RNZW51SXRlbShpdGVtKSB7XG4gICAgbXVsdGlwbGUgPyBhZGRTZWxlY3RlZChpdGVtKSA6IHNldFNlbGVjdGVkKFtpdGVtXSk7XG4gICAgaGlkZU1lbnUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dNZW51KCkge1xuICAgIHNldFN0YXRlKHsgbWVudVZpc2libGU6IHRydWUgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlTWVudSgpIHtcbiAgICBzZXRTdGF0ZSh7IG1lbnVWaXNpYmxlOiBmYWxzZSB9KTtcbiAgICByZXNldFBsYWNlaG9sZGVyKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VySXRlbXNDaGFuZ2VkKCkge1xuICAgIGlmIChvbkl0ZW1zQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBvbkl0ZW1zQ2hhbmdlZChzZWxlY3RlZEl0ZW1zKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyS2V5Q2hhbmdlKHNlYXJjaFZhbHVlKSB7XG4gICAgaWYgKG9uS2V5Q2hhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG9uS2V5Q2hhbmdlKHNlYXJjaFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyR2V0SXRlbXNBc3luYyhzZWFyY2hWYWx1ZSkge1xuICAgIGlmIChnZXRJdGVtc0FzeW5jICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGdldEl0ZW1zQXN5bmMoc2VhcmNoVmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXBkYXRlU2VhcmNoVmFsdWUoc2VhcmNoVmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0U2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICBzZXRTdGF0ZSh7IHNlbGVjdGVkSXRlbXM6IHNlbGVjdGVkIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyaWdnZXJJdGVtc0NoYW5nZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNlbGVjdGVkKHNlbGVjdGVkKSB7XG4gICAgdmFyIGl0ZW1zID0gc2VsZWN0ZWRJdGVtcztcbiAgICBpdGVtcy5wdXNoKHNlbGVjdGVkKTtcbiAgICBzZXRTdGF0ZSh7IHNlbGVjdGVkSXRlbXM6IGl0ZW1zIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyaWdnZXJJdGVtc0NoYW5nZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVNlbGVjdGVkKGl0ZW1JZCkge1xuICAgIHZhciBpdGVtcyA9IHNlbGVjdGVkSXRlbXM7XG4gICAgdmFyIGl0ZW1zVXBkYXRlZCA9IGl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIGkuaWQgIT0gaXRlbUlkO1xuICAgIH0pO1xuICAgIHNldFN0YXRlKHsgc2VsZWN0ZWRJdGVtczogaXRlbXNVcGRhdGVkIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyaWdnZXJJdGVtc0NoYW5nZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlYXJjaFZhbHVlKHZhbHVlKSB7XG4gICAgc2V0U3RhdGUoeyBzZWFyY2hWYWx1ZTogdmFsdWUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1lbnVJdGVtcyA9IFNlYXJjaEl0ZW1JbkFycmF5T2JqZWN0cyhpdGVtcywgc2VhcmNoVmFsdWUsICd2YWx1ZScpO1xuICAgICAgc2V0TWVudUl0ZW1zKG1lbnVJdGVtcyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93QWxsTWVudUl0ZW1zKCkge1xuICAgIHNldFN0YXRlKHsgc2VhcmNoVmFsdWU6ICcnIH0pO1xuICAgIHZhciBtZW51SXRlbXMgPSBTZWFyY2hJdGVtSW5BcnJheU9iamVjdHMoaXRlbXMsICcnLCAndmFsdWUnKTtcbiAgICBzZXRNZW51SXRlbXMobWVudUl0ZW1zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE1lbnVJdGVtcyhpdGVtcykge1xuICAgIHNldFN0YXRlKHsgbWVudUl0ZW1zOiBpdGVtcyB9KTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoIHx8IGdldEl0ZW1zQXN5bmMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaG93TWVudSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlTWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGl0ZW1TZWxlY3RlZChpdGVtSWQpIHtcbiAgICB2YXIgaXRlbSA9IHNlbGVjdGVkSXRlbXMuZmluZChmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIHMuaWQgPT09IGl0ZW1JZDtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1c0lucHV0KCkge1xuICAgIHNob3dBbGxNZW51SXRlbXMoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoSW5wdXQnKS5wbGFjZWhvbGRlciA9ICcnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2hJbnB1dCcpLnZhbHVlID0gJyc7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoSW5wdXQnKS5mb2N1cygpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFBsYWNlaG9sZGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2hJbnB1dCcpLnBsYWNlaG9sZGVyID0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVSZW1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHJlbW92ZVNlbGVjdGVkKGUudGFyZ2V0LmRhdGFzZXQuaWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRm9jdXMoZSkge1xuICAgIGZvY3VzSW5wdXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGUpIHtcbiAgICBmb2N1c0lucHV0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVJdGVtQ2xpY2soZSkge1xuICAgIGZvY3VzSW5wdXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdChlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQuY2hpbGRyZW5bMF07XG4gICAgdmFyIGl0ZW0gPSB7IGlkOiBwYXJzZUludChlbGVtZW50LmRhdGFzZXQuaWQpLCB2YWx1ZTogZWxlbWVudC5pbm5lckhUTUwucmVwbGFjZSgvJmFtcDsvZywgJyYnKSB9O1xuICAgIHNlbGVjdE1lbnVJdGVtKGl0ZW0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5Q2hhbmdlKGUpIHtcbiAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoSW5wdXQnKS52YWx1ZTtcbiAgICB0cmlnZ2VyS2V5Q2hhbmdlKHZhbHVlKTtcbiAgICBpZiAoZ2V0SXRlbXNBc3luYyAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRyaWdnZXJHZXRJdGVtc0FzeW5jKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlU2VhcmNoVmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlck1lbnVJdGVtcygpIHtcbiAgICBpZiAoIW1lbnVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoMCwgX2Rla3UuZWxlbWVudCkoXG4gICAgICAgICdsaScsXG4gICAgICAgIHsgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZV9faXRlbSBhdXRvY29tcGxldGVfX2l0ZW0tLWRpc2FibGVkJyB9LFxuICAgICAgICAoMCwgX2Rla3UuZWxlbWVudCkoXG4gICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgIHsgJ2RhdGEtaWQnOiAwIH0sXG4gICAgICAgICAgTm90Rm91bmRQbGFjZWhvbGRlclxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciBpdGVtcyA9IG1lbnVJdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgIGlmIChpdGVtU2VsZWN0ZWQoaXRlbS5pZCkpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfZGVrdS5lbGVtZW50KShcbiAgICAgICAgICAnbGknLFxuICAgICAgICAgIHsga2V5OiBpLCAnY2xhc3MnOiAnYXV0b2NvbXBsZXRlX19pdGVtIGF1dG9jb21wbGV0ZV9faXRlbS0tZGlzYWJsZWQnIH0sXG4gICAgICAgICAgKDAsIF9kZWt1LmVsZW1lbnQpKCdzcGFuJywgeyBrZXk6IGksICdkYXRhLWlkJzogaXRlbS5pZCwgaW5uZXJIVE1MOiB7IF9faHRtbDogaXRlbS52YWx1ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKDAsIF9kZWt1LmVsZW1lbnQpKFxuICAgICAgICAgICdsaScsXG4gICAgICAgICAgeyBrZXk6IGksICdjbGFzcyc6ICdhdXRvY29tcGxldGVfX2l0ZW0nLCBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlU2VsZWN0KCk7XG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgKDAsIF9kZWt1LmVsZW1lbnQpKCdzcGFuJywgeyBrZXk6IGksICdkYXRhLWlkJzogaXRlbS5pZCwgaW5uZXJIVE1MOiB7IF9faHRtbDogaXRlbS52YWx1ZSB9IH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2VsZWN0ZWRJdGVtcygpIHtcbiAgICBpZiAoIXNlbGVjdGVkSXRlbXMubGVuZ3RoICYmIG11bHRpcGxlKSByZXR1cm4gbnVsbDtcblxuICAgIGlmICghc2VsZWN0ZWRJdGVtcy5sZW5ndGggJiYgIW11bHRpcGxlKSB7XG4gICAgICByZXR1cm4gKDAsIF9kZWt1LmVsZW1lbnQpKFxuICAgICAgICAnbGknLFxuICAgICAgICB7ICdjbGFzcyc6ICdhdXRvY29tcGxldGVfX2l0ZW0gYXV0b2NvbXBsZXRlX19pdGVtLS1zZWxlY3RlZCBhdXRvY29tcGxldGVfX2l0ZW1fX2Ryb3Bkb3duJyxcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUl0ZW1DbGljaygpO1xuICAgICAgICAgIH0gfSxcbiAgICAgICAgKDAsIF9kZWt1LmVsZW1lbnQpKCdzcGFuJywgeyBpbm5lckhUTUw6IHsgX19odG1sOiBwbGFjZWhvbGRlciB9IH0pLFxuICAgICAgICAoMCwgX2Rla3UuZWxlbWVudCkoJ3NwYW4nLCB7ICdjbGFzcyc6ICdhdXRvY29tcGxldGVfX2Ryb3Bkb3duJyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgaXRlbXMgPSBzZWxlY3RlZEl0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgdmFyIGl0ZW1DbGFzcyA9ICdhdXRvY29tcGxldGVfX2l0ZW0gYXV0b2NvbXBsZXRlX19pdGVtLS1zZWxlY3RlZCBhdXRvY29tcGxldGVfX2l0ZW1fX2Ryb3Bkb3duJztcbiAgICAgIHZhciBkcm9wRG93biA9ICgwLCBfZGVrdS5lbGVtZW50KSgnc3BhbicsIHsgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZV9fZHJvcGRvd24nIH0pO1xuICAgICAgdmFyIGljb24gPSAoMCwgX2Rla3UuZWxlbWVudCkoJ3NwYW4nLCB7ICdkYXRhLWlkJzogaXRlbS5pZCwgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZV9fY2xvc2UnLFxuICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgIHJldHVybiBoYW5kbGVSZW1vdmUoKTtcbiAgICAgICAgfSB9KTtcblxuICAgICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgIGRyb3BEb3duID0gbnVsbDtcbiAgICAgICAgaXRlbUNsYXNzID0gJ2F1dG9jb21wbGV0ZV9faXRlbSBhdXRvY29tcGxldGVfX2l0ZW0tLXNlbGVjdGVkJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfZGVrdS5lbGVtZW50KShcbiAgICAgICAgJ2xpJyxcbiAgICAgICAgeyBrZXk6IGksICdjbGFzcyc6IGl0ZW1DbGFzcywgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVJdGVtQ2xpY2soKTtcbiAgICAgICAgICB9IH0sXG4gICAgICAgICgwLCBfZGVrdS5lbGVtZW50KSgnc3BhbicsIHsgJ2RhdGEtaWQnOiBpdGVtLmlkLCBpbm5lckhUTUw6IHsgX19odG1sOiBpdGVtLnZhbHVlIH0gfSksXG4gICAgICAgIGljb24sXG4gICAgICAgIGRyb3BEb3duXG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcklucHV0KCkge1xuICAgIHZhciBpbnB1dENsYXNzID0gJ2F1dG9jb21wbGV0ZV9faW5wdXQnO1xuICAgIGlmIChtdWx0aXBsZSAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+PSBtYXhTZWxlY3RlZCkge1xuICAgICAgaW5wdXRDbGFzcyA9ICdhdXRvY29tcGxldGVfX2lucHV0IGF1dG9jb21wbGV0ZV9faW5wdXQtLWhpZGRlbic7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfZGVrdS5lbGVtZW50KSgnaW5wdXQnLCB7IHR5cGU6ICd0ZXh0JyxcbiAgICAgICdjbGFzcyc6IGlucHV0Q2xhc3MsXG4gICAgICBpZDogJ3NlYXJjaElucHV0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlcixcbiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVDbGljaygpO1xuICAgICAgfSxcbiAgICAgIG9uRm9jdXM6IGZ1bmN0aW9uIG9uRm9jdXMoKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVGb2N1cygpO1xuICAgICAgfSxcbiAgICAgIG9uS2V5VXA6IGZ1bmN0aW9uIG9uS2V5VXAoKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVLZXlDaGFuZ2UoKTtcbiAgICAgIH0gfSk7XG4gIH1cblxuICBmdW5jdGlvbiBtZW51Q2xhc3MoKSB7XG4gICAgdmFyIG1lbnVDbGFzcyA9ICdhdXRvY29tcGxldGVfX21lbnUgYXV0b2NvbXBsZXRlX19tZW51LS1oaWRkZW4nO1xuICAgIGlmIChtZW51VmlzaWJsZSAmJiAhbXVsdGlwbGUpIHtcbiAgICAgIG1lbnVDbGFzcyA9ICdhdXRvY29tcGxldGVfX21lbnUnO1xuICAgIH1cbiAgICBpZiAobWVudVZpc2libGUgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCBtYXhTZWxlY3RlZCkge1xuICAgICAgbWVudUNsYXNzID0gJ2F1dG9jb21wbGV0ZV9fbWVudSc7XG4gICAgfVxuICAgIHJldHVybiBtZW51Q2xhc3M7XG4gIH1cblxuICByZXR1cm4gKDAsIF9kZWt1LmVsZW1lbnQpKFxuICAgICdkaXYnLFxuICAgIHsgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZScgfSxcbiAgICAoMCwgX2Rla3UuZWxlbWVudCkoXG4gICAgICAnZGl2JyxcbiAgICAgIHsgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZV9fc2VsZWN0ZWQnIH0sXG4gICAgICAoMCwgX2Rla3UuZWxlbWVudCkoXG4gICAgICAgICd1bCcsXG4gICAgICAgIHsgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZV9faXRlbXMnIH0sXG4gICAgICAgIHJlbmRlclNlbGVjdGVkSXRlbXMoKVxuICAgICAgKVxuICAgICksXG4gICAgbXVsdGlwbGUgPyByZW5kZXJJbnB1dCgpIDogbnVsbCxcbiAgICAoMCwgX2Rla3UuZWxlbWVudCkoXG4gICAgICAnZGl2JyxcbiAgICAgIHsgJ2NsYXNzJzogJ2F1dG9jb21wbGV0ZV9fbWVudS0td3JhcCcgfSxcbiAgICAgICgwLCBfZGVrdS5lbGVtZW50KShcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgaWQ6ICdhdXRvY29tcGxldGUnLCAnY2xhc3MnOiBtZW51Q2xhc3MoKSB9LFxuICAgICAgICAhbXVsdGlwbGUgPyByZW5kZXJJbnB1dCgpIDogbnVsbCxcbiAgICAgICAgKDAsIF9kZWt1LmVsZW1lbnQpKFxuICAgICAgICAgICd1bCcsXG4gICAgICAgICAgeyAnY2xhc3MnOiAnYXV0b2NvbXBsZXRlX19pdGVtcycgfSxcbiAgICAgICAgICByZW5kZXJNZW51SXRlbXMoKVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICApO1xufVxuXG52YXIgU2VhcmNoID0gKDAsIF9kZWt1U3RhdGVmdWwyLmRlZmF1bHQpKHsgaW5pdGlhbFN0YXRlOiBpbml0aWFsU3RhdGUsIG9uQ3JlYXRlOiBvbkNyZWF0ZSwgcmVuZGVyOiByZW5kZXIgfSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNlYXJjaDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9saWIvU2VhcmNoLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5oID0gZXhwb3J0cy5kb20gPSBleHBvcnRzLmRpZmYgPSBleHBvcnRzLnZub2RlID0gZXhwb3J0cy5zdHJpbmcgPSBleHBvcnRzLmVsZW1lbnQgPSBleHBvcnRzLmNyZWF0ZUFwcCA9IHVuZGVmaW5lZDtcblxudmFyIF9kaWZmID0gcmVxdWlyZSgnLi9kaWZmJyk7XG5cbnZhciBkaWZmID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RpZmYpO1xuXG52YXIgX2VsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKTtcblxudmFyIHZub2RlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2VsZW1lbnQpO1xuXG52YXIgX3N0cmluZyA9IHJlcXVpcmUoJy4vc3RyaW5nJyk7XG5cbnZhciBzdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfc3RyaW5nKTtcblxudmFyIF9kb20gPSByZXF1aXJlKCcuL2RvbScpO1xuXG52YXIgZG9tID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RvbSk7XG5cbnZhciBfYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxudmFyIGFwcCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9hcHApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgZWxlbWVudCA9IHZub2RlLmNyZWF0ZTtcbnZhciBoID0gdm5vZGUuY3JlYXRlO1xudmFyIGNyZWF0ZUFwcCA9IGFwcC5jcmVhdGU7XG5cbmV4cG9ydHMuY3JlYXRlQXBwID0gY3JlYXRlQXBwO1xuZXhwb3J0cy5lbGVtZW50ID0gZWxlbWVudDtcbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nO1xuZXhwb3J0cy52bm9kZSA9IHZub2RlO1xuZXhwb3J0cy5kaWZmID0gZGlmZjtcbmV4cG9ydHMuZG9tID0gZG9tO1xuZXhwb3J0cy5oID0gaDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vZGVrdS9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFjdGlvbnMgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmRpZmZBdHRyaWJ1dGVzID0gZGlmZkF0dHJpYnV0ZXM7XG5leHBvcnRzLmRpZmZDaGlsZHJlbiA9IGRpZmZDaGlsZHJlbjtcbmV4cG9ydHMuZGlmZk5vZGUgPSBkaWZmTm9kZTtcblxudmFyIF9lbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG52YXIgX2RpZnQgPSByZXF1aXJlKCdkaWZ0Jyk7XG5cbnZhciBkaWZmQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kaWZ0KTtcblxudmFyIF91bmlvblR5cGUgPSByZXF1aXJlKCd1bmlvbi10eXBlJyk7XG5cbnZhciBfdW5pb25UeXBlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VuaW9uVHlwZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBBbnkgPSBmdW5jdGlvbiBBbnkoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBQYXRoID0gZnVuY3Rpb24gUGF0aCgpIHtcbiAgcmV0dXJuIFN0cmluZztcbn07XG5cbi8qKlxuICogUGF0Y2ggYWN0aW9uc1xuICovXG5cbnZhciBBY3Rpb25zID0gZXhwb3J0cy5BY3Rpb25zID0gKDAsIF91bmlvblR5cGUyLmRlZmF1bHQpKHtcbiAgc2V0QXR0cmlidXRlOiBbU3RyaW5nLCBBbnksIEFueV0sXG4gIHJlbW92ZUF0dHJpYnV0ZTogW1N0cmluZywgQW55XSxcbiAgaW5zZXJ0Q2hpbGQ6IFtBbnksIE51bWJlciwgUGF0aF0sXG4gIHJlbW92ZUNoaWxkOiBbTnVtYmVyXSxcbiAgdXBkYXRlQ2hpbGQ6IFtOdW1iZXIsIEFycmF5XSxcbiAgdXBkYXRlQ2hpbGRyZW46IFtBcnJheV0sXG4gIGluc2VydEJlZm9yZTogW051bWJlcl0sXG4gIHJlcGxhY2VOb2RlOiBbQW55LCBBbnksIFBhdGhdLFxuICByZW1vdmVOb2RlOiBbQW55XSxcbiAgc2FtZU5vZGU6IFtdLFxuICB1cGRhdGVUaHVuazogW0FueSwgQW55LCBQYXRoXVxufSk7XG5cbi8qKlxuICogRGlmZiB0d28gYXR0cmlidXRlIG9iamVjdHMgYW5kIHJldHVybiBhbiBhcnJheSBvZiBhY3Rpb25zIHRoYXQgcmVwcmVzZW50XG4gKiBjaGFuZ2VzIHRvIHRyYW5zZm9ybSB0aGUgb2xkIG9iamVjdCBpbnRvIHRoZSBuZXcgb25lLlxuICovXG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKHByZXZpb3VzLCBuZXh0KSB7XG4gIHZhciBzZXRBdHRyaWJ1dGUgPSBBY3Rpb25zLnNldEF0dHJpYnV0ZTtcbiAgdmFyIHJlbW92ZUF0dHJpYnV0ZSA9IEFjdGlvbnMucmVtb3ZlQXR0cmlidXRlO1xuXG4gIHZhciBjaGFuZ2VzID0gW107XG4gIHZhciBwQXR0cnMgPSBwcmV2aW91cy5hdHRyaWJ1dGVzO1xuICB2YXIgbkF0dHJzID0gbmV4dC5hdHRyaWJ1dGVzO1xuXG4gIGZvciAodmFyIG5hbWUgaW4gbkF0dHJzKSB7XG4gICAgaWYgKG5BdHRyc1tuYW1lXSAhPT0gcEF0dHJzW25hbWVdKSB7XG4gICAgICBjaGFuZ2VzLnB1c2goc2V0QXR0cmlidXRlKG5hbWUsIG5BdHRyc1tuYW1lXSwgcEF0dHJzW25hbWVdKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBwQXR0cnMpIHtcbiAgICBpZiAoIShuYW1lIGluIG5BdHRycykpIHtcbiAgICAgIGNoYW5nZXMucHVzaChyZW1vdmVBdHRyaWJ1dGUobmFtZSwgcEF0dHJzW25hbWVdKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoYW5nZXM7XG59XG5cbi8qKlxuICogQ29tcGFyZSB0d28gYXJyYXlzIG9mIHZpcnR1YWwgbm9kZXMgYW5kIHJldHVybiBhbiBhcnJheSBvZiBhY3Rpb25zXG4gKiB0byB0cmFuc2Zvcm0gdGhlIGxlZnQgaW50byB0aGUgcmlnaHQuIEEgc3RhcnRpbmcgcGF0aCBpcyBzdXBwbGllZCB0aGF0IHVzZVxuICogcmVjdXJzaXZlbHkgdG8gYnVpbGQgdXAgdW5pcXVlIHBhdGhzIGZvciBlYWNoIG5vZGUuXG4gKi9cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKHByZXZpb3VzLCBuZXh0LCBwYXJlbnRQYXRoKSB7XG4gIHZhciBpbnNlcnRDaGlsZCA9IEFjdGlvbnMuaW5zZXJ0Q2hpbGQ7XG4gIHZhciB1cGRhdGVDaGlsZCA9IEFjdGlvbnMudXBkYXRlQ2hpbGQ7XG4gIHZhciByZW1vdmVDaGlsZCA9IEFjdGlvbnMucmVtb3ZlQ2hpbGQ7XG4gIHZhciBpbnNlcnRCZWZvcmUgPSBBY3Rpb25zLmluc2VydEJlZm9yZTtcbiAgdmFyIHVwZGF0ZUNoaWxkcmVuID0gQWN0aW9ucy51cGRhdGVDaGlsZHJlbjtcbiAgdmFyIENSRUFURSA9IGRpZmZBY3Rpb25zLkNSRUFURTtcbiAgdmFyIFVQREFURSA9IGRpZmZBY3Rpb25zLlVQREFURTtcbiAgdmFyIE1PVkUgPSBkaWZmQWN0aW9ucy5NT1ZFO1xuICB2YXIgUkVNT1ZFID0gZGlmZkFjdGlvbnMuUkVNT1ZFO1xuXG4gIHZhciBwcmV2aW91c0NoaWxkcmVuID0gKDAsIF9lbGVtZW50Lmdyb3VwQnlLZXkpKHByZXZpb3VzLmNoaWxkcmVuKTtcbiAgdmFyIG5leHRDaGlsZHJlbiA9ICgwLCBfZWxlbWVudC5ncm91cEJ5S2V5KShuZXh0LmNoaWxkcmVuKTtcbiAgdmFyIGtleSA9IGZ1bmN0aW9uIGtleShhKSB7XG4gICAgcmV0dXJuIGEua2V5O1xuICB9O1xuICB2YXIgY2hhbmdlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGVmZmVjdCh0eXBlLCBwcmV2LCBuZXh0LCBwb3MpIHtcbiAgICB2YXIgbmV4dFBhdGggPSBuZXh0ID8gKDAsIF9lbGVtZW50LmNyZWF0ZVBhdGgpKHBhcmVudFBhdGgsIG5leHQua2V5ID09IG51bGwgPyBuZXh0LmluZGV4IDogbmV4dC5rZXkpIDogbnVsbDtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgQ1JFQVRFOlxuICAgICAgICB7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKGluc2VydENoaWxkKG5leHQuaXRlbSwgcG9zLCBuZXh0UGF0aCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlIFVQREFURTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBhY3Rpb25zID0gZGlmZk5vZGUocHJldi5pdGVtLCBuZXh0Lml0ZW0sIG5leHRQYXRoKTtcbiAgICAgICAgICBpZiAoYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnB1c2godXBkYXRlQ2hpbGQocHJldi5pbmRleCwgYWN0aW9ucykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBNT1ZFOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGFjdGlvbnMgPSBkaWZmTm9kZShwcmV2Lml0ZW0sIG5leHQuaXRlbSwgbmV4dFBhdGgpO1xuICAgICAgICAgIGFjdGlvbnMucHVzaChpbnNlcnRCZWZvcmUocG9zKSk7XG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHVwZGF0ZUNoaWxkKHByZXYuaW5kZXgsIGFjdGlvbnMpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBSRU1PVkU6XG4gICAgICAgIHtcbiAgICAgICAgICBjaGFuZ2VzLnB1c2gocmVtb3ZlQ2hpbGQocHJldi5pbmRleCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgKDAsIGRpZmZBY3Rpb25zLmRlZmF1bHQpKHByZXZpb3VzQ2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgZWZmZWN0LCBrZXkpO1xuXG4gIHJldHVybiB1cGRhdGVDaGlsZHJlbihjaGFuZ2VzKTtcbn1cblxuLyoqXG4gKiBDb21wYXJlIHR3byB2aXJ0dWFsIG5vZGVzIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgY2hhbmdlcyB0byB0dXJuIHRoZSBsZWZ0XG4gKiBpbnRvIHRoZSByaWdodC5cbiAqL1xuXG5mdW5jdGlvbiBkaWZmTm9kZShwcmV2LCBuZXh0LCBwYXRoKSB7XG4gIHZhciBjaGFuZ2VzID0gW107XG4gIHZhciByZXBsYWNlTm9kZSA9IEFjdGlvbnMucmVwbGFjZU5vZGU7XG4gIHZhciBzZXRBdHRyaWJ1dGUgPSBBY3Rpb25zLnNldEF0dHJpYnV0ZTtcbiAgdmFyIHNhbWVOb2RlID0gQWN0aW9ucy5zYW1lTm9kZTtcbiAgdmFyIHJlbW92ZU5vZGUgPSBBY3Rpb25zLnJlbW92ZU5vZGU7XG4gIHZhciB1cGRhdGVUaHVuayA9IEFjdGlvbnMudXBkYXRlVGh1bms7XG5cbiAgLy8gTm8gbGVmdCBub2RlIHRvIGNvbXBhcmUgaXQgdG9cbiAgLy8gVE9ETzogVGhpcyBzaG91bGQganVzdCByZXR1cm4gYSBjcmVhdGVOb2RlIGFjdGlvblxuXG4gIGlmIChwcmV2ID09PSBudWxsIHx8IHByZXYgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTGVmdCBub2RlIG11c3Qgbm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICAvLyBCYWlsIG91dCBhbmQgc2tpcCB1cGRhdGluZyB0aGlzIHdob2xlIHN1Yi10cmVlXG4gIGlmIChwcmV2ID09PSBuZXh0KSB7XG4gICAgY2hhbmdlcy5wdXNoKHNhbWVOb2RlKCkpO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gUmVtb3ZlXG4gIGlmIChwcmV2ICE9IG51bGwgJiYgbmV4dCA9PSBudWxsKSB7XG4gICAgY2hhbmdlcy5wdXNoKHJlbW92ZU5vZGUocHJldikpO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gUmVwbGFjZVxuICBpZiAocHJldi50eXBlICE9PSBuZXh0LnR5cGUpIHtcbiAgICBjaGFuZ2VzLnB1c2gocmVwbGFjZU5vZGUocHJldiwgbmV4dCwgcGF0aCkpO1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gVGV4dFxuICBpZiAoKDAsIF9lbGVtZW50LmlzVGV4dCkobmV4dCkpIHtcbiAgICBpZiAocHJldi5ub2RlVmFsdWUgIT09IG5leHQubm9kZVZhbHVlKSB7XG4gICAgICBjaGFuZ2VzLnB1c2goc2V0QXR0cmlidXRlKCdub2RlVmFsdWUnLCBuZXh0Lm5vZGVWYWx1ZSwgcHJldi5ub2RlVmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZXM7XG4gIH1cblxuICAvLyBUaHVua1xuICBpZiAoKDAsIF9lbGVtZW50LmlzVGh1bmspKG5leHQpKSB7XG4gICAgaWYgKCgwLCBfZWxlbWVudC5pc1NhbWVUaHVuaykocHJldiwgbmV4dCkpIHtcbiAgICAgIGNoYW5nZXMucHVzaCh1cGRhdGVUaHVuayhwcmV2LCBuZXh0LCBwYXRoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZXMucHVzaChyZXBsYWNlTm9kZShwcmV2LCBuZXh0LCBwYXRoKSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgLy8gRW1wdHlcbiAgaWYgKCgwLCBfZWxlbWVudC5pc0VtcHR5KShuZXh0KSkge1xuICAgIHJldHVybiBjaGFuZ2VzO1xuICB9XG5cbiAgY2hhbmdlcyA9IGRpZmZBdHRyaWJ1dGVzKHByZXYsIG5leHQpO1xuICBjaGFuZ2VzLnB1c2goZGlmZkNoaWxkcmVuKHByZXYsIG5leHQsIHBhdGgpKTtcblxuICByZXR1cm4gY2hhbmdlcztcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vZGVrdS9saWIvZGlmZi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuZXhwb3J0cy5jcmVhdGVUZXh0RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50O1xuZXhwb3J0cy5jcmVhdGVFbXB0eUVsZW1lbnQgPSBjcmVhdGVFbXB0eUVsZW1lbnQ7XG5leHBvcnRzLmNyZWF0ZVRodW5rRWxlbWVudCA9IGNyZWF0ZVRodW5rRWxlbWVudDtcbmV4cG9ydHMuaXNWYWxpZEF0dHJpYnV0ZSA9IGlzVmFsaWRBdHRyaWJ1dGU7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbGV0cyB1cyBjcmVhdGUgdmlydHVhbCBub2RlcyB1c2luZyBhIHNpbXBsZVxuICogc3ludGF4LiBJdCBpcyBjb21wYXRpYmxlIHdpdGggSlNYIHRyYW5zZm9ybXMgc28geW91IGNhbiB1c2VcbiAqIEpTWCB0byB3cml0ZSBub2RlcyB0aGF0IHdpbGwgY29tcGlsZSB0byB0aGlzIGZ1bmN0aW9uLlxuICpcbiAqIGxldCBub2RlID0gZWxlbWVudCgnZGl2JywgeyBpZDogJ2ZvbycgfSwgW1xuICogICBlbGVtZW50KCdhJywgeyBocmVmOiAnaHR0cDovL2dvb2dsZS5jb20nIH0sXG4gKiAgICAgZWxlbWVudCgnc3BhbicsIHt9LCAnR29vZ2xlJyksXG4gKiAgICAgZWxlbWVudCgnYicsIHt9LCAnTGluaycpXG4gKiAgIClcbiAqIF0pXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIGF0dHJpYnV0ZXMpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGNoaWxkcmVuW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmICghdHlwZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignZWxlbWVudCgpIG5lZWRzIGEgdHlwZS4nKTtcblxuICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcyB8fCB7fTtcbiAgY2hpbGRyZW4gPSAoY2hpbGRyZW4gfHwgW10pLnJlZHVjZShyZWR1Y2VDaGlsZHJlbiwgW10pO1xuXG4gIHZhciBrZXkgPSB0eXBlb2YgYXR0cmlidXRlcy5rZXkgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRyaWJ1dGVzLmtleSA9PT0gJ251bWJlcicgPyBhdHRyaWJ1dGVzLmtleSA6IHVuZGVmaW5lZDtcblxuICBkZWxldGUgYXR0cmlidXRlcy5rZXk7XG5cbiAgaWYgKCh0eXBlb2YgdHlwZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHlwZSkpID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBjcmVhdGVUaHVua0VsZW1lbnQodHlwZSwga2V5LCBhdHRyaWJ1dGVzLCBjaGlsZHJlbik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXlcbiAgfTtcbn1cblxuLyoqXG4gKiBDbGVhbnMgdXAgdGhlIGFycmF5IG9mIGNoaWxkIGVsZW1lbnRzLlxuICogLSBGbGF0dGVucyBuZXN0ZWQgYXJyYXlzXG4gKiAtIENvbnZlcnRzIHJhdyBzdHJpbmdzIGFuZCBudW1iZXJzIGludG8gdm5vZGVzXG4gKiAtIEZpbHRlcnMgb3V0IHVuZGVmaW5lZCBlbGVtZW50c1xuICovXG5cbmZ1bmN0aW9uIHJlZHVjZUNoaWxkcmVuKGNoaWxkcmVuLCB2bm9kZSkge1xuICBpZiAodHlwZW9mIHZub2RlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygdm5vZGUgPT09ICdudW1iZXInKSB7XG4gICAgY2hpbGRyZW4ucHVzaChjcmVhdGVUZXh0RWxlbWVudCh2bm9kZSkpO1xuICB9IGVsc2UgaWYgKHZub2RlID09PSBudWxsKSB7XG4gICAgY2hpbGRyZW4ucHVzaChjcmVhdGVFbXB0eUVsZW1lbnQoKSk7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICBjaGlsZHJlbiA9IFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoY2hpbGRyZW4pLCBfdG9Db25zdW1hYmxlQXJyYXkodm5vZGUucmVkdWNlKHJlZHVjZUNoaWxkcmVuLCBbXSkpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygdm5vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd2bm9kZSBjYW5cXCd0IGJlIHVuZGVmaW5lZC4gRGlkIHlvdSBtZWFuIHRvIHVzZSBudWxsPycpO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkcmVuLnB1c2godm5vZGUpO1xuICB9XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBUZXh0IG5vZGVzIGFyZSBzdG9yZWQgYXMgb2JqZWN0cyB0byBrZWVwIHRoaW5ncyBzaW1wbGVcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCh0ZXh0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJyN0ZXh0JyxcbiAgICBub2RlVmFsdWU6IHRleHRcbiAgfTtcbn1cblxuLyoqXG4gKiBUZXh0IG5vZGVzIGFyZSBzdG9yZWQgYXMgb2JqZWN0cyB0byBrZWVwIHRoaW5ncyBzaW1wbGVcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbXB0eUVsZW1lbnQoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJyNlbXB0eSdcbiAgfTtcbn1cblxuLyoqXG4gKiBMYXppbHktcmVuZGVyZWQgdmlydHVhbCBub2Rlc1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVRodW5rRWxlbWVudChjb21wb25lbnQsIGtleSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJyN0aHVuaycsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgICBrZXk6IGtleVxuICB9O1xufVxuXG4vKipcbiAqIElzIGEgdm5vZGUgYSB0aHVuaz9cbiAqL1xuXG52YXIgaXNUaHVuayA9IGV4cG9ydHMuaXNUaHVuayA9IGZ1bmN0aW9uIGlzVGh1bmsobm9kZSkge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnI3RodW5rJztcbn07XG5cbi8qKlxuICogSXMgYSB2bm9kZSBhIHRleHQgbm9kZT9cbiAqL1xuXG52YXIgaXNUZXh0ID0gZXhwb3J0cy5pc1RleHQgPSBmdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnI3RleHQnO1xufTtcblxuLyoqXG4gKiBJcyBhIHZub2RlIGFuIGVtcHR5IHBsYWNlaG9sZGVyP1xuICovXG5cbnZhciBpc0VtcHR5ID0gZXhwb3J0cy5pc0VtcHR5ID0gZnVuY3Rpb24gaXNFbXB0eShub2RlKSB7XG4gIHJldHVybiBub2RlLnR5cGUgPT09ICcjZW1wdHknO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdHdvIHZpcnR1YWwgbm9kZXMgYXJlIHRoZSBzYW1lIHR5cGVcbiAqL1xuXG52YXIgaXNTYW1lVGh1bmsgPSBleHBvcnRzLmlzU2FtZVRodW5rID0gZnVuY3Rpb24gaXNTYW1lVGh1bmsobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGlzVGh1bmsobGVmdCkgJiYgaXNUaHVuayhyaWdodCkgJiYgbGVmdC5jb21wb25lbnQgPT09IHJpZ2h0LmNvbXBvbmVudDtcbn07XG5cbi8qKlxuICogR3JvdXAgYW4gYXJyYXkgb2YgdmlydHVhbCBlbGVtZW50cyBieSB0aGVpciBrZXksIHVzaW5nIGluZGV4IGFzIGEgZmFsbGJhY2suXG4gKi9cblxudmFyIGdyb3VwQnlLZXkgPSBleHBvcnRzLmdyb3VwQnlLZXkgPSBmdW5jdGlvbiBncm91cEJ5S2V5KGNoaWxkcmVuKSB7XG4gIHJldHVybiBjaGlsZHJlbi5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY2hpbGQsIGkpIHtcbiAgICBpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZCAhPT0gZmFsc2UpIHtcbiAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAga2V5OiBTdHJpbmcoY2hpbGQua2V5IHx8IGkpLFxuICAgICAgICBpdGVtOiBjaGlsZCxcbiAgICAgICAgaW5kZXg6IGlcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCBbXSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBzaG91bGQgYmUgcmVuZGVyZWQgaW50byB0aGUgRE9NLlxuICovXG5cbmZ1bmN0aW9uIGlzVmFsaWRBdHRyaWJ1dGUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHZhbHVlID09PSAnJykgcmV0dXJuIHRydWU7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBub2RlIHBhdGgsIGVnLiAoMjMsNSwyLDQpID0+ICcyMy41LjIuNCdcbiAqL1xuXG52YXIgY3JlYXRlUGF0aCA9IGV4cG9ydHMuY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIGNyZWF0ZVBhdGgoKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgcmV0dXJuIGFyZ3Muam9pbignLicpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vZGVrdS9saWIvZWxlbWVudC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUkVNT1ZFID0gZXhwb3J0cy5NT1ZFID0gZXhwb3J0cy5VUERBVEUgPSBleHBvcnRzLkNSRUFURSA9IHVuZGVmaW5lZDtcblxudmFyIF9iaXRWZWN0b3IgPSByZXF1aXJlKCdiaXQtdmVjdG9yJyk7XG5cbi8qKlxuICogQWN0aW9uc1xuICovXG5cbnZhciBDUkVBVEUgPSAwOyAvKipcbiAgICAgICAgICAgICAgICAgKiBJbXBvcnRzXG4gICAgICAgICAgICAgICAgICovXG5cbnZhciBVUERBVEUgPSAxO1xudmFyIE1PVkUgPSAyO1xudmFyIFJFTU9WRSA9IDM7XG5cbi8qKlxuICogZGlmdFxuICovXG5cbmZ1bmN0aW9uIGRpZnQocHJldiwgbmV4dCwgZWZmZWN0LCBrZXkpIHtcbiAgdmFyIHBTdGFydElkeCA9IDA7XG4gIHZhciBuU3RhcnRJZHggPSAwO1xuICB2YXIgcEVuZElkeCA9IHByZXYubGVuZ3RoIC0gMTtcbiAgdmFyIG5FbmRJZHggPSBuZXh0Lmxlbmd0aCAtIDE7XG4gIHZhciBwU3RhcnRJdGVtID0gcHJldltwU3RhcnRJZHhdO1xuICB2YXIgblN0YXJ0SXRlbSA9IG5leHRbblN0YXJ0SWR4XTtcblxuICAvLyBMaXN0IGhlYWQgaXMgdGhlIHNhbWVcbiAgd2hpbGUgKHBTdGFydElkeCA8PSBwRW5kSWR4ICYmIG5TdGFydElkeCA8PSBuRW5kSWR4ICYmIGVxdWFsKHBTdGFydEl0ZW0sIG5TdGFydEl0ZW0pKSB7XG4gICAgZWZmZWN0KFVQREFURSwgcFN0YXJ0SXRlbSwgblN0YXJ0SXRlbSwgblN0YXJ0SWR4KTtcbiAgICBwU3RhcnRJdGVtID0gcHJldlsrK3BTdGFydElkeF07XG4gICAgblN0YXJ0SXRlbSA9IG5leHRbKytuU3RhcnRJZHhdO1xuICB9XG5cbiAgLy8gVGhlIGFib3ZlIGNhc2UgaXMgb3JkZXJzIG9mIG1hZ25pdHVkZSBtb3JlIGNvbW1vbiB0aGFuIHRoZSBvdGhlcnMsIHNvIGZhc3QtcGF0aCBpdFxuICBpZiAoblN0YXJ0SWR4ID4gbkVuZElkeCAmJiBwU3RhcnRJZHggPiBwRW5kSWR4KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBFbmRJdGVtID0gcHJldltwRW5kSWR4XTtcbiAgdmFyIG5FbmRJdGVtID0gbmV4dFtuRW5kSWR4XTtcbiAgdmFyIG1vdmVkRnJvbUZyb250ID0gMDtcblxuICAvLyBSZXZlcnNlZFxuICB3aGlsZSAocFN0YXJ0SWR4IDw9IHBFbmRJZHggJiYgblN0YXJ0SWR4IDw9IG5FbmRJZHggJiYgZXF1YWwocFN0YXJ0SXRlbSwgbkVuZEl0ZW0pKSB7XG4gICAgZWZmZWN0KE1PVkUsIHBTdGFydEl0ZW0sIG5FbmRJdGVtLCBwRW5kSWR4IC0gbW92ZWRGcm9tRnJvbnQgKyAxKTtcbiAgICBwU3RhcnRJdGVtID0gcHJldlsrK3BTdGFydElkeF07XG4gICAgbkVuZEl0ZW0gPSBuZXh0Wy0tbkVuZElkeF07XG4gICAgKyttb3ZlZEZyb21Gcm9udDtcbiAgfVxuXG4gIC8vIFJldmVyc2VkIHRoZSBvdGhlciB3YXkgKGluIGNhc2Ugb2YgZS5nLiByZXZlcnNlIGFuZCBhcHBlbmQpXG4gIHdoaWxlIChwRW5kSWR4ID49IHBTdGFydElkeCAmJiBuU3RhcnRJZHggPD0gbkVuZElkeCAmJiBlcXVhbChuU3RhcnRJdGVtLCBwRW5kSXRlbSkpIHtcbiAgICBlZmZlY3QoTU9WRSwgcEVuZEl0ZW0sIG5TdGFydEl0ZW0sIG5TdGFydElkeCk7XG4gICAgcEVuZEl0ZW0gPSBwcmV2Wy0tcEVuZElkeF07XG4gICAgblN0YXJ0SXRlbSA9IG5leHRbKytuU3RhcnRJZHhdO1xuICAgIC0tbW92ZWRGcm9tRnJvbnQ7XG4gIH1cblxuICAvLyBMaXN0IHRhaWwgaXMgdGhlIHNhbWVcbiAgd2hpbGUgKHBFbmRJZHggPj0gcFN0YXJ0SWR4ICYmIG5FbmRJZHggPj0gblN0YXJ0SWR4ICYmIGVxdWFsKHBFbmRJdGVtLCBuRW5kSXRlbSkpIHtcbiAgICBlZmZlY3QoVVBEQVRFLCBwRW5kSXRlbSwgbkVuZEl0ZW0sIG5FbmRJZHgpO1xuICAgIHBFbmRJdGVtID0gcHJldlstLXBFbmRJZHhdO1xuICAgIG5FbmRJdGVtID0gbmV4dFstLW5FbmRJZHhdO1xuICB9XG5cbiAgaWYgKHBTdGFydElkeCA+IHBFbmRJZHgpIHtcbiAgICB3aGlsZSAoblN0YXJ0SWR4IDw9IG5FbmRJZHgpIHtcbiAgICAgIGVmZmVjdChDUkVBVEUsIG51bGwsIG5TdGFydEl0ZW0sIG5TdGFydElkeCk7XG4gICAgICBuU3RhcnRJdGVtID0gbmV4dFsrK25TdGFydElkeF07XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5TdGFydElkeCA+IG5FbmRJZHgpIHtcbiAgICB3aGlsZSAocFN0YXJ0SWR4IDw9IHBFbmRJZHgpIHtcbiAgICAgIGVmZmVjdChSRU1PVkUsIHBTdGFydEl0ZW0pO1xuICAgICAgcFN0YXJ0SXRlbSA9IHByZXZbKytwU3RhcnRJZHhdO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjcmVhdGVkID0gMDtcbiAgdmFyIHBpdm90RGVzdCA9IG51bGw7XG4gIHZhciBwaXZvdElkeCA9IHBTdGFydElkeCAtIG1vdmVkRnJvbUZyb250O1xuICB2YXIga2VlcEJhc2UgPSBwU3RhcnRJZHg7XG4gIHZhciBrZWVwID0gKDAsIF9iaXRWZWN0b3IuY3JlYXRlQnYpKHBFbmRJZHggLSBwU3RhcnRJZHgpO1xuXG4gIHZhciBwcmV2TWFwID0ga2V5TWFwKHByZXYsIHBTdGFydElkeCwgcEVuZElkeCArIDEsIGtleSk7XG5cbiAgZm9yICg7IG5TdGFydElkeCA8PSBuRW5kSWR4OyBuU3RhcnRJdGVtID0gbmV4dFsrK25TdGFydElkeF0pIHtcbiAgICB2YXIgb2xkSWR4ID0gcHJldk1hcFtrZXkoblN0YXJ0SXRlbSldO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKG9sZElkeCkpIHtcbiAgICAgIGVmZmVjdChDUkVBVEUsIG51bGwsIG5TdGFydEl0ZW0sIHBpdm90SWR4KyspO1xuICAgICAgKytjcmVhdGVkO1xuICAgIH0gZWxzZSBpZiAocFN0YXJ0SWR4ICE9PSBvbGRJZHgpIHtcbiAgICAgICgwLCBfYml0VmVjdG9yLnNldEJpdCkoa2VlcCwgb2xkSWR4IC0ga2VlcEJhc2UpO1xuICAgICAgZWZmZWN0KE1PVkUsIHByZXZbb2xkSWR4XSwgblN0YXJ0SXRlbSwgcGl2b3RJZHgrKyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpdm90RGVzdCA9IG5TdGFydElkeDtcbiAgICB9XG4gIH1cblxuICBpZiAocGl2b3REZXN0ICE9PSBudWxsKSB7XG4gICAgKDAsIF9iaXRWZWN0b3Iuc2V0Qml0KShrZWVwLCAwKTtcbiAgICBlZmZlY3QoTU9WRSwgcHJldltwU3RhcnRJZHhdLCBuZXh0W3Bpdm90RGVzdF0sIHBpdm90RGVzdCk7XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgbm8gY3JlYXRpb25zLCB0aGVuIHlvdSBoYXZlIHRvXG4gIC8vIHJlbW92ZSBleGFjdGx5IG1heChwcmV2TGVuIC0gbmV4dExlbiwgMCkgZWxlbWVudHMgaW4gdGhpc1xuICAvLyBkaWZmLiBZb3UgaGF2ZSB0byByZW1vdmUgb25lIG1vcmUgZm9yIGVhY2ggZWxlbWVudFxuICAvLyB0aGF0IHdhcyBjcmVhdGVkLiBUaGlzIG1lYW5zIG9uY2Ugd2UgaGF2ZVxuICAvLyByZW1vdmVkIHRoYXQgbWFueSwgd2UgY2FuIHN0b3AuXG4gIHZhciBuZWNlc3NhcnlSZW1vdmFscyA9IHByZXYubGVuZ3RoIC0gbmV4dC5sZW5ndGggKyBjcmVhdGVkO1xuICBmb3IgKHZhciByZW1vdmFscyA9IDA7IHJlbW92YWxzIDwgbmVjZXNzYXJ5UmVtb3ZhbHM7IHBTdGFydEl0ZW0gPSBwcmV2WysrcFN0YXJ0SWR4XSkge1xuICAgIGlmICghKDAsIF9iaXRWZWN0b3IuZ2V0Qml0KShrZWVwLCBwU3RhcnRJZHggLSBrZWVwQmFzZSkpIHtcbiAgICAgIGVmZmVjdChSRU1PVkUsIHBTdGFydEl0ZW0pO1xuICAgICAgKytyZW1vdmFscztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGtleShhKSA9PT0ga2V5KGIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIGtleU1hcChpdGVtcywgc3RhcnQsIGVuZCwga2V5KSB7XG4gIHZhciBtYXAgPSB7fTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG1hcFtrZXkoaXRlbXNbaV0pXSA9IGk7XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEV4cG9ydHNcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkaWZ0O1xuZXhwb3J0cy5DUkVBVEUgPSBDUkVBVEU7XG5leHBvcnRzLlVQREFURSA9IFVQREFURTtcbmV4cG9ydHMuTU9WRSA9IE1PVkU7XG5leHBvcnRzLlJFTU9WRSA9IFJFTU9WRTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vZGlmdC9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIFVzZSB0eXBlZCBhcnJheXMgaWYgd2UgY2FuXG4gKi9cblxudmFyIEZhc3RBcnJheSA9IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyBBcnJheSA6IFVpbnQzMkFycmF5O1xuXG4vKipcbiAqIEJpdCB2ZWN0b3JcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVCdihzaXplSW5CaXRzKSB7XG4gIHJldHVybiBuZXcgRmFzdEFycmF5KE1hdGguY2VpbChzaXplSW5CaXRzIC8gMzIpKTtcbn1cblxuZnVuY3Rpb24gc2V0Qml0KHYsIGlkeCkge1xuICB2YXIgciA9IGlkeCAlIDMyO1xuICB2YXIgcG9zID0gKGlkeCAtIHIpIC8gMzI7XG5cbiAgdltwb3NdIHw9IDEgPDwgcjtcbn1cblxuZnVuY3Rpb24gY2xlYXJCaXQodiwgaWR4KSB7XG4gIHZhciByID0gaWR4ICUgMzI7XG4gIHZhciBwb3MgPSAoaWR4IC0gcikgLyAzMjtcblxuICB2W3Bvc10gJj0gfigxIDw8IHIpO1xufVxuXG5mdW5jdGlvbiBnZXRCaXQodiwgaWR4KSB7XG4gIHZhciByID0gaWR4ICUgMzI7XG4gIHZhciBwb3MgPSAoaWR4IC0gcikgLyAzMjtcblxuICByZXR1cm4gISEodltwb3NdICYgMSA8PCByKTtcbn1cblxuLyoqXG4gKiBFeHBvcnRzXG4gKi9cblxuZXhwb3J0cy5jcmVhdGVCdiA9IGNyZWF0ZUJ2O1xuZXhwb3J0cy5zZXRCaXQgPSBzZXRCaXQ7XG5leHBvcnRzLmNsZWFyQml0ID0gY2xlYXJCaXQ7XG5leHBvcnRzLmdldEJpdCA9IGdldEJpdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYml0LXZlY3Rvci9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY3VycnlOID0gcmVxdWlyZSgncmFtZGEvc3JjL2N1cnJ5TicpO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhzKSB7IHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZyc7IH1cbmZ1bmN0aW9uIGlzTnVtYmVyKG4pIHsgcmV0dXJuIHR5cGVvZiBuID09PSAnbnVtYmVyJzsgfVxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGYpIHsgcmV0dXJuIHR5cGVvZiBmID09PSAnZnVuY3Rpb24nOyB9XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYSkgeyByZXR1cm4gJ2xlbmd0aCcgaW4gYTsgfTtcblxudmFyIG1hcENvbnN0clRvRm4gPSBjdXJyeU4oMiwgZnVuY3Rpb24oZ3JvdXAsIGNvbnN0cikge1xuICByZXR1cm4gY29uc3RyID09PSBTdHJpbmcgICAgPyBpc1N0cmluZ1xuICAgICAgIDogY29uc3RyID09PSBOdW1iZXIgICAgPyBpc051bWJlclxuICAgICAgIDogY29uc3RyID09PSBPYmplY3QgICAgPyBpc09iamVjdFxuICAgICAgIDogY29uc3RyID09PSBBcnJheSAgICAgPyBpc0FycmF5XG4gICAgICAgOiBjb25zdHIgPT09IEZ1bmN0aW9uICA/IGlzRnVuY3Rpb25cbiAgICAgICA6IGNvbnN0ciA9PT0gdW5kZWZpbmVkID8gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY29uc3RyO1xufSk7XG5cbmZ1bmN0aW9uIENvbnN0cnVjdG9yKGdyb3VwLCBuYW1lLCB2YWxpZGF0b3JzKSB7XG4gIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzLm1hcChtYXBDb25zdHJUb0ZuKGdyb3VwKSk7XG4gIHZhciBjb25zdHJ1Y3RvciA9IGN1cnJ5Tih2YWxpZGF0b3JzLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbCA9IFtdLCB2LCB2YWxpZGF0b3I7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHYgPSBhcmd1bWVudHNbaV07XG4gICAgICB2YWxpZGF0b3IgPSB2YWxpZGF0b3JzW2ldO1xuICAgICAgaWYgKCh0eXBlb2YgdmFsaWRhdG9yID09PSAnZnVuY3Rpb24nICYmIHZhbGlkYXRvcih2KSkgfHxcbiAgICAgICAgICAodiAhPT0gdW5kZWZpbmVkICYmIHYgIT09IG51bGwgJiYgdi5vZiA9PT0gdmFsaWRhdG9yKSkge1xuICAgICAgICB2YWxbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB2YWx1ZSAnICsgdiArICcgcGFzc2VkIHRvIGxvY2F0aW9uICcgKyBpICsgJyBpbiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhbC5vZiA9IGdyb3VwO1xuICAgIHZhbC5uYW1lID0gbmFtZTtcbiAgICByZXR1cm4gdmFsO1xuICB9KTtcbiAgcmV0dXJuIGNvbnN0cnVjdG9yO1xufVxuXG5mdW5jdGlvbiByYXdDYXNlKHR5cGUsIGNhc2VzLCBhY3Rpb24sIGFyZykge1xuICBpZiAodHlwZSAhPT0gYWN0aW9uLm9mKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB0eXBlIHBhc3NlZCB0byBjYXNlJyk7XG4gIHZhciBuYW1lID0gYWN0aW9uLm5hbWUgaW4gY2FzZXMgPyBhY3Rpb24ubmFtZVxuICAgICAgICAgICA6ICdfJyBpbiBjYXNlcyAgICAgICAgID8gJ18nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaGFuZGxlZCB2YWx1ZSBwYXNzZWQgdG8gY2FzZScpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjYXNlc1tuYW1lXS5hcHBseSh1bmRlZmluZWQsIGFyZyAhPT0gdW5kZWZpbmVkID8gYWN0aW9uLmNvbmNhdChbYXJnXSkgOiBhY3Rpb24pO1xuICB9XG59XG5cbnZhciB0eXBlQ2FzZSA9IGN1cnJ5TigzLCByYXdDYXNlKTtcbnZhciBjYXNlT24gPSBjdXJyeU4oNCwgcmF3Q2FzZSk7XG5cbmZ1bmN0aW9uIFR5cGUoZGVzYykge1xuICB2YXIgb2JqID0ge307XG4gIGZvciAodmFyIGtleSBpbiBkZXNjKSB7XG4gICAgb2JqW2tleV0gPSBDb25zdHJ1Y3RvcihvYmosIGtleSwgZGVzY1trZXldKTtcbiAgfVxuICBvYmouY2FzZSA9IHR5cGVDYXNlKG9iaik7XG4gIG9iai5jYXNlT24gPSBjYXNlT24ob2JqKTtcbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3VuaW9uLXR5cGUvdW5pb24tdHlwZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2N1cnJ5TiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5TicpO1xudmFyIGFyaXR5ID0gcmVxdWlyZSgnLi9hcml0eScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24sIHdpdGggdGhlXG4gKiBzcGVjaWZpZWQgYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuXG4gKiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpc1xuICogYFIuY3VycnlOKDMsIGYpYCwgdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIGBSLl9fYCBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIGBSLl9fYCxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhZGRGb3VyTnVtYmVycyA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgIHJldHVybiBSLnN1bShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgNCkpO1xuICogICAgICB9O1xuICpcbiAqICAgICAgdmFyIGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIGFkZEZvdXJOdW1iZXJzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgcmV0dXJuIGFyaXR5KGxlbmd0aCwgX2N1cnJ5TihsZW5ndGgsIFtdLCBmbikpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vcmFtZGEvc3JjL2N1cnJ5Ti5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9fY3VycnkxJyk7XG5cblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdHdvLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnkyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMihhLCBiKSB7XG4gICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChuID09PSAwKSB7XG4gICAgICByZXR1cm4gZjI7XG4gICAgfSBlbHNlIGlmIChuID09PSAxICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGYyO1xuICAgIH0gZWxzZSBpZiAobiA9PT0gMSkge1xuICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24oYikgeyByZXR1cm4gZm4oYSwgYik7IH0pO1xuICAgIH0gZWxzZSBpZiAobiA9PT0gMiAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZjI7XG4gICAgfSBlbHNlIGlmIChuID09PSAyICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24oYSkgeyByZXR1cm4gZm4oYSwgYik7IH0pO1xuICAgIH0gZWxzZSBpZiAobiA9PT0gMiAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uKGIpIHsgcmV0dXJuIGZuKGEsIGIpOyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuKGEsIGIpO1xuICAgIH1cbiAgfTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGYxO1xuICAgIH0gZWxzZSBpZiAoYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbihhKTtcbiAgICB9XG4gIH07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcml0eSA9IHJlcXVpcmUoJy4uL2FyaXR5Jyk7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHthcnJheX0gQW4gYXJyYXkgb2YgYXJndW1lbnRzIHJlY2VpdmVkIHRodXMgZmFyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeU4obGVuZ3RoLCByZWNlaXZlZCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb21iaW5lZCA9IFtdO1xuICAgIHZhciBhcmdzSWR4ID0gMDtcbiAgICB2YXIgbGVmdCA9IGxlbmd0aDtcbiAgICB2YXIgY29tYmluZWRJZHggPSAwO1xuICAgIHdoaWxlIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCB8fCBhcmdzSWR4IDwgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIGlmIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCAmJlxuICAgICAgICAgIChyZWNlaXZlZFtjb21iaW5lZElkeF0gPT0gbnVsbCB8fFxuICAgICAgICAgICByZWNlaXZlZFtjb21iaW5lZElkeF1bJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddICE9PSB0cnVlIHx8XG4gICAgICAgICAgIGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0WydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSAhPT0gdHJ1ZSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpIDogYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5Ti5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiBvZiBhbnkgYXJpdHkgKGluY2x1ZGluZyBudWxsYXJ5KSBpbiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBleGFjdGx5IGBuYFxuICogcGFyYW1ldGVycy4gVW5saWtlIGBuQXJ5YCwgd2hpY2ggcGFzc2VzIG9ubHkgYG5gIGFyZ3VtZW50cyB0byB0aGUgd3JhcHBlZCBmdW5jdGlvbixcbiAqIGZ1bmN0aW9ucyBwcm9kdWNlZCBieSBgYXJpdHlgIHdpbGwgcGFzcyBhbGwgcHJvdmlkZWQgYXJndW1lbnRzIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpZyAoTnVtYmVyLCAoKiAtPiAqKSkgLT4gKCogLT4gKilcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGRlc2lyZWQgYXJpdHkgb2YgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpc1xuICogICAgICAgICBndWFyYW50ZWVkIHRvIGJlIG9mIGFyaXR5IGBuYC5cbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYwLjE1LjBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gZnVuY3Rpb24oYSwgYikge1xuICogICAgICAgIHJldHVybiBbYSwgYl07XG4gKiAgICAgIH07XG4gKiAgICAgIHRha2VzVHdvQXJncy5sZW5ndGg7IC8vPT4gMlxuICogICAgICB0YWtlc1R3b0FyZ3MoMSwgMik7IC8vPT4gWzEsIDJdXG4gKlxuICogICAgICB2YXIgdGFrZXNPbmVBcmcgPSBSLmFyaXR5KDEsIHRha2VzVHdvQXJncyk7XG4gKiAgICAgIHRha2VzT25lQXJnLmxlbmd0aDsgLy89PiAxXG4gKiAgICAgIC8vIEFsbCBhcmd1bWVudHMgYXJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gKiAgICAgIHRha2VzT25lQXJnKDEsIDIpOyAvLz0+IFsxLCAyXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24obiwgZm4pIHtcbiAgLy8ganNoaW50IHVudXNlZDp2YXJzXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uKCkge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYTApIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSkge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMikge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCkge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSA2OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSA3OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTt9O1xuICAgIGNhc2UgODogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSA5OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkge3JldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO307XG4gICAgY2FzZSAxMDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7fTtcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIGFyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3JhbWRhL3NyYy9hcml0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlbmRlciA9IHVuZGVmaW5lZDtcblxudmFyIF9yZW5kZXJTdHJpbmcgPSByZXF1aXJlKCcuL3JlbmRlclN0cmluZycpO1xuXG52YXIgcmVuZGVyID0gX3JlbmRlclN0cmluZy5yZW5kZXJTdHJpbmc7XG5cbmV4cG9ydHMucmVuZGVyID0gcmVuZGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9kZWt1L2xpYi9zdHJpbmcvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZW5kZXJTdHJpbmcgPSByZW5kZXJTdHJpbmc7XG5cbnZhciBfZWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuLyoqXG4gKiBUdXJuIGFuIG9iamVjdCBvZiBrZXkvdmFsdWUgcGFpcnMgaW50byBhIEhUTUwgYXR0cmlidXRlIHN0cmluZy4gVGhpc1xuICogZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgZm9yIHdoYXQgYXR0cmlidXRlcyBhcmUgYWxsb3dlZCB0byBiZSByZW5kZXJlZCBhbmRcbiAqIHNob3VsZCBoYW5kbGUgYW55IG90aGVyIHNwZWNpYWwgY2FzZXMgc3BlY2lmaWMgdG8gZGVrdS5cbiAqL1xuXG5mdW5jdGlvbiBhdHRyaWJ1dGVzVG9TdHJpbmcoYXR0cmlidXRlcykge1xuICB2YXIgc3RyID0gJyc7XG4gIGZvciAodmFyIG5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG4gICAgaWYgKG5hbWUgPT09ICdpbm5lckhUTUwnKSBjb250aW51ZTtcbiAgICBpZiAoKDAsIF9lbGVtZW50LmlzVmFsaWRBdHRyaWJ1dGUpKHZhbHVlKSkgc3RyICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIGF0dHJpYnV0ZXNbbmFtZV0gKyAnXCInO1xuICB9XG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogUmVuZGVyIGEgdmlydHVhbCBlbGVtZW50IHRvIGEgc3RyaW5nLiBZb3UgY2FuIHBhc3MgaW4gYW4gb3B0aW9uIHN0YXRlIGNvbnRleHRcbiAqIG9iamVjdCB0aGF0IHdpbGwgYmUgZ2l2ZW4gdG8gYWxsIGNvbXBvbmVudHMuXG4gKi9cblxuZnVuY3Rpb24gcmVuZGVyU3RyaW5nKGVsZW1lbnQsIGNvbnRleHQpIHtcbiAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAnMCcgOiBhcmd1bWVudHNbMl07XG5cbiAgaWYgKCgwLCBfZWxlbWVudC5pc1RleHQpKGVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQubm9kZVZhbHVlO1xuICB9XG5cbiAgaWYgKCgwLCBfZWxlbWVudC5pc0VtcHR5KShlbGVtZW50KSkge1xuICAgIHJldHVybiAnPG5vc2NyaXB0Pjwvbm9zY3JpcHQ+JztcbiAgfVxuXG4gIGlmICgoMCwgX2VsZW1lbnQuaXNUaHVuaykoZWxlbWVudCkpIHtcbiAgICB2YXIgcHJvcHMgPSBlbGVtZW50LnByb3BzO1xuICAgIHZhciBjb21wb25lbnQgPSBlbGVtZW50LmNvbXBvbmVudDtcbiAgICB2YXIgX2NoaWxkcmVuID0gZWxlbWVudC5jaGlsZHJlbjtcbiAgICB2YXIgcmVuZGVyID0gY29tcG9uZW50LnJlbmRlcjtcblxuICAgIHZhciBvdXRwdXQgPSByZW5kZXIoe1xuICAgICAgY2hpbGRyZW46IF9jaGlsZHJlbixcbiAgICAgIHByb3BzOiBwcm9wcyxcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZyhvdXRwdXQsIGNvbnRleHQsIHBhdGgpO1xuICB9XG5cbiAgdmFyIGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG4gIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50LmNoaWxkcmVuO1xuXG4gIHZhciBpbm5lckhUTUwgPSBhdHRyaWJ1dGVzLmlubmVySFRNTDtcbiAgdmFyIHN0ciA9ICc8JyArIHR5cGUgKyBhdHRyaWJ1dGVzVG9TdHJpbmcoYXR0cmlidXRlcykgKyAnPic7XG5cbiAgaWYgKGlubmVySFRNTCkge1xuICAgIHN0ciArPSBpbm5lckhUTUw7XG4gIH0gZWxzZSB7XG4gICAgc3RyICs9IGNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQsIGkpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoY2hpbGQsIGNvbnRleHQsIHBhdGggKyAnLicgKyAoY2hpbGQua2V5ID09IG51bGwgPyBpIDogY2hpbGQua2V5KSk7XG4gICAgfSkuam9pbignJyk7XG4gIH1cblxuICBzdHIgKz0gJzwvJyArIHR5cGUgKyAnPic7XG4gIHJldHVybiBzdHI7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Rla3UvbGliL3N0cmluZy9yZW5kZXJTdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy51cGRhdGUgPSBleHBvcnRzLmNyZWF0ZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL2NyZWF0ZScpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3VwZGF0ZSA9IHJlcXVpcmUoJy4vdXBkYXRlJyk7XG5cbnZhciBfdXBkYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VwZGF0ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuY3JlYXRlID0gX2NyZWF0ZTIuZGVmYXVsdDtcbmV4cG9ydHMudXBkYXRlID0gX3VwZGF0ZTIuZGVmYXVsdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vZGVrdS9saWIvZG9tL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7XG5cbnZhciBfZWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxudmFyIF9zZXRBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL3NldEF0dHJpYnV0ZScpO1xuXG52YXIgX3N2ZyA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbnZhciBfc3ZnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N2Zyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjYWNoZSA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlYWwgRE9NIGVsZW1lbnQgZnJvbSBhIHZpcnR1YWwgZWxlbWVudCwgcmVjdXJzaXZlbHkgbG9vcGluZyBkb3duLlxuICogV2hlbiBpdCBmaW5kcyBjdXN0b20gZWxlbWVudHMgaXQgd2lsbCByZW5kZXIgdGhlbSwgY2FjaGUgdGhlbSwgYW5kIGtlZXAgZ29pbmcsXG4gKiBzbyB0aGV5IGFyZSB0cmVhdGVkIGxpa2UgYW55IG90aGVyIG5hdGl2ZSBlbGVtZW50LlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodm5vZGUsIHBhdGgsIGRpc3BhdGNoLCBjb250ZXh0KSB7XG4gIGlmICgoMCwgX2VsZW1lbnQuaXNUZXh0KSh2bm9kZSkpIHtcbiAgICB2YXIgdmFsdWUgPSB0eXBlb2Ygdm5vZGUubm9kZVZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygdm5vZGUubm9kZVZhbHVlID09PSAnbnVtYmVyJyA/IHZub2RlLm5vZGVWYWx1ZSA6ICcnO1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoKDAsIF9lbGVtZW50LmlzRW1wdHkpKHZub2RlKSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdub3NjcmlwdCcpO1xuICB9XG5cbiAgaWYgKCgwLCBfZWxlbWVudC5pc1RodW5rKSh2bm9kZSkpIHtcbiAgICB2YXIgcHJvcHMgPSB2bm9kZS5wcm9wcztcbiAgICB2YXIgY29tcG9uZW50ID0gdm5vZGUuY29tcG9uZW50O1xuICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHZhciBvbkNyZWF0ZSA9IGNvbXBvbmVudC5vbkNyZWF0ZTtcblxuICAgIHZhciByZW5kZXIgPSB0eXBlb2YgY29tcG9uZW50ID09PSAnZnVuY3Rpb24nID8gY29tcG9uZW50IDogY29tcG9uZW50LnJlbmRlcjtcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgICAgY29udGV4dDogY29udGV4dFxuICAgIH07XG4gICAgdmFyIG91dHB1dCA9IHJlbmRlcihtb2RlbCk7XG4gICAgdmFyIF9ET01FbGVtZW50ID0gY3JlYXRlRWxlbWVudChvdXRwdXQsICgwLCBfZWxlbWVudC5jcmVhdGVQYXRoKShwYXRoLCBvdXRwdXQua2V5IHx8ICcwJyksIGRpc3BhdGNoLCBjb250ZXh0KTtcbiAgICBpZiAob25DcmVhdGUpIG9uQ3JlYXRlKG1vZGVsKTtcbiAgICB2bm9kZS5zdGF0ZSA9IHtcbiAgICAgIHZub2RlOiBvdXRwdXQsXG4gICAgICBtb2RlbDogbW9kZWxcbiAgICB9O1xuICAgIHJldHVybiBfRE9NRWxlbWVudDtcbiAgfVxuXG4gIHZhciBjYWNoZWQgPSBjYWNoZVt2bm9kZS50eXBlXTtcblxuICBpZiAodHlwZW9mIGNhY2hlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjYWNoZWQgPSBjYWNoZVt2bm9kZS50eXBlXSA9IF9zdmcyLmRlZmF1bHQuaXNFbGVtZW50KHZub2RlLnR5cGUpID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKF9zdmcyLmRlZmF1bHQubmFtZXNwYWNlLCB2bm9kZS50eXBlKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodm5vZGUudHlwZSk7XG4gIH1cblxuICB2YXIgRE9NRWxlbWVudCA9IGNhY2hlZC5jbG9uZU5vZGUoZmFsc2UpO1xuXG4gIGZvciAodmFyIG5hbWUgaW4gdm5vZGUuYXR0cmlidXRlcykge1xuICAgICgwLCBfc2V0QXR0cmlidXRlLnNldEF0dHJpYnV0ZSkoRE9NRWxlbWVudCwgbmFtZSwgdm5vZGUuYXR0cmlidXRlc1tuYW1lXSk7XG4gIH1cblxuICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY2hpbGQgPSBjcmVhdGVFbGVtZW50KG5vZGUsICgwLCBfZWxlbWVudC5jcmVhdGVQYXRoKShwYXRoLCBub2RlLmtleSB8fCBpbmRleCksIGRpc3BhdGNoLCBjb250ZXh0KTtcbiAgICBET01FbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfSk7XG5cbiAgcmV0dXJuIERPTUVsZW1lbnQ7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Rla3UvbGliL2RvbS9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZW1vdmVBdHRyaWJ1dGUgPSByZW1vdmVBdHRyaWJ1dGU7XG5leHBvcnRzLnNldEF0dHJpYnV0ZSA9IHNldEF0dHJpYnV0ZTtcblxudmFyIF9zdmdBdHRyaWJ1dGVOYW1lc3BhY2UgPSByZXF1aXJlKCdzdmctYXR0cmlidXRlLW5hbWVzcGFjZScpO1xuXG52YXIgX3N2Z0F0dHJpYnV0ZU5hbWVzcGFjZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdmdBdHRyaWJ1dGVOYW1lc3BhY2UpO1xuXG52YXIgX2VsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbnZhciBfaW5kZXhPZiA9IHJlcXVpcmUoJ2luZGV4LW9mJyk7XG5cbnZhciBfaW5kZXhPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmRleE9mKTtcblxudmFyIF9zZXRpZnkgPSByZXF1aXJlKCdzZXRpZnknKTtcblxudmFyIF9zZXRpZnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0aWZ5KTtcblxudmFyIF9ldmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpO1xuXG52YXIgX2V2ZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUoRE9NRWxlbWVudCwgbmFtZSwgcHJldmlvdXNWYWx1ZSkge1xuICB2YXIgZXZlbnRUeXBlID0gX2V2ZW50czIuZGVmYXVsdFtuYW1lXTtcbiAgaWYgKGV2ZW50VHlwZSkge1xuICAgIGlmICh0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgRE9NRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgcHJldmlvdXNWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdjaGVja2VkJzpcbiAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgY2FzZSAnc2VsZWN0ZWQnOlxuICAgICAgRE9NRWxlbWVudFtuYW1lXSA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5uZXJIVE1MJzpcbiAgICBjYXNlICdub2RlVmFsdWUnOlxuICAgICAgRE9NRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgIERPTUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBET01FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZShET01FbGVtZW50LCBuYW1lLCB2YWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICB2YXIgZXZlbnRUeXBlID0gX2V2ZW50czIuZGVmYXVsdFtuYW1lXTtcbiAgaWYgKHZhbHVlID09PSBwcmV2aW91c1ZhbHVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudFR5cGUpIHtcbiAgICBpZiAodHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIERPTUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHByZXZpb3VzVmFsdWUpO1xuICAgIH1cbiAgICBET01FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKDAsIF9lbGVtZW50LmlzVmFsaWRBdHRyaWJ1dGUpKHZhbHVlKSkge1xuICAgIHJlbW92ZUF0dHJpYnV0ZShET01FbGVtZW50LCBuYW1lLCBwcmV2aW91c1ZhbHVlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnY2hlY2tlZCc6XG4gICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgIGNhc2UgJ2lubmVySFRNTCc6XG4gICAgY2FzZSAnbm9kZVZhbHVlJzpcbiAgICAgIERPTUVsZW1lbnRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NlbGVjdGVkJzpcbiAgICAgIERPTUVsZW1lbnQuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgIC8vIEZpeCBmb3IgSUUvU2FmYXJpIHdoZXJlIHNlbGVjdCBpcyBub3QgY29ycmVjdGx5IHNlbGVjdGVkIG9uIGNoYW5nZVxuICAgICAgaWYgKERPTUVsZW1lbnQudGFnTmFtZSA9PT0gJ09QVElPTicgJiYgRE9NRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBzZWxlY3QgPSBET01FbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gKDAsIF9pbmRleE9mMi5kZWZhdWx0KShzZWxlY3Qub3B0aW9ucywgRE9NRWxlbWVudCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAoMCwgX3NldGlmeTIuZGVmYXVsdCkoRE9NRWxlbWVudCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIERPTUVsZW1lbnQuc2V0QXR0cmlidXRlTlMoKDAsIF9zdmdBdHRyaWJ1dGVOYW1lc3BhY2UyLmRlZmF1bHQpKG5hbWUpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9kZWt1L2xpYi9kb20vc2V0QXR0cmlidXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0c1snZGVmYXVsdCddID0gU3ZnQXR0cmlidXRlTmFtZXNwYWNlXG5cbi8qXG4gKiBTdXBwb3J0ZWQgU1ZHIGF0dHJpYnV0ZSBuYW1lc3BhY2VzIGJ5IHByZWZpeC5cbiAqXG4gKiBSZWZlcmVuY2VzOlxuICogLSBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkdUaW55MTIvYXR0cmlidXRlVGFibGUuaHRtbFxuICogLSBodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcvYXR0aW5kZXguaHRtbFxuICogLSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1Db3JlL2NvcmUuaHRtbCNJRC1FbFNldEF0dHJOU1xuICovXG5cbnZhciBuYW1lc3BhY2VzID0gbW9kdWxlLmV4cG9ydHMubmFtZXNwYWNlcyA9IHtcbiAgZXY6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMnLFxuICB4bGluazogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICB4bWw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xufVxuXG4vKipcbiAqIEdldCBuYW1lc3BhY2Ugb2Ygc3ZnIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lXG4gKiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZVxuICovXG5cbmZ1bmN0aW9uIFN2Z0F0dHJpYnV0ZU5hbWVzcGFjZSAoYXR0cmlidXRlTmFtZSkge1xuICAvLyBpZiBubyBwcmVmaXggc2VwYXJhdG9yIGluIGF0dHJpYnV0ZU5hbWUsIHRoZW4gbm8gbmFtZXNwYWNlXG4gIGlmIChhdHRyaWJ1dGVOYW1lLmluZGV4T2YoJzonKSA9PT0gLTEpIHJldHVybiBudWxsXG5cbiAgLy8gZ2V0IHByZWZpeCBmcm9tIGF0dHJpYnV0ZU5hbWVcbiAgdmFyIHByZWZpeCA9IGF0dHJpYnV0ZU5hbWUuc3BsaXQoJzonLCAxKVswXVxuXG4gIC8vIGlmIHByZWZpeCBpbiBzdXBwb3J0ZWQgcHJlZml4ZXNcbiAgaWYgKG5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkocHJlZml4KSkge1xuICAgIC8vIHRoZW4gbmFtZXNwYWNlIG9mIHByZWZpeFxuICAgIHJldHVybiBuYW1lc3BhY2VzW3ByZWZpeF1cbiAgfSBlbHNlIHtcbiAgICAvLyBlbHNlIHVuc3VwcG9ydGVkIHByZWZpeFxuICAgIHRocm93IG5ldyBFcnJvcignc3ZnLWF0dHJpYnV0ZS1uYW1lc3BhY2U6IHByZWZpeCBcIicgKyBwcmVmaXggKyAnXCIgaXMgbm90IHN1cHBvcnRlZCBieSBTVkcuJylcbiAgfVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N2Zy1hdHRyaWJ1dGUtbmFtZXNwYWNlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogaW5kZXgtb2YgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2luZGV4LW9mPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmRleE9mKGFyciwgZWxlLCBzdGFydCkge1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIHZhciBpZHggPSAtMTtcblxuICBpZiAoYXJyID09IG51bGwpIHJldHVybiBpZHg7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgaSA9IHN0YXJ0IDwgMFxuICAgID8gKGxlbiArIHN0YXJ0KVxuICAgIDogc3RhcnQ7XG5cbiAgaWYgKGkgPj0gYXJyLmxlbmd0aCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGFycltpXSA9PT0gZWxlKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgaSsrO1xuICB9XG5cbiAgcmV0dXJuIC0xO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9pbmRleC1vZi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbmF0dXJhbFNlbGVjdGlvbiA9IHJlcXVpcmUoJ25hdHVyYWwtc2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWxlbWVudCwgdmFsdWUpe1xuICAgIHZhciBjYW5TZXQgPSBuYXR1cmFsU2VsZWN0aW9uKGVsZW1lbnQpICYmIGVsZW1lbnQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoY2FuU2V0KSB7XG4gICAgICAgIHZhciBzdGFydCA9IGVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXG4gICAgICAgICAgICBlbmQgPSBlbGVtZW50LnNlbGVjdGlvbkVuZDtcblxuICAgICAgICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc2V0aWZ5L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzdXBwb3J0ZWRUeXBlcyA9IFsndGV4dCcsICdzZWFyY2gnLCAndGVsJywgJ3VybCcsICdwYXNzd29yZCddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgIHJldHVybiAhIShlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlICYmIH5zdXBwb3J0ZWRUeXBlcy5pbmRleE9mKGVsZW1lbnQudHlwZSkpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9uYXR1cmFsLXNlbGVjdGlvbi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIFNwZWNpYWwgYXR0cmlidXRlcyB0aGF0IG1hcCB0byBET00gZXZlbnRzLlxuICovXG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgb25BYm9ydDogJ2Fib3J0JyxcbiAgb25BbmltYXRpb25TdGFydDogJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgb25BbmltYXRpb25JdGVyYXRpb246ICdhbmltYXRpb25pdGVyYXRpb24nLFxuICBvbkFuaW1hdGlvbkVuZDogJ2FuaW1hdGlvbmVuZCcsXG4gIG9uQmx1cjogJ2JsdXInLFxuICBvbkNhblBsYXk6ICdjYW5wbGF5JyxcbiAgb25DYW5QbGF5VGhyb3VnaDogJ2NhbnBsYXl0aHJvdWdoJyxcbiAgb25DaGFuZ2U6ICdjaGFuZ2UnLFxuICBvbkNsaWNrOiAnY2xpY2snLFxuICBvbkNvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuICBvbkNvcHk6ICdjb3B5JyxcbiAgb25DdXQ6ICdjdXQnLFxuICBvbkRvdWJsZUNsaWNrOiAnZGJsY2xpY2snLFxuICBvbkRyYWc6ICdkcmFnJyxcbiAgb25EcmFnRW5kOiAnZHJhZ2VuZCcsXG4gIG9uRHJhZ0VudGVyOiAnZHJhZ2VudGVyJyxcbiAgb25EcmFnRXhpdDogJ2RyYWdleGl0JyxcbiAgb25EcmFnTGVhdmU6ICdkcmFnbGVhdmUnLFxuICBvbkRyYWdPdmVyOiAnZHJhZ292ZXInLFxuICBvbkRyYWdTdGFydDogJ2RyYWdzdGFydCcsXG4gIG9uRHJvcDogJ2Ryb3AnLFxuICBvbkR1cmF0aW9uQ2hhbmdlOiAnZHVyYXRpb25jaGFuZ2UnLFxuICBvbkVtcHRpZWQ6ICdlbXB0aWVkJyxcbiAgb25FbmNyeXB0ZWQ6ICdlbmNyeXB0ZWQnLFxuICBvbkVuZGVkOiAnZW5kZWQnLFxuICBvbkVycm9yOiAnZXJyb3InLFxuICBvbkZvY3VzOiAnZm9jdXMnLFxuICBvbklucHV0OiAnaW5wdXQnLFxuICBvbkludmFsaWQ6ICdpbnZhbGlkJyxcbiAgb25LZXlEb3duOiAna2V5ZG93bicsXG4gIG9uS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gIG9uS2V5VXA6ICdrZXl1cCcsXG4gIG9uTG9hZDogJ2xvYWQnLFxuICBvbkxvYWRlZERhdGE6ICdsb2FkZWRkYXRhJyxcbiAgb25Mb2FkZWRNZXRhZGF0YTogJ2xvYWRlZG1ldGFkYXRhJyxcbiAgb25Mb2FkU3RhcnQ6ICdsb2Fkc3RhcnQnLFxuICBvblBhdXNlOiAncGF1c2UnLFxuICBvblBsYXk6ICdwbGF5JyxcbiAgb25QbGF5aW5nOiAncGxheWluZycsXG4gIG9uUHJvZ3Jlc3M6ICdwcm9ncmVzcycsXG4gIG9uTW91c2VEb3duOiAnbW91c2Vkb3duJyxcbiAgb25Nb3VzZUVudGVyOiAnbW91c2VlbnRlcicsXG4gIG9uTW91c2VMZWF2ZTogJ21vdXNlbGVhdmUnLFxuICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gIG9uTW91c2VPdXQ6ICdtb3VzZW91dCcsXG4gIG9uTW91c2VPdmVyOiAnbW91c2VvdmVyJyxcbiAgb25Nb3VzZVVwOiAnbW91c2V1cCcsXG4gIG9uUGFzdGU6ICdwYXN0ZScsXG4gIG9uUmF0ZUNoYW5nZTogJ3JhdGVjaGFuZ2UnLFxuICBvblJlc2V0OiAncmVzZXQnLFxuICBvblNjcm9sbDogJ3Njcm9sbCcsXG4gIG9uU2Vla2VkOiAnc2Vla2VkJyxcbiAgb25TZWVraW5nOiAnc2Vla2luZycsXG4gIG9uU3VibWl0OiAnc3VibWl0JyxcbiAgb25TdGFsbGVkOiAnc3RhbGxlZCcsXG4gIG9uU3VzcGVuZDogJ3N1c3BlbmQnLFxuICBvblRpbWVVcGRhdGU6ICd0aW1ldXBkYXRlJyxcbiAgb25UcmFuc2l0aW9uRW5kOiAndHJhbnNpdGlvbmVuZCcsXG4gIG9uVG91Y2hDYW5jZWw6ICd0b3VjaGNhbmNlbCcsXG4gIG9uVG91Y2hFbmQ6ICd0b3VjaGVuZCcsXG4gIG9uVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgb25Ub3VjaFN0YXJ0OiAndG91Y2hzdGFydCcsXG4gIG9uVm9sdW1lQ2hhbmdlOiAndm9sdW1lY2hhbmdlJyxcbiAgb25XYWl0aW5nOiAnd2FpdGluZycsXG4gIG9uV2hlZWw6ICd3aGVlbCdcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Rla3UvbGliL2RvbS9ldmVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzU3ZnRWxlbWVudCA9IHJlcXVpcmUoJ2lzLXN2Zy1lbGVtZW50Jyk7XG5cbnZhciBuYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGlzRWxlbWVudDogX2lzU3ZnRWxlbWVudC5pc0VsZW1lbnQsXG4gIG5hbWVzcGFjZTogbmFtZXNwYWNlXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9kZWt1L2xpYi9kb20vc3ZnLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogU3VwcG9ydGVkIFNWRyBlbGVtZW50c1xuICpcbiAqIEB0eXBlIHtBcnJheX1cbiAqL1xuXG5leHBvcnRzLmVsZW1lbnRzID0ge1xuICAnYW5pbWF0ZSc6IHRydWUsXG4gICdjaXJjbGUnOiB0cnVlLFxuICAnZGVmcyc6IHRydWUsXG4gICdlbGxpcHNlJzogdHJ1ZSxcbiAgJ2cnOiB0cnVlLFxuICAnbGluZSc6IHRydWUsXG4gICdsaW5lYXJHcmFkaWVudCc6IHRydWUsXG4gICdtYXNrJzogdHJ1ZSxcbiAgJ3BhdGgnOiB0cnVlLFxuICAncGF0dGVybic6IHRydWUsXG4gICdwb2x5Z29uJzogdHJ1ZSxcbiAgJ3BvbHlsaW5lJzogdHJ1ZSxcbiAgJ3JhZGlhbEdyYWRpZW50JzogdHJ1ZSxcbiAgJ3JlY3QnOiB0cnVlLFxuICAnc3RvcCc6IHRydWUsXG4gICdzdmcnOiB0cnVlLFxuICAndGV4dCc6IHRydWUsXG4gICd0c3Bhbic6IHRydWVcbn1cblxuLyoqXG4gKiBJcyBlbGVtZW50J3MgbmFtZXNwYWNlIFNWRz9cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICovXG5cbmV4cG9ydHMuaXNFbGVtZW50ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUgaW4gZXhwb3J0cy5lbGVtZW50c1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2lzLXN2Zy1lbGVtZW50L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaW5zZXJ0QXRJbmRleCA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuZGVmYXVsdCA9IHBhdGNoO1xuXG52YXIgX3NldEF0dHJpYnV0ZTIgPSByZXF1aXJlKCcuL3NldEF0dHJpYnV0ZScpO1xuXG52YXIgX2VsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9jcmVhdGUnKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF9kaWZmID0gcmVxdWlyZSgnLi4vZGlmZicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIE1vZGlmeSBhIERPTSBlbGVtZW50IGdpdmVuIGFuIGFycmF5IG9mIGFjdGlvbnMuIEEgY29udGV4dCBjYW4gYmUgc2V0XG4gKiB0aGF0IHdpbGwgYmUgdXNlZCB0byByZW5kZXIgYW55IGN1c3RvbSBlbGVtZW50cy5cbiAqL1xuXG5mdW5jdGlvbiBwYXRjaChkaXNwYXRjaCwgY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKERPTUVsZW1lbnQsIGFjdGlvbikge1xuICAgIF9kaWZmLkFjdGlvbnMuY2FzZSh7XG4gICAgICBzZXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAoMCwgX3NldEF0dHJpYnV0ZTIuc2V0QXR0cmlidXRlKShET01FbGVtZW50LCBuYW1lLCB2YWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQXR0cmlidXRlOiBmdW5jdGlvbiByZW1vdmVBdHRyaWJ1dGUobmFtZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAoMCwgX3NldEF0dHJpYnV0ZTIucmVtb3ZlQXR0cmlidXRlKShET01FbGVtZW50LCBuYW1lLCBwcmV2aW91c1ZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIGluc2VydEJlZm9yZShpbmRleCkge1xuICAgICAgICBpbnNlcnRBdEluZGV4KERPTUVsZW1lbnQucGFyZW50Tm9kZSwgaW5kZXgsIERPTUVsZW1lbnQpO1xuICAgICAgfSxcbiAgICAgIHNhbWVOb2RlOiBmdW5jdGlvbiBzYW1lTm9kZSgpIHt9LFxuICAgICAgdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKGNoYW5nZXMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgY2xvbmUgb2YgdGhlIGNoaWxkcmVuIHNvIHdlIGNhbiByZWZlcmVuY2UgdGhlbSBsYXRlclxuICAgICAgICAvLyB1c2luZyB0aGVpciBvcmlnaW5hbCBwb3NpdGlvbiBldmVuIGlmIHRoZXkgbW92ZSBhcm91bmRcbiAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoRE9NRWxlbWVudC5jaGlsZE5vZGVzKTtcblxuICAgICAgICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgIF9kaWZmLkFjdGlvbnMuY2FzZSh7XG4gICAgICAgICAgICBpbnNlcnRDaGlsZDogZnVuY3Rpb24gaW5zZXJ0Q2hpbGQodm5vZGUsIGluZGV4LCBwYXRoKSB7XG4gICAgICAgICAgICAgIGluc2VydEF0SW5kZXgoRE9NRWxlbWVudCwgaW5kZXgsICgwLCBfY3JlYXRlMi5kZWZhdWx0KSh2bm9kZSwgcGF0aCwgZGlzcGF0Y2gsIGNvbnRleHQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVDaGlsZDogZnVuY3Rpb24gcmVtb3ZlQ2hpbGQoaW5kZXgpIHtcbiAgICAgICAgICAgICAgRE9NRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlQ2hpbGQ6IGZ1bmN0aW9uIHVwZGF0ZUNoaWxkKGluZGV4LCBhY3Rpb25zKSB7XG4gICAgICAgICAgICAgIHZhciB1cGRhdGUgPSBwYXRjaChkaXNwYXRjaCwgY29udGV4dCk7XG4gICAgICAgICAgICAgIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZShjaGlsZE5vZGVzW2luZGV4XSwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgY2hhbmdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlVGh1bms6IGZ1bmN0aW9uIHVwZGF0ZVRodW5rKHByZXYsIG5leHQsIHBhdGgpIHtcbiAgICAgICAgdmFyIHByb3BzID0gbmV4dC5wcm9wcztcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbmV4dC5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5leHQuY29tcG9uZW50O1xuICAgICAgICB2YXIgb25VcGRhdGUgPSBjb21wb25lbnQub25VcGRhdGU7XG5cbiAgICAgICAgdmFyIHJlbmRlciA9IHR5cGVvZiBjb21wb25lbnQgPT09ICdmdW5jdGlvbicgPyBjb21wb25lbnQgOiBjb21wb25lbnQucmVuZGVyO1xuICAgICAgICB2YXIgcHJldk5vZGUgPSBwcmV2LnN0YXRlLnZub2RlO1xuICAgICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICAgIHByb3BzOiBwcm9wcyxcbiAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgIH07XG4gICAgICAgIHZhciBuZXh0Tm9kZSA9IHJlbmRlcihtb2RlbCk7XG4gICAgICAgIHZhciBjaGFuZ2VzID0gKDAsIF9kaWZmLmRpZmZOb2RlKShwcmV2Tm9kZSwgbmV4dE5vZGUsICgwLCBfZWxlbWVudC5jcmVhdGVQYXRoKShwYXRoLCAnMCcpKTtcbiAgICAgICAgRE9NRWxlbWVudCA9IGNoYW5nZXMucmVkdWNlKHBhdGNoKGRpc3BhdGNoLCBjb250ZXh0KSwgRE9NRWxlbWVudCk7XG4gICAgICAgIGlmIChvblVwZGF0ZSkgb25VcGRhdGUobW9kZWwpO1xuICAgICAgICBuZXh0LnN0YXRlID0ge1xuICAgICAgICAgIHZub2RlOiBuZXh0Tm9kZSxcbiAgICAgICAgICBtb2RlbDogbW9kZWxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICByZXBsYWNlTm9kZTogZnVuY3Rpb24gcmVwbGFjZU5vZGUocHJldiwgbmV4dCwgcGF0aCkge1xuICAgICAgICB2YXIgbmV3RWwgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkobmV4dCwgcGF0aCwgZGlzcGF0Y2gsIGNvbnRleHQpO1xuICAgICAgICB2YXIgcGFyZW50RWwgPSBET01FbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnRFbCkgcGFyZW50RWwucmVwbGFjZUNoaWxkKG5ld0VsLCBET01FbGVtZW50KTtcbiAgICAgICAgRE9NRWxlbWVudCA9IG5ld0VsO1xuICAgICAgICByZW1vdmVUaHVua3MocHJldik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlTm9kZTogZnVuY3Rpb24gcmVtb3ZlTm9kZShwcmV2KSB7XG4gICAgICAgIHJlbW92ZVRodW5rcyhwcmV2KTtcbiAgICAgICAgRE9NRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKERPTUVsZW1lbnQpO1xuICAgICAgICBET01FbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBhY3Rpb24pO1xuXG4gICAgcmV0dXJuIERPTUVsZW1lbnQ7XG4gIH07XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgcmVtb3ZlIGFsbCB0aHVua3NcbiAqL1xuXG5mdW5jdGlvbiByZW1vdmVUaHVua3Modm5vZGUpIHtcbiAgd2hpbGUgKCgwLCBfZWxlbWVudC5pc1RodW5rKSh2bm9kZSkpIHtcbiAgICB2YXIgX3Zub2RlID0gdm5vZGU7XG4gICAgdmFyIGNvbXBvbmVudCA9IF92bm9kZS5jb21wb25lbnQ7XG4gICAgdmFyIHN0YXRlID0gX3Zub2RlLnN0YXRlO1xuICAgIHZhciBvblJlbW92ZSA9IGNvbXBvbmVudC5vblJlbW92ZTtcbiAgICB2YXIgbW9kZWwgPSBzdGF0ZS5tb2RlbDtcblxuICAgIGlmIChvblJlbW92ZSkgb25SZW1vdmUobW9kZWwpO1xuICAgIHZub2RlID0gc3RhdGUudm5vZGU7XG4gIH1cblxuICBpZiAodm5vZGUuY2hpbGRyZW4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZW1vdmVUaHVua3Modm5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNsaWdodGx5IG5pY2VyIGluc2VydEJlZm9yZVxuICovXG5cbnZhciBpbnNlcnRBdEluZGV4ID0gZXhwb3J0cy5pbnNlcnRBdEluZGV4ID0gZnVuY3Rpb24gaW5zZXJ0QXRJbmRleChwYXJlbnQsIGluZGV4LCBlbCkge1xuICB2YXIgdGFyZ2V0ID0gcGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGFyZ2V0KTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9kZWt1L2xpYi9kb20vdXBkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuXG52YXIgX2RvbSA9IHJlcXVpcmUoJy4uL2RvbScpO1xuXG52YXIgZG9tID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RvbSk7XG5cbnZhciBfZGlmZiA9IHJlcXVpcmUoJy4uL2RpZmYnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuLyoqXG4gKiBDcmVhdGUgYSBET00gcmVuZGVyZXIgdXNpbmcgYSBjb250YWluZXIgZWxlbWVudC4gRXZlcnl0aGluZyB3aWxsIGJlIHJlbmRlcmVkXG4gKiBpbnNpZGUgb2YgdGhhdCBjb250YWluZXIuIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgbmV3IHN0YXRlIHRoYXQgY2FuXG4gKiByZXBsYWNlIHdoYXQgaXMgY3VycmVudGx5IHJlbmRlcmVkLlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIsIGRpc3BhdGNoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cbiAgdmFyIG9sZFZub2RlID0gbnVsbDtcbiAgdmFyIG5vZGUgPSBudWxsO1xuICB2YXIgcm9vdElkID0gb3B0aW9ucy5pZCB8fCAnMCc7XG5cbiAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShuZXdWbm9kZSwgY29udGV4dCkge1xuICAgIHZhciBjaGFuZ2VzID0gKDAsIF9kaWZmLmRpZmZOb2RlKShvbGRWbm9kZSwgbmV3Vm5vZGUsIHJvb3RJZCk7XG4gICAgbm9kZSA9IGNoYW5nZXMucmVkdWNlKGRvbS51cGRhdGUoZGlzcGF0Y2gsIGNvbnRleHQpLCBub2RlKTtcbiAgICBvbGRWbm9kZSA9IG5ld1Zub2RlO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIHZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUodm5vZGUsIGNvbnRleHQpIHtcbiAgICBub2RlID0gZG9tLmNyZWF0ZSh2bm9kZSwgcm9vdElkLCBkaXNwYXRjaCwgY29udGV4dCk7XG4gICAgaWYgKGNvbnRhaW5lcikgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIG9sZFZub2RlID0gdm5vZGU7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh2bm9kZSkge1xuICAgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICByZXR1cm4gbm9kZSAhPT0gbnVsbCA/IHVwZGF0ZSh2bm9kZSwgY29udGV4dCkgOiBjcmVhdGUodm5vZGUsIGNvbnRleHQpO1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9kZWt1L2xpYi9hcHAvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKVxudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnc2ltcGxlci1kZWJvdW5jZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RhdGVmdWwgKENvbXBvbmVudCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIENvbXBvbmVudCA9IHsgcmVuZGVyOiBDb21wb25lbnQgfVxuICB9XG5cbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cbiAgaWYgKCFvcHRpb25zLmFjdGlvbikgb3B0aW9ucy5hY3Rpb24gPSB7IHR5cGU6ICdVSV9TVEFURV9DSEFOR0UnIH1cblxuICB2YXIgc3RhdGVzID0ge31cbiAgdmFyIGRpc3BhdGNoXG5cbiAgdmFyIHVwZGF0ZSA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICBkaXNwYXRjaChvcHRpb25zLmFjdGlvbilcbiAgfSwgMClcblxuICAvKlxuICAgKiBQYXNzIHRocm91Z2ggYHJlbmRlcigpYCB3aXRoIHN0YXRlIGFuZCBzZXRTdGF0ZSBhZGRlZC5cbiAgICogQWxzbywgaWYgaXQncyB0aGUgZmlyc3QgcmVuZGVyLCBjYWxsIGBpbml0aWFsU3RhdGVgIGlmIGl0IGV4aXN0cy5cbiAgICovXG5cbiAgZnVuY3Rpb24gcmVuZGVyIChtb2RlbCkge1xuICAgIGlmICghc3RhdGVzLmhhc093blByb3BlcnR5KG1vZGVsLnBhdGgpKSB7XG4gICAgICBzdGF0ZXNbbW9kZWwucGF0aF0gPSAoQ29tcG9uZW50LmluaXRpYWxTdGF0ZSAmJiBDb21wb25lbnQuaW5pdGlhbFN0YXRlKG1vZGVsKSlcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcG9uZW50LnJlbmRlcihkZWNvcmF0ZU1vZGVsKG1vZGVsKSlcbiAgfVxuXG4gIC8qXG4gICAqIFVwZGF0ZXMgc3RhdGUgYW5kIHNjaGVkdWxlcyBhIGRpc3BhdGNoIG9uIHRoZSBuZXh0IHRpY2suXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldFN0YXRlIChtb2RlbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICBpZiAodHlwZW9mIHN0YXRlc1ttb2RlbC5wYXRoXSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc3RhdGVzW21vZGVsLnBhdGhdID0gYXNzaWduKHt9LCBzdGF0ZXNbbW9kZWwucGF0aF0sIHZhbHVlcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlc1ttb2RlbC5wYXRoXSA9IHZhbHVlc1xuICAgICAgfVxuICAgICAgZGlzcGF0Y2ggPSBtb2RlbC5kaXNwYXRjaFxuICAgICAgdXBkYXRlKClcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBDbGVhciBvdXQgc3RhdGVzIG9uIHJlbW92ZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gb25SZW1vdmUgKG1vZGVsKSB7XG4gICAgaWYgKENvbXBvbmVudC5vblJlbW92ZSkgQ29tcG9uZW50Lm9uUmVtb3ZlKGRlY29yYXRlTW9kZWwobW9kZWwpKVxuICAgIGRlbGV0ZSBzdGF0ZXNbbW9kZWwucGF0aF1cbiAgfVxuXG4gIC8qXG4gICAqIFBhc3MgdGhyb3VnaCBgb25VcGRhdGUoKWAgd2l0aCBzdGF0ZSBhbmQgc2V0U3RhdGUgYWRkZWQuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9uVXBkYXRlIChtb2RlbCkge1xuICAgIGlmIChDb21wb25lbnQub25VcGRhdGUpIENvbXBvbmVudC5vblVwZGF0ZShkZWNvcmF0ZU1vZGVsKG1vZGVsKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ3JlYXRlIChtb2RlbCkge1xuICAgIGlmIChDb21wb25lbnQub25DcmVhdGUpIENvbXBvbmVudC5vbkNyZWF0ZShkZWNvcmF0ZU1vZGVsKG1vZGVsKSlcbiAgfVxuXG4gIC8qXG4gICAqIEFkZHMgYHN0YXRlYCBhbmQgYHNldFN0YXRlYCB0byB0aGUgbW9kZWwuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRlY29yYXRlTW9kZWwgKG1vZGVsKSB7XG4gICAgcmV0dXJuIGFzc2lnbih7fSwgbW9kZWwsIHtcbiAgICAgIHN0YXRlOiBzdGF0ZXNbbW9kZWwucGF0aF0sXG4gICAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RhdGVzW21vZGVsLnBhdGhdIH0sXG4gICAgICBzZXRTdGF0ZTogc2V0U3RhdGUobW9kZWwpXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBhc3NpZ24oe30sIENvbXBvbmVudCwge1xuICAgIHJlbmRlcjogcmVuZGVyLFxuICAgIG9uUmVtb3ZlOiBvblJlbW92ZSxcbiAgICBvblVwZGF0ZTogb25VcGRhdGUsXG4gICAgb25DcmVhdGU6IG9uQ3JlYXRlXG4gIH0pXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vZGVrdS1zdGF0ZWZ1bC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Rla3Utc3RhdGVmdWwvfi9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRoYW5rcyBodHRwczovL2dpdGh1Yi5jb20vcmlvdC9yb3V0ZS9ibG9iL21hc3Rlci9saWIvaW5kZXguanNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xuICB2YXIgdFxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0KVxuICAgIHQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSlcbiAgfVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3NpbXBsZXItZGVib3VuY2UvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==