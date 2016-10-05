/** @jsx element */

/**
 * Autocomplete Search component
**/
import { element } from 'deku'
import stateful from 'deku-stateful'

function initialState() {
	return {
    menuItems: [],
    selectedItems: [],
    searchValue: '',
    menuVisible: false
	}
}

function onCreate({ props, state, setState }) {
	const {items} = props
  console.log('onCreate', props, state)
  /* need to copy component mount still */
}

function render({ props, state, setState }) {

  console.log('render',props,state)

	const { items, initialSelected, onItemsChanged, placeholder, NotFoundPlaceholder,
    maxSelected, multiple, onKeyChange, getItemsAsync } = props

	const { menuItems, selectedItems, searchValue, menuVisible } = state

  function SearchItemInArrayObjects(items, input, searchKey) {
    var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ''), 'i')
    return items.filter((item) => {
      if (reg.test(item[searchKey])) {
        return item
      }
    })
  }

  function selectMenuItem (item) {
    multiple ? addSelected(item) : setSelected( [item] )
    hideMenu()
  }

  function showMenu() {
    setState({menuVisible: true })
  }

  function hideMenu() {
    setState({menuVisible: false })
    resetPlaceholder()
  }

  function triggerItemsChanged() {
    if (onItemsChanged !== undefined) {
      onItemsChanged(selectedItems)
    }
  }

  function triggerKeyChange(searchValue) {
    if (onKeyChange !== undefined) {
      onKeyChange(searchValue)
    }
  }

  function triggerGetItemsAsync(searchValue) {
    if (getItemsAsync !== undefined) {
      getItemsAsync(searchValue, () => {
        updateSearchValue(searchValue)
      })
    }
  }

  function setSelected(selected) {
    setState({selectedItems: selected }, () => {
      triggerItemsChanged()
    })
  }

  function addSelected(selected) {
    let items = selectedItems
    items.push(selected)
    setState({selectedItems: items }, () => {
      triggerItemsChanged()
    })
  }

  function removeSelected(itemId) {
    let items = selectedItems
    let itemsUpdated = items.filter( (i) => {
	     return i.id != itemId
    })
    setState({selectedItems: itemsUpdated }, () => {
      triggerItemsChanged()
    })
  }

  function updateSearchValue(value) {
    setState({ searchValue: value }, () => {
      let menuItems = SearchItemInArrayObjects(items, searchValue, 'value')
      setMenuItems(menuItems)
    })
  }

  function showAllMenuItems() {
    setState({searchValue: ''})
    let menuItems = SearchItemInArrayObjects(items, '', 'value')
    setMenuItems(menuItems)
  }

  function setMenuItems(items) {
    setState({menuItems: items})
    if(items.length || getItemsAsync != undefined){
      showMenu()
    } else {
      hideMenu()
    }
  }

  function itemSelected(itemId) {
    let item = selectedItems.find( (s) => {
        return s.id === itemId;
    });
    return (item != undefined) ? true : false
  }

  function focusInput() {
    showAllMenuItems()
    document.querySelector('#searchInput').placeholder = ''
    document.querySelector('#searchInput').value = ''
    setTimeout(() => {
      document.querySelector('#searchInput').focus()
    }, 100);
  }

  function resetPlaceholder() {
    document.querySelector('#searchInput').placeholder = ''
  }

  function handleRemove(e) {
    e.preventDefault()
    e.stopPropagation()
    removeSelected(e.target.dataset.id)
  }

  function handleFocus(e) {
    focusInput()
  }

  function handleClick(e) {
    focusInput()
  }

  function handleItemClick(e) {
    focusInput()
  }

  function handleSelect(e) {
    let element = e.currentTarget.children[0]
    let item = { id: parseInt(element.dataset.id), value: element.innerHTML.replace(/&amp;/g, '&') }
    selectMenuItem(item)
  }

  function handleKeyChange (e) {
    let value = document.querySelector('#searchInput').value
    triggerKeyChange(value)
    if( getItemsAsync != undefined ) {
      triggerGetItemsAsync(value)
    } else {
      updateSearchValue(value)
    }
  }

  function renderMenuItems() {
    if(!menuItems.length) {
      return (
        <li class='autocomplete__item autocomplete__item--disabled'>
          <span data-id={0}>{NotFoundPlaceholder}</span>
        </li>
      )
    }

    let items = menuItems.map((item, i) => {
      if(itemSelected(item.id)){
        return (
          <li key={i} class='autocomplete__item autocomplete__item--disabled'>
            <span key={i} data-id={item.id} innerHTML={{__html: item.value }}></span>
          </li>
        )
      } else {
        return (
          <li key={i} class='autocomplete__item' onClick={() => handleSelect()}>
            <span key={i} data-id={item.id} innerHTML={{__html: item.value }}></span>
          </li>
        )
      }
    })
    return items
  }

  function renderSelectedItems() {
    if(!selectedItems.length && multiple ) return null;

    if(!selectedItems.length && !multiple ) {
      return (
        <li class='autocomplete__item autocomplete__item--selected autocomplete__item__dropdown'
            onClick={() => handleItemClick()}>
          <span innerHTML={{__html: placeholder }}></span>
          <span class='autocomplete__dropdown' />
        </li>
      )
    }

    let items = selectedItems.map((item, i) => {
      let itemClass = 'autocomplete__item autocomplete__item--selected autocomplete__item__dropdown'
      let dropDown = <span class='autocomplete__dropdown' />
      let icon = <span data-id={item.id} class='autocomplete__close'
                    onClick={() => handleRemove()}></span>

      if(multiple) {
        dropDown = null
        itemClass = 'autocomplete__item autocomplete__item--selected'
      }

      return (
        <li key={i} class={itemClass} onClick={() => handleItemClick()}>
          <span data-id={item.id} innerHTML={{__html: item.value }}></span>
          { icon }
          { dropDown }
        </li>
      )
    })
    return items
  }

  function renderInput() {
    let inputClass = 'autocomplete__input'
    if(multiple && selectedItems.length >= maxSelected ){
      inputClass = 'autocomplete__input autocomplete__input--hidden'
    }

    return (
      <input type='text'
             class={inputClass}
             id='searchInput'
             placeholder={placeholder}
             onClick={() => handleClick()}
             onFocus={() => handleFocus()}
             onKeyUp={() => handleKeyChange()} />
    )
  }

  function menuClass() {
    let menuClass = 'autocomplete__menu autocomplete__menu--hidden'
    if(menuVisible && !multiple){
      menuClass = 'autocomplete__menu'
    }
    if(menuVisible && selectedItems.length < maxSelected ){
      menuClass = 'autocomplete__menu'
    }
    return menuClass
  }

  return (
    <div class='autocomplete'>

      <div class='autocomplete__selected'>
        <ul class='autocomplete__items'>
          {renderSelectedItems()}
        </ul>
      </div>

      { multiple ? renderInput() : null }

      <div class='autocomplete__menu--wrap'>
        <div id='autocomplete' class={menuClass()}>
          { !multiple ? renderInput() : null }
          <ul class='autocomplete__items'>
            {renderMenuItems()}
          </ul>
        </div>
      </div>

    </div>
  )
}

var Search = stateful({ initialState, onCreate, render })

export default Search
