'use strict'
// import $ from '../src/babyQuery'
import $ from '../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
    document.body.innerHTML = htmlText
}

describe('.after() method', () => {
  // Set up the document body
  const defaultHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
  // true casses
  test('.after(content)', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.inner').after('<p>Test</p>')
    expect(document.querySelector('.container').innerHTML).toMatch(
      `<h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p>`
    )
  })
  test('.after(content)', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').after($('h2'))
    console.log(document.querySelector('body').innerHTML)
    expect(document.querySelector('body').innerHTML).toMatch(
      `<div class=\"container\"><div class=\"inner\">Hello</div><div class=\"inner\">Goodbye</div></div><h2>Greetings</h2>`
    )
  })
})
