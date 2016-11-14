# deku-search

[![npm version](https://badge.fury.io/js/deku-search.svg)](https://badge.fury.io/js/deku-search)

![](https://raw.githubusercontent.com/StevenIseki/deku-search/master/example/screenshot.gif)

deku-search is a simple Autocomplete Search component

## Install

`npm install deku-search --save`

## Usage basic

Pass in your `items` as a prop to deku-search. The items must be an array of objects with `value` and `id`, and any other props you may need, which will not be displayed. Check out the [example](https://github.com/StevenIseki/deku-search/blob/master/example) for more info.

```jsx
/** @jsx element */
import Search from 'deku-search'
import { element, createApp } from 'deku'

function HiItems(items) {
  console.log(items)
}

let items = [
  { id: 0, value: 'ruby' },
  { id: 1, value: 'javascript' },
  { id: 2, value: 'lua' },
  { id: 3, value: 'go' },
  { id: 4, value: 'julia' }
]

function update () {
  render(<Search items={items}
                 placeholder='Pick your language'
                 NotFoundPlaceholder='No items found...'
                 maxSelected={3}
                 multiple={true}
                 onItemsChanged={ (items) => HiItems(items) } />, {})
}

var render = createApp(document.body, update)
update()

```

## Props

#### `items` (required)
List of Items to filter through, an array of items with `value` and `id`, and any other props. value is displayed. ` let items = [{ id: 0, value: 'ruby' }, { id: 1, value: 'lua' }`

#### `multiple` (optional)
Defaults to false, set as true if you want multiple items in the list, false for a single selection dropdown.

#### `maxSelected` (optional)
Defaults to 100, a maximum number of items allowed to be selected

#### `placeholder` (optional)
placeholder for the input

#### `NotFoundPlaceholder` (optional)
The placeholder shown when no results are found

#### `onItemsChanged` (optional)
Handler returns the items from the Search autocomplete component when items are added or removed from the list.

#### `onKeyChange` (optional)
Handler returns the search value on key change.


## Styles

deku-search can be used with your own custom styles. A minimal [deku-search.css](https://github.com/StevenIseki/deku-search/blob/master/lib/deku-search.css) style sheet is included.

## Development

    npm install
    npm run build
    npm test
    npm start

## License

[MIT](http://isekivacenz.mit-license.org/)
