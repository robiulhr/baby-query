'use strict'
// import $ from '../src/babyQuery'
import $ from '../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
  document.body.innerHTML = htmlText
}

describe('.after() method', () => {
  // Set up the document body
  const defaultHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
  test('.after(content) 1', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.inner').after('<p>Test</p>')
    expect(document.querySelector('.container').innerHTML).toEqual(
      `<h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p>`
    )
  })
  test('.after(content) 2', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').after($('h2'))
    expect(document.body.innerHTML).toEqual(
      `<div class=\"container\"><div class=\"inner\">Hello</div><div class=\"inner\">Goodbye</div></div><h2>Greetings</h2>`
    )
  })
  test('.after(content) 3', () => {
    const customHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'))
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test('.after(content) 4', () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test('.after(content,content)', () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })

  test('.after(content,content)', () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test('.after(content,content,content)', () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('.last'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test('.after(content,content,content,content)', () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('p'), $('.last'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test('.after(content,content,content,content,content)', () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('p'), $('.last'), $('.last'), $('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><div class="last">last</div><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="container"><h2>Greetings</h2><div class="last">last</div><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test('.after(function)', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').after(function () {
      return '<div>' + this.className + '</div>'
    })
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div><div>container</div>`
    )
  })
  test('.after(content,[content])', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    var $newdiv1 = $('<div>element 1</div>'),
      $newdiv2 = $('<div>element 2</div>'),
      newdiv3 = document.createElement('div'),
      existingdiv1 = document.querySelector('.inner')
    $('h2').after($newdiv1, [$newdiv2, newdiv3, existingdiv1])
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div>element 1</div><div>element 2</div><div></div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
})

describe('.html() method', () => {
  // Set up the document body
  const defaultHtml = `<div class="demo-container"><div class="demo-box">Demonstration Box</div></div>`
  test('.html()', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div.demo-container').html()
    expect(document.querySelector('div.demo-container').innerHTML).toEqual(
      `<div class="demo-box">Demonstration Box</div>`
    )
  })
  test('.html(content)', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div.demo-container').html('<p>All new content. <em>You bet!</em></p>')
    expect(document.querySelector('div.demo-container').innerHTML).toEqual(
      `<p>All new content. <em>You bet!</em></p>`
    )
  })
  test('.html(function)', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div.demo-container').html(function () {
      var emphasis = '<em>' + $('div').length + ' paragraphs!</em>'
      return '<p>All new content for ' + emphasis + '</p>'
    })
    expect(document.querySelector('div.demo-container').innerHTML).toEqual(
      `<p>All new content for <em>2 paragraphs!</em></p>`
    )
  })
})
