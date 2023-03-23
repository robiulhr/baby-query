'use strict'

import checkers from '../src/checkers'
const { isValidElementSelector, isValidHtmlElement } = checkers

describe('isValidElementSelector function', () => {
  // true casses
  test('passing html element 1', () => {
    expect(isValidElementSelector('li')).toBe(true)
  })
  test('passing html element 2', () => {
    expect(isValidElementSelector('div, li')).toBe(true)
  })
  test('passing html element 3', () => {
    expect(isValidElementSelector('div > ul')).toBe(true)
  })

  test('passing html element 4', () => {
    expect(isValidElementSelector('div + ul')).toBe(true)
  })
  test('passing html element 5', () => {
    expect(isValidElementSelector('div ~ ul')).toBe(true)
  })

  test('passing html element 6', () => {
    expect(isValidElementSelector('div ul')).toBe(true)
  })

  test('passing class selector 1', () => {
    expect(isValidElementSelector('.class')).toBe(true)
  })

  test('passing class selector 1', () => {
    expect(isValidElementSelector('.class1.class2')).toBe(true)
  })
  test('passing class selector 2', () => {
    expect(isValidElementSelector('.class1 .class2')).toBe(true)
  })

  test('passing id selector', () => {
    expect(isValidElementSelector('#id')).toBe(true)
  })

  test('passing attribute selector 1', () => {
    expect(isValidElementSelector('[for]')).toBe(true)
  })
  test('passing attribute selector 2', () => {
    expect(isValidElementSelector('[for="email"]')).toBe(true)
  })
  test('passing attribute selector 3', () => {
    expect(isValidElementSelector('button[value^="Go"]')).toBe(true)
  })
  test('passing attribute selector 4', () => {
    expect(isValidElementSelector('img[src$=".png"]')).toBe(true)
  })
  test('passing attribute selector 5', () => {
    expect(isValidElementSelector('img[alt*="Van Gogh"]')).toBe(true)
  })
  test('passing attribute selector 6', () => {
    expect(isValidElementSelector('[title~=create]')).toBe(true)
  })
  test('passing attribute selector 7', () => {
    expect(isValidElementSelector('[lang|=nl]')).toBe(true)
  })
  test('passing pseudo class selector 1', () => {
    expect(isValidElementSelector('a:active')).toBe(true)
  })
  test('passing pseudo class selector 2', () => {
    expect(isValidElementSelector('a:visited')).toBe(true)
  })

  test('passing pseudo class selector 3', () => {
    expect(isValidElementSelector('a:link')).toBe(true)
  })

  test('passing pseudo class selector 4', () => {
    expect(isValidElementSelector('ul::after')).toBe(true)
  })

  test('passing pseudo class selector 5', () => {
    expect(isValidElementSelector('ul::before')).toBe(true)
  })

  test('passing pseudo class selector 6', () => {
    expect(isValidElementSelector('input:checked')).toBe(true)
  })

  test('passing pseudo class selector 8', () => {
    expect(isValidElementSelector('input::placeholder')).toBe(true)
  })

  test('passing pseudo class selector 9', () => {
    expect(isValidElementSelector('li:first-child')).toBe(true)
  })

  test('passing pseudo class selector 10', () => {
    expect(isValidElementSelector('li:nth-last-child(2)')).toBe(true)
  })

  test('passing pseudo class selector 11', () => {
    expect(isValidElementSelector('label:only-of-type')).toBe(true)
  })

  test('passing pseudo class selector 12', () => {
    expect(isValidElementSelector('p::first-letter')).toBe(true)
  })

  test('passing pseudo class selector 13', () => {
    expect(isValidElementSelector('p:lang(fr)')).toBe(true)
  })

  test('passing pseudo class selector 14', () => {
    expect(isValidElementSelector(':not(table)')).toBe(true)
  })

  test('passing pseudo class selector 15', () => {
    expect(isValidElementSelector(':root')).toBe(true)
  })

  test('passing pseudo class selector 16', () => {
    expect(isValidElementSelector('::selection')).toBe(true)
  })
  test('passing global selector', () => {
    expect(isValidElementSelector('*')).toBe(true)
  })
  // false casses
  test('passing invalid selector 1', () => {
    expect(isValidElementSelector('!invalid')).toBe(false)
  })

  test('passing invalid selector 2', () => {
    expect(isValidElementSelector('+invalid')).toBe(false)
  })

  test('passing invalid selector 3', () => {
    expect(isValidElementSelector('<p>')).toBe(false)
  })
  test('passing invalid selector 4', () => {
    expect(isValidElementSelector('<p>hello world</p>')).toBe(false)
  })

  test('passing invalid selector 6', () => {
    expect(isValidElementSelector('.123')).toBe(false)
  })

  test('passing invalid selector 6', () => {
    expect(isValidElementSelector('#&*!')).toBe(false)
  })

  test('passing invalid selector 7', () => {
    expect(isValidElementSelector('p{font-size:16px;;}')).toBe(false)
  })

  test('passing invalid selector 8', () => {
    expect(isValidElementSelector('.myClass { background-color: red; }')).toBe(
      false
    )
  })
})

describe('isValidHtmlElement function', () => {
  // true casses
  test('passing valid html element 1', () => {
    expect(isValidHtmlElement('<p></p>')).toBe(true)
  })
  test('passing valid html element 2', () => {
    expect(isValidHtmlElement('<p>hello world</p>')).toBe(true)
  })
  test('passing valid html element 3', () => {
    expect(isValidHtmlElement('<input value="value"/>')).toBe(true)
  })
  test('passing valid html element 4', () => {
    expect(isValidHtmlElement('<div><p></p></div>')).toBe(true)
  })

  test('passing valid html element 5', () => {
    expect(isValidHtmlElement('<div><p><span></span></p></div>')).toBe(true)
  })

  test('passing valid html element 6', () => {
    expect(
      isValidHtmlElement(
        '<div class="main-div"><p class="main-paragraph"><span></span></p></div>'
      )
    ).toBe(true)
  })
  test('passing valid html element 7', () => {
    expect(
      isValidHtmlElement(
        '<div class="main-div"><p class="main-paragraph"><span>hello world</span></p></div>'
      )
    ).toBe(true)
  })

  test('passing valid html element 9', () => {
    expect(isValidHtmlElement('<img src="image.jpg" alt="An image"/>')).toBe(
      true
    )
  })

  test('passing valid html element 9', () => {
    expect(
      isValidHtmlElement(
        '<div><p>This is a paragraph.</p><ul><li>Item 1</li><li>Item 2</li></ul></div>'
      )
    ).toBe(true)
  })

  test('passing valid html element 10', () => {
    expect(
      isValidHtmlElement(
        ' <div id="my-div" class="container"><h1>My Heading</h1><p>This is a paragraph with <a href="https://example.com">a link</a>.</p></div>'
      )
    ).toBe(true)
  })
  // false casses
  test('passing invalid html element 1', () => {
    expect(isValidHtmlElement('<p>')).toBe(false)
  })
  test('passing invalid html element 2', () => {
    expect(isValidHtmlElement('<p>hello world')).toBe(false)
  })
  test('passing invalid html element 3', () => {
    expect(isValidHtmlElement('<p/> hello world</p>')).toBe(false)
  })

  test('passing invalid html element 4', () => {
    expect(isValidHtmlElement('<p>hello world')).toBe(false)
  })
  test('passing invalid html element 5', () => {
    expect(isValidHtmlElement('<p>hello world<p/>')).toBe(false)
  })
  test('passing invalid html element 6', () => {
    expect(isValidHtmlElement('<p>hello world p/>')).toBe(false)
  })
  test('passing invalid html element 7', () => {
    expect(isValidHtmlElement('<p>hello world</div>')).toBe(false)
  })
  test('passing invalid html element 8', () => {
    expect(isValidHtmlElement('<p> hello world<p>')).toBe(false)
  })
  test('passing invalid html element 9', () => {
    expect(isValidHtmlElement('<p hello world</p>')).toBe(false)
  })
  test('passing invalid html element 10', () => {
    expect(isValidHtmlElement('</p> hello world</p>')).toBe(false)
  })
  test('passing invalid html element 11', () => {
    expect(isValidHtmlElement('hello world</p>')).toBe(false)
  })
  test('passing invalid html element 12', () => {
    expect(isValidHtmlElement('p>hello world</p>')).toBe(false)
  })
  test('passing invalid html element 13', () => {
    expect(isValidHtmlElement('<>hello world</p>')).toBe(false)
  })
  test('passing invalid html element 14', () => {
    expect(isValidHtmlElement('</hello world</p>')).toBe(false)
  })
  test('passing invalid html element 15', () => {
    expect(isValidHtmlElement('</>hello world</p>')).toBe(false)
  })
  test('passing invalid html element 16', () => {
    expect(isValidHtmlElement('</>hello world</>')).toBe(false)
  })
  test('passing invalid html element 17', () => {
    expect(isValidHtmlElement('<>hello world<>')).toBe(false)
  })
  test('passing invalid html element 18', () => {
    expect(isValidHtmlElement('< hello world</p>')).toBe(false)
  })
  test('passing invalid html element 19', () => {
    expect(isValidHtmlElement('<')).toBe(false)
  })
  test('passing invalid html element 20', () => {
    expect(isValidHtmlElement('<>')).toBe(false)
  })
  test('passing invalid html element 21', () => {
    expect(isValidHtmlElement('<div><p<span></p></div>')).toBe(false)
  })
  test('passing invalid html element 22', () => {
    expect(isValidHtmlElement('<div><p><span><p></div>')).toBe(false)
  })
  test('passing invalid html element 23', () => {
    expect(isValidHtmlElement('<div></p><span></span><div></div>')).toBe(false)
  })
  test('passing invalid html element 24', () => {
    expect(
      isValidHtmlElement('<div class="div-element></p><span></span><div></div>')
    ).toBe(false)
  })
  test('passing invalid html element 25', () => {
    expect(
      isValidHtmlElement('<div class="div-element"><p><span></span><div></div>')
    ).toBe(false)
  })
  test('passing invalid html element 26', () => {
    expect(isValidHtmlElement('hello world')).toBe(false)
  })
  test('passing invalid html element 27', () => {
    expect(isValidHtmlElement('hello world<p></p>')).toBe(false)
  })

  test('passing invalid html element 28', () => {
    expect(isValidHtmlElement('<p></p>hello world')).toBe(false)
  })

  test('passing invalid html element 29', () => {
    expect(
      isValidHtmlElement(
        '<div><p>This is a paragraph.</p><ul><li>Item 1</li><li>Item 2</ul></div>'
      )
    ).toBe(false)
  })

  test('passing invalid html element 30', () => {
    expect(
      isValidHtmlElement(` <div id="my-div" class="container">
      <h1>My Heading</h2>
      <p>This is a paragraph with <a href="https://example.com">a link</p>
    </div>`)
    ).toBe(false)
  })
})
