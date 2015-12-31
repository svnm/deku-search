/** @jsx element */

import Search from '../lib/search'

function myFunc (e) {
  console.log(e.target.value)
  console.log('love coming in to this callback')
}

import element from 'virtual-element'
import {render,tree} from 'deku'

let items = ['ruby', 'javascript', 'lua', 'go', 'c++', 'julia', 'java', 'c', 'scala', 'haskell']

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
    		placeHolder='Search for a programming language' 
    		onChange={myFunc} />

    <Search items={arrayItems} 
    		placeHolder='Search for a programming language' 
    		onChange={myFunc} 
    		keys={keys} 
    		searchKey={key} />

  </div>
);

render(counter, document.getElementById('root'))


