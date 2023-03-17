'use strict'

import helpers from '../src/helpers'
const {
  createHtmlElementDynamically
} = helpers


describe('createHtmlElementDynamically function', () => {
  test('passing just full html element', () => {
    const nodes = createHtmlElementDynamically('<p></p>')
    expect(NodeList.prototype.isPrototypeOf(nodes)).toBe(true)
    expect(nodes.length).toBe(1)
  })
  test('passing just full html element with text inside it.', () => {
    const nodes = createHtmlElementDynamically('<p>Hello world</p>')
    expect(NodeList.prototype.isPrototypeOf(nodes)).toBe(true)
    expect(nodes.length).toBe(1)
  })
  test('passing just full html element with text inside it.', () => {
    const nodes = createHtmlElementDynamically('<div class="cart-div"><p>hello world<p></div>')
    expect(NodeList.prototype.isPrototypeOf(nodes)).toBe(true)
    expect(nodes.length).toBe(1)
  })

  test('passing just full html element with text inside it.', () => {
    const nodes = createHtmlElementDynamically('<div class="cart-div"><p>hello world<p></div><div>hello world from 2nd div</div>')
    expect(NodeList.prototype.isPrototypeOf(nodes)).toBe(true)
    expect(nodes.length).toBe(2)
  })
})


describe('fileterDuplicateInaRow function', () => {
  // best case : time complexity n
// console.log(fileterDuplicateInaRow([1,1,1,1,1,1,1,1,1]))

// avarage case : time complexity n
// console.log(fileterDuplicateInaRow([2,5,3,3,5,2,3,4,4,5,5,1]))

// worst case : time complexity n
// console.log(fileterDuplicateInaRow([1,2,3,4,5,6,7,8,9]))

})
