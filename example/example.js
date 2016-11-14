/** @jsx element */
import Search from '../lib/Search'
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
