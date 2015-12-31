/** @jsx element */

import element from 'virtual-element'
import SearchItemInArray from './SearchItemInArray'
import SearchItemInArrayObjects from './SearchItemInArrayObjects'

let Search = {

  initialState () {
    return { matchingItems: [] }
  },

  render (component) {
    let { props, state } = component
    let { matchingItems } = state
    let items = []

    if ((props.keys !== undefined)) {
      /* items for hash results */
      items = matchingItems.map((item, i) => {
        return (
          <li key={i}
              class='menu-item'
              onClick={selectAutoComplete}>
            {
              props.keys.map((itemKey, j) => {
                return (
                  <a key={j}>
                  { item[itemKey] }
                  </a>
                )
              })
            }
          </li>
        )
      })
    } else {
      /* items for a simple array */
      items = matchingItems.map((item, i) => (
        <li key={i} class='menu-item'>
          <a onClick={selectAutoComplete}>{item}</a>
        </li>
      ))
    }

    return (
      <div class='deku-search'>

       <input type='text'
              class='input'
              placeholder={props.placeHolder}
              onKeyUp={changeInput.bind(this)} />

        <div class='menu menu-hidden'>
          <ul class='menu-items'>
            {items}
          </ul>
        </div>

      </div>
    )
  },

  afterUpdate (component) {
    let { props, state } = component
  },

  afterMount (component, el, setState) {
    let { props, state } = component
  },

  beforeUnmount (component) {
    let { props, state } = component
  }
}

export default Search

function changeInput (e, component, setState) {
  let { props, state } = component

  /* change menu to open */
  let menu = e.target.parentElement.querySelectorAll('.menu')[0]
  menu.className = 'menu menu-open'

  let searchValue = e.target.value
  let result
  if ((props.keys !== undefined && props.searchKey !== undefined)) {
    /* hash */
    result = SearchItemInArrayObjects(props.items, searchValue, props.searchKey)
  } else {
    /* array */
    result = SearchItemInArray(props.items, searchValue)
  }
  setState({matchingItems: result})

  if (typeof props.onChange !== 'undefined') {
    props.onChange(e, result)
  }
}

function selectAutoComplete (e, component, setState) {
  let { props, state } = component

  /* change menu to hidden */
  e.target.parentNode.parentNode.parentNode.className = 'menu menu-hidden'
  
  /* set selected search result */
  let result = e.target.innerHTML
  let input = e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input')[0]
  input.value = result

  if (typeof props.onClick !== 'undefined') {
    props.onClick(e, result)
  }

}
