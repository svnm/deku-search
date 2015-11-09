# deku-search

[![npm version](https://badge.fury.io/js/deku-search.svg)](https://badge.fury.io/js/deku-search)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

deku-search is a simple search autocomplete component.

## Installation

`npm install deku-search --save`

## Usage

```jsx

import element from 'virtual-element'
import {render,tree} from 'deku'
import Search from 'deku-search'

let ITEMS = ['ruby', 'javascript', 'lua', 'go', 'julia', 'c', 'scala','haskell']

render(<Search items={ITEMS}/>, document.getElementById('root'));

```

## Basic Props

#### `items` (required)
List of Items to filter through

#### `classPrefix`
default: `deku-search`
Optional class prefix for included class names. Will also be attached to the main wrapper element. Included class suffixes are:
  - `__input`
  - `__menu`
  - `__menu-item`
  - `__menu--hidden`

#### `placeHolder`
Placeholder attribute for the text input

#### `onChange`
Update handler for the text input. Fired before the internal logic to update the autocomplete list

#### `onClick`
Click handler for each item in the autocomplete list. Fired before the internal logic to hide the autocomplete list

#### `ItemElement`
default: `'a'`
Custom element to use for each `<li>` in the autocomplete list. Can be an Element or a valid DOM tag as a string, such as `<CustomElement>` or `'div'`

## Advanced Props

All of the following allow you to extend ([via spread operator](https://facebook.github.io/react/docs/transferring-props.html)) the properties of the individual elements that make up the `Search` component.

#### `inputProps`
Property extensions for the text input

#### `itemProps`
Property extensions for the each individual autocomplete `<li>`

#### `itemElemProps`
Property extensions for the each child element of autocomplete `<li>`

#### `autoCompleteListProps`
Property extensions for the autocomplete `<ul>`

#### `autoCompleteProps`
Property extensions for the autocomplete wrapper

#### `wrapperProps`
Property extensions for the wrapper that is the root of the `<Search>` component

## Callbacks onClick and onChange

You can specify callback functions for onClick of the element and onChange of the search input. The element passed in is the SyntheticKeyboardEvent, which you can use to get the target or value. Check out the [example](https://github.com/StevenIseki/deku-search/tree/master/example)

## Styles

deku-search can be used with your own custom styles. A minimal search.css style sheet is included in the example as a guide. The styles follow [BEM](https://en.bem.info/method/) naming conventions.

## Development
    npm install
    npm run build
    npm test
    npm start

## License

[MIT](http://isekivacenz.mit-license.org/)
