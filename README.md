# deku-search

[![npm version](https://badge.fury.io/js/deku-search.svg)](https://badge.fury.io/js/deku-search)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

deku-search is a simple search autocomplete component.

## Installation

`npm install deku-search --save`

## Usage

```jsx

/** @jsx element */

import Search from 'deku-search'
import element from 'virtual-element'
import {render,tree} from 'deku'

let items = ['ruby', 'javascript', 'lua', 'go', 'c++', 'julia', 'scala', 'haskell']

let arrayItems = [ 
  { title: 'javascript', description: 'an awesome language' },
  { title: 'ruby', description: 'a cool language' },
  { title: 'haskell', description: 'a functional language' }
]
let keys = ['title', 'description']
let key = 'title'

let counter = tree(
  <div class='app'>
    <Search items={items} 
    		placeHolder='Search for a programming language' />

    <Search items={arrayItems} 
    		placeHolder='Search for a programming language'
    		keys={keys} 
    		searchKey={key} />
  </div>
);

render(counter, document.getElementById('root'))
```

## Props

#### `items` (required)
List of Items to filter through

#### `placeHolder`
Placeholder attribute for the text input

#### `onChange`
Update handler for the text input. Fired before the internal logic to update the autocomplete list

#### `onClick`
Click handler for each item in the autocomplete list. Fired before the internal logic to hide the autocomplete list

## Styles

deku-search can be used with your own custom styles. A minimal search.css style sheet is included in the example as a guide. 

## Development
    npm install
    npm run build
    npm test
    npm start

## License

[MIT](http://isekivacenz.mit-license.org/)
