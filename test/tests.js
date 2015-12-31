require('./_test-helper')
import test from 'ava'
import Search from '../lib/search'
import SearchItemInArray from '../src/SearchItemInArray'

const items = ['Steven', 'Sean', 'Stefan', 'Sam', 'Nathan']

test('search items in array returns correctly', t => {
  t.is(SearchItemInArray(items, 'ste')[0], 'Steven')
  t.end()
})

test('return empty list for empty string search', t => {
  t.same(SearchItemInArray(items, '   '), [])
  t.end()
})
