/** @jsx element */

import Search from '../lib/search'

function myFunc (e) {
  console.log(e.target.value)
  console.log('love coming in to this callback')
}

import element from 'virtual-element'
import Counter from './Counter';
import {render,tree} from 'deku'

let counter = tree(
  <div class='app'>
    <Counter color='pink' />
    <Counter color='darkred' />
    <Search />
  </div>
);

render(counter, document.getElementById('root'))

/*
<Search items={this.props.items}
        placeHolder='Search for a programming language'
        onChange={this.myFunc} />
*/
//let ITEMS = ['ruby', 'javascript', 'lua', 'go', 'c++', 'julia', 'java', 'c', 'scala', 'haskell']
