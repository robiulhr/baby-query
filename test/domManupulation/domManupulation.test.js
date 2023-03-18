'use strict'
import $ from '../../src/babyQuery'
// import $ from '../../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
  document.body.innerHTML = htmlText
}

describe('.after() method', () => {
  // Set up the document body
  const defaultHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
  test(".after('<p>Test</p>')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.inner').after('<p>Test</p>')
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p></div>`
    )
  })
  test('.after("<p>Test 1</p>","<p>Test 2</p>")', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.inner').after('<p>Test 1</p>', '<p>Test 2</p>')
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test 1</p><p>Test 2</p><div class="inner">Goodbye</div><p>Test 1</p><p>Test 2</p></div>`
    )
  })
  test(".after($('h2'))", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').after($('h2'))
    expect(document.body.innerHTML).toEqual(
      `<div class=\"container\"><div class=\"inner\">Hello</div><div class=\"inner\">Goodbye</div></div><h2>Greetings</h2>`
    )
  })
  test(".after($('p'))", () => {
    const customHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'))
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".after($('p'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".after($('p'), $('p'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })

  test(".after($('p'), $('.last'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".after($('p'), $('.last'), $('.last'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('.last'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".after($('p'), $('p'), $('.last'), $('.last'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('p'), $('.last'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".after($('p'), $('p'), $('.last'), $('.last'), $('p')) [Note:this functionality is slidely different from original jquery]", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').after($('p'), $('p'), $('.last'), $('.last'), $('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="container"><h2>Greetings</h2><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".after(function () {return '<div>' + this.className + '</div>'})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').after(function () {
      return '<div>' + this.className + '</div>'
    })
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div><div>container</div>`
    )
  })
  test('.after($newdiv1, [$newdiv2, newdiv3, existingdiv1])', () => {
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

describe('.append() method', () => {
  // Set up the document body
  const defaultHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
  test(".append('<p>Test</p>')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.inner').append('<p>Test</p>')
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello<p>Test</p></div><div class="inner">Goodbye<p>Test</p></div></div>`
    )
  })
  test('.append("<p>Test 1</p>","<p>Test 2</p>")', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.inner').append('<p>Test 1</p>', '<p>Test 2</p>')
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello<p>Test 1</p><p>Test 2</p></div><div class="inner">Goodbye<p>Test 1</p><p>Test 2</p></div></div>`
    )
  })
  test(".append($('h2'))", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').append($('h2'))
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><div class="inner">Hello</div><div class="inner">Goodbye</div><h2>Greetings</h2></div>`
    )
  })
  test("$('h2').append($('p') 1", () => {
    const customHtml = `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'))
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test("$('h2').append($('p')) 2", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test("$('h2').append($('p'), $('p'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'), $('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })

  test(".append($('p'), $('.last'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div></h2><div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".append($('p'), $('.last'), $('.last'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'), $('.last'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div></h2><div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".append($('p'), $('p'), $('.last'), $('.last'))", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'), $('p'), $('.last'), $('.last'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div></h2><div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".append($('p'), $('p'), $('.last'), $('.last'), $('p')) [Note:this functionality is slidely different from original jquery]", () => {
    const customHtml = `<h2>Greetings</h2><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p><p>Test</p></div><p>Test</p><div class="last">last</div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('h2').append($('p'), $('p'), $('.last'), $('.last'), $('p'))
    expect(document.body.innerHTML).toEqual(
      `<h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="container"><h2>Greetings<p>Test</p><p>Test</p><p>Test</p><p>Test</p><div class="last">last</div><p>Test</p><p>Test</p><p>Test</p><p>Test</p></h2><div class="inner">Hello</div><div class="inner">Goodbye</div></div>`
    )
  })
  test(".append(function () {return '<div>' + this.className + '</div>'})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('.container').append(function () {
      return '<div>' + this.className + '</div>'
    })
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings</h2><div class="inner">Hello</div><div class="inner">Goodbye</div><div>container</div></div>`
    )
  })
  test('.append($newdiv1, [$newdiv2, newdiv3, existingdiv1])', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    var $newdiv1 = $('<div>element 1</div>'),
      $newdiv2 = $('<div>element 2</div>'),
      newdiv3 = document.createElement('div'),
      existingdiv1 = document.querySelector('.inner')
    $('h2').append($newdiv1, [$newdiv2, newdiv3, existingdiv1])
    expect(document.body.innerHTML).toEqual(
      `<div class="container"><h2>Greetings<div>element 1</div><div>element 2</div><div></div><div class="inner">Hello</div></h2><div class="inner">Goodbye</div></div>`
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
    expect($('div.demo-container').html()).toEqual(
      `<div class="demo-box">Demonstration Box</div>`
    )
  })
  test(".html('<p>All new content. <em>You bet!</em></p>')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div.demo-container').html('<p>All new content. <em>You bet!</em></p>')
    expect(document.querySelector('div.demo-container').innerHTML).toEqual(
      `<p>All new content. <em>You bet!</em></p>`
    )
  })
  test("$('.demo-container').html($('h2'))", () => {
    // set the html to default html
    const customHtml = `<div class="demo-container"><div class="demo-box">Demonstration Box</div></div><div class="demo-container"><div class="demo-box">Demonstration Box</div></div><h2>hello world</h2><h2>hello world</h2>`
    setDefaultHtml(customHtml)
    $(".demo-container").html($("h2"))
    expect(document.body.innerHTML).toEqual(
      `<div class="demo-container"><h2>hello world</h2><h2>hello world</h2></div><div class="demo-container"><h2>hello world</h2><h2>hello world</h2></div>`
    )
  })
  test(".html(function () {var emphasis = '<em>' + $('div').length + ' paragraphs!</em>' return '<p>All new content for ' + emphasis + '</p>'})", () => {
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
  test("$('.demo-container').html(function( index,ele ) {return 'item number ' + ( index + 1 ) + ele})", () => {
    const customHtml = `<div class="demo-container"><div class="demo-box">Demonstration Box</div></div><div class="demo-container"><div class="demo-box">Demonstration Box</div></div><h2>hello world</h2><h2>hello world</h2>`
    setDefaultHtml(customHtml)
    $(".demo-container").html(function( index,ele ) {
      return "item number " + ( index + 1 ) + ele;
    })
    expect(document.body.innerHTML).toEqual(
      `<div class="demo-container">item number 1<div class="demo-box">Demonstration Box</div></div><div class="demo-container">item number 2<div class="demo-box">Demonstration Box</div></div><h2>hello world</h2><h2>hello world</h2>`
    )
  })
})

describe('.text() method', () => {
  // Set up the document body
  const defaultHtml = `<div class="demo-container"><div class="demo-box">Demonstration Box</div><ul><li>list item 1</li><li>list <strong>item</strong> 2</li></ul></div>`
  test("$('div.demo-container').text()", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div.demo-container').text()
    expect($('div.demo-container').text()).toEqual(
      `Demonstration Boxlist item 1list item 2`
    )
  })
  test("$('div.demo-container').text('<p>This is a test.</p>')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div.demo-container').text('<p>This is a test.</p>')
    expect($('div.demo-container').text()).toEqual(
      `<p>This is a test.</p>`
    )
  })
  test("$('div.demo-container').text('<p>This is a test.</p>','<p>hello world</p>')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $( "div.demo-container" ).text( "<p>This is a test.</p>" ,"<p>hello world</p>")
    expect($('div.demo-container').text()).toEqual(
      `<p>This is a test.</p>`
    )
  })
  test("$('ul li').text(function( index ) {return 'item number' + ( index + 1 )})", () => {
    // set the html to default html
    const customHtml = `<div class="demo-container"><div class="demo-box">Demonstration Box</div><ul><li>item 1</li><li>item 2</li><li>item 3</li></ul></div></body>`
    setDefaultHtml(customHtml)
    $( "ul li" ).text(function( index ) {
      return "item number " + ( index + 1 );
    })
    expect(document.body.innerHTML).toEqual(
      `<div class="demo-container"><div class="demo-box">Demonstration Box</div><ul><li>item number 1</li><li>item number 2</li><li>item number 3</li></ul></div>`
    )
  })
  test("$( 'ul li' ).text(function( index,text ) { return 'item number ' + ( index + 1 ) + ' previous text ' + text })", () => {
    // set the html to default html
    const customHtml = `<div class="demo-container"><div class="demo-box">Demonstration Box</div><ul><li>item 1</li><li>item 2</li><li>item 3</li></ul></div></body>`
    setDefaultHtml(customHtml)
    $( "ul li" ).text(function( index,text ) {
      return "item number " + ( index + 1 ) + " previous text " + text;
    })
    expect(document.body.innerHTML).toEqual(
      `<div class="demo-container"><div class="demo-box">Demonstration Box</div><ul><li>item number 1 previous text item 1</li><li>item number 2 previous text item 2</li><li>item number 3 previous text item 3</li></ul></div>`
    )
  })
})