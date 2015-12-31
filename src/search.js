/** @jsx element */

import {render,tree} from 'deku'
import element from 'virtual-element'
import SearchItemInArray from './SearchItemInArray'

let Search = {

  initialState () {
    return { matchingItems: [] }
  },

  render (component) {
    let { props, state } = component;
    let { matchingItems } = state;

    let items = state.matchingItems.map((item, i) => (
      <li key={i} class='menu-item'>
        <a onClick={selectAutoComplete}>
          {item}
        </a>
      </li>
    ))

    return (
      <div class='deku-search'>

       <input
            type='text'
            class='input'
            placeholder={props.placeHolder}
            ref='searchInput'
            onKeyUp={changeInput} />

        <div class='menu' ref='autocomplete'>
          <ul class='menu-items'>
            {items}
          </ul>
        </div>

      </div>
    );
  },

  afterUpdate (component) {
    let { props, state } = component;
  },

  afterMount (component, el, setState) {
    var counter = 0;
    component.interval = setInterval(() => {
       setState({ secondsElapsed: counter++ })
    }, 1000);
  },

  beforeUnmount (component) {
    clearInterval(component.interval);
  }
}

export default Search


function changeInput (e) {
  if (typeof props.onChange !== 'undefined') {
    props.onChange(e)
  }
  let searchValue = this.refs.searchInput.value
  let result = SearchItemInArray(props.items, searchValue)
  this.setState({matchingItems: result})
}

function selectAutoComplete (e) {
  if (typeof props.onClick !== 'undefined') {
    props.onClick(e)
  }

  let result = e.target.innerHTML
  this.refs.searchInput.value = result
}
