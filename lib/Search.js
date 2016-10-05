'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deku = require('deku');

var _dekuStateful = require('deku-stateful');

var _dekuStateful2 = _interopRequireDefault(_dekuStateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return (0, _deku.element)(
        'li',
        { 'class': 'autocomplete__item autocomplete__item--disabled' },
        (0, _deku.element)(
          'span',
          { 'data-id': 0 },
          NotFoundPlaceholder
        )
      );
    }

    var items = menuItems.map(function (item, i) {
      if (itemSelected(item.id)) {
        return (0, _deku.element)(
          'li',
          { key: i, 'class': 'autocomplete__item autocomplete__item--disabled' },
          (0, _deku.element)('span', { key: i, 'data-id': item.id, innerHTML: { __html: item.value } })
        );
      } else {
        return (0, _deku.element)(
          'li',
          { key: i, 'class': 'autocomplete__item', onClick: function onClick() {
              return handleSelect();
            } },
          (0, _deku.element)('span', { key: i, 'data-id': item.id, innerHTML: { __html: item.value } })
        );
      }
    });
    return items;
  }

  function renderSelectedItems() {
    if (!selectedItems.length && multiple) return null;

    if (!selectedItems.length && !multiple) {
      return (0, _deku.element)(
        'li',
        { 'class': 'autocomplete__item autocomplete__item--selected autocomplete__item__dropdown',
          onClick: function onClick() {
            return handleItemClick();
          } },
        (0, _deku.element)('span', { innerHTML: { __html: placeholder } }),
        (0, _deku.element)('span', { 'class': 'autocomplete__dropdown' })
      );
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

      return (0, _deku.element)(
        'li',
        { key: i, 'class': itemClass, onClick: function onClick() {
            return handleItemClick();
          } },
        (0, _deku.element)('span', { 'data-id': item.id, innerHTML: { __html: item.value } }),
        icon,
        dropDown
      );
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

  return (0, _deku.element)(
    'div',
    { 'class': 'autocomplete' },
    (0, _deku.element)(
      'div',
      { 'class': 'autocomplete__selected' },
      (0, _deku.element)(
        'ul',
        { 'class': 'autocomplete__items' },
        renderSelectedItems()
      )
    ),
    multiple ? renderInput() : null,
    (0, _deku.element)(
      'div',
      { 'class': 'autocomplete__menu--wrap' },
      (0, _deku.element)(
        'div',
        { id: 'autocomplete', 'class': menuClass() },
        !multiple ? renderInput() : null,
        (0, _deku.element)(
          'ul',
          { 'class': 'autocomplete__items' },
          renderMenuItems()
        )
      )
    )
  );
}

var Search = (0, _dekuStateful2.default)({ initialState: initialState, onCreate: onCreate, render: render });

exports.default = Search;