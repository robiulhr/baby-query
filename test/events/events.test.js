'use strict'
import $ from '../../src/babyQuery'
// import $ from '../../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
  document.body.innerHTML = htmlText
}

describe('.on() method', () => {
  // Set up the document body
  //   const defaultHtml = `<style>p {color: red;}span {color: blue;}</style><p>Has an attached custom event.</p><button>Trigger custom event</button><span style="display:none;"></span>`
  test('should add a click event listener to the button', () => {
    const customHtml = `<div><button id="my-button">Click me</button></div>`
    setDefaultHtml(customHtml)
    const button = $('#my-button')
    const callback = jest.fn()
    button.on('click', callback)
    button.trigger('click')
    expect(callback).toHaveBeenCalled()
  })
  test('On a data table with 1,000 rows in its tbody, this example attaches a handler to 1,000 elements', () => {
    const customHtml = `<table id="dataTable"><thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead><tbody><tr><td>Row 1, Column 1</td><td>Row 1, Column 2</td><td>Row 1, Column 3</td></tr><tr><td>Row 2, Column 1</td><td>Row 2, Column 2</td><td>Row 2, Column 3</td></tr><tr><td>Row 3, Column 1</td><td>Row 3, Column 2</td><td>Row 3, Column 3</td></tr></tbody></table><p></p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    const callBack = jest.fn()
    $('#dataTable tbody tr').on('click', callBack)
    $('#dataTable tbody tr').trigger('click')
    expect(callBack.mock.calls.length).toBe(3)
  })
  test('1. An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody)', () => {
    // Set up the HTML for the table
    const customHtml = `<table id="dataTable"><tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody></table>`
    setDefaultHtml(customHtml)
    customFunc = jest.fn()
    // Attach the event handler
    $('#dataTable tbody').on('click', 'tr', function () {
      customFunc($(this).text())
    })
    const row1 = document.querySelector('#dataTable tbody tr:nth-child(1)')
    row1.click()
    const row1Col1 = document.querySelector('#dataTable tbody tr:nth-child(1) td')
    row1Col1.click()
    const row2 = document.querySelector('#dataTable tbody tr:nth-child(2)')
    row2.click()
    const row2Col1 = document.querySelector('#dataTable tbody tr:nth-child(2) td')
    row2Col1.click()
    /**
     *  on the tBody the click callback won't be called because we pass the "tr" as argument in the on() method to stop the propogation bubbling up.
     */
    const tBody = document.querySelector('#dataTable tbody')
    tBody.click()
    /**
     *  Note: console will be called four times though we have fired the click event five times.
     * (we fired clicked element five times but since, we have stopped the propogation bubbling up for the tbody by passing the "tr" to the on() method as argument on the tbody element the clicked event callback won't be called. that's why it won't go up after the td element.)
     */
    expect(customFunc.mock.calls.length).toBe(4)
    // Check that console.log was called with the correct text

    expect(customFunc).toHaveBeenNthCalledWith(1, 'Row 1')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'Row 1')
    expect(customFunc).toHaveBeenNthCalledWith(3, 'Row 2')
    expect(customFunc).toHaveBeenNthCalledWith(4, 'Row 2')
  })
  test('2. An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up three level (from the clicked span to td)', () => {
    // Set up the HTML for the table
    const customHtml = `<table id="dataTable"><tbody><tr><td>Row 1<div><span style="color:aliceblue">hello world</span></div></td></tr></tbody></table>`
    setDefaultHtml(customHtml)
    // Mock the console.log method
    customFunc = jest.fn()
    // Attach the event handler
    $('#dataTable tbody').on('click', 'td', function () {
      customFunc($(this).text())
    })

    const row1Col1 = document.querySelector('#dataTable tbody tr td')
    row1Col1.click()
    const row1Col1div = document.querySelector('#dataTable tbody tr td div')
    row1Col1div.click()
    const row1Col1Span = document.querySelector('#dataTable tbody tr td div span')
    row1Col1Span.click()
    /**
     *  on the tBody and the tr the click callback won't be called because we pass the "td" as argument in the on() method to stop the propogation bubbling up.
     */
    const row1 = document.querySelector('#dataTable tbody tr')
    row1.click()
    const tBody = document.querySelector('#dataTable tbody')
    tBody.click()
    /**
     * Note: console will be called three times though we have fired the click event five times.
     * (we fired clicked element five times but since, we have stopped the propogation bubbling up for the tbody by passing the "td" to the on() method as argument on the tbody element the clicked event callback won't be called. that's why it won't go up after the td element.)
     * */
    expect(customFunc.mock.calls.length).toBe(3)
    // Check that console.log was called with the correct text
    expect(customFunc).toHaveBeenNthCalledWith(1, 'Row 1hello world')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'Row 1hello world')
    expect(customFunc).toHaveBeenNthCalledWith(3, 'Row 1hello world')
  })
  test('1. should prevent default and stop propagation when the callback will return false', () => {
    const customHtml = `<a href="#" class="disabled">Link 1</a>`
    setDefaultHtml(customHtml)
    // jQuery event handler:
    const link = $('a.disabled')
    const callBack = jest.fn(function (e) {
      return false
    })
    link.on('click.disabledLink', callBack)
    const event = {
      type: 'click.disabledLink',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }
    // Trigger click event
    link.trigger(event)
    // Expect callback to be called
    expect(callBack).toHaveBeenCalled()
    expect(callBack.mock.calls.length).toBe(1)
    // Expect preventDefault and stopPropagation to be called
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(event.stopPropagation.mock.calls.length).toBe(1)
    expect(event.stopPropagation).toHaveBeenCalled()
  })
  test('2. should prevent default and stop propagation when the callback = false', () => {
    const customHtml = `<a href="#" class="disabled">Link 1</a>`
    setDefaultHtml(customHtml)
    // jQuery event handler:
    const link = $('a.disabled')
    link.on('click.disabledLink', false)
    const event = {
      type: 'click.disabledLink',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }
    // Trigger click event
    link.trigger(event)
    // Expect preventDefault and stopPropagation to be called
    expect(event.preventDefault.mock.calls.length).toBe(1)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(event.stopPropagation.mock.calls.length).toBe(1)
    expect(event.stopPropagation).toHaveBeenCalled()
  })
  test('If a data argument is provided to .on() and is not null or undefined, it is passed to the handler in the event.data property each time an event is triggered.', () => {
    const customHtml = `<button>hello world</button>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    // jQuery event handler:
    function greet (event) {
      customFunc('Hello ' + event.data.name)
    }
    const name1 = {
      name: 'Karl'
    }
    // attach the first click event
    $('button').on('click.first', name1, greet)

    // trigger the first click event
    $('button').trigger('click.first')
    const name2 = {
      name: 'Addy'
    }
    // attach the second click event
    $('button').on('click.second', name2, greet)
    // trigger the second click event
    $('button').trigger('click.second')
    // Expect preventDefault and stopPropagation to be called
    expect(customFunc.mock.calls.length).toBe(2)
    expect(customFunc).toHaveBeenNthCalledWith(1, 'Hello Karl')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'Hello Addy')
  })
  test('Cancel only the default action by using .preventDefault().', () => {
    const customHtml = `<button>hello world</button>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const button = $('button')
    button.on('click', function (event) {
      event.preventDefault()
      customFunc(event.isDefaultPrevented())
    })
    button.trigger('click')
    expect(customFunc.mock.calls.length).toBe(1)
    expect(customFunc).toHaveBeenCalledWith(true)
  })
  test('Stop click events from bubbling without preventing form button, using .stopPropagation().', () => {
    const customHtml = `<button>hello world</button>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const button = $('button')
    button.on('click', function (event) {
      event.stopPropagation()
      customFunc(event.isPropagationStopped())
    })
    button.trigger('click')
    expect(customFunc.mock.calls.length).toBe(1)
    expect(customFunc).toHaveBeenCalledWith(true)
  })
  test('Pass data to the event handler using the second argument to .trigger()', () => {
    const customHtml = `<button>hello world</button>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const button = $('button')
    // jQuery event handler:
    button.on('click', function (event, person) {
      customFunc('Hello, ' + person.name)
    })
    button.trigger('click', { name: 'Jim' })
    // Expect preventDefault and stopPropagation to be called
    expect(customFunc.mock.calls.length).toBe(1)
    expect(customFunc).toHaveBeenCalledWith('Hello, Jim')
  })
  test('Use the the second argument of .trigger() to pass an array of data to the event handler', () => {
    const customHtml = `<button>hello world</button>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const button = $('button')
    // jQuery event handler:
    button.on('click', function (event, salutation, name) {
      customFunc(salutation + ', ' + name)
    })
    button.trigger('click', ['Goodbye', 'Jim'])
    // Expect preventDefault and stopPropagation to be called
    expect(customFunc.mock.calls.length).toBe(1)
    expect(customFunc).toHaveBeenCalledWith('Goodbye, Jim')
  })
  test('Attach and trigger custom (non-browser) events.', () => {
    const customHtml = `<p>Has an attached custom event.</p><button>Trigger custom event</button><span style="display:none;"></span>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const button = $('button')
    const p = $('p')
    // jQuery event handler:
    p.on('myCustomEvent', function (event, myName) {
      customFunc(
        $(this)
          .text(myName + ', hi there!')
          .text()
      )
    })
    p.trigger('myCustomEvent', ['John'])
    // Expect preventDefault and stopPropagation to be called
    expect(customFunc.mock.calls.length).toBe(1)
    expect(customFunc).toHaveBeenCalledWith('John, hi there!')
  })
  test('Attach multiple event handlers simultaneously using a plain object.', () => {
    const customHtml = `<div class="test">test div</div>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const testDiv = $('div.test')
    // jQuery event handler:
    testDiv.on({
      click: function () {
        $(this).text('click event')
      },
      mouseenter: function () {
        $(this).text('mouseenter event')
      },
      mouseleave: function () {
        $(this).text('mouseleave event')
      }
    })
    testDiv.trigger('click')
    customFunc(testDiv.text())
    testDiv.trigger('mouseenter')
    customFunc(testDiv.text())
    testDiv.trigger('mouseleave')
    customFunc(testDiv.text())
    expect(customFunc).toHaveBeenNthCalledWith(1, 'click event')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'mouseenter event')
    expect(customFunc).toHaveBeenNthCalledWith(3, 'mouseleave event')
  })
  test('Click any paragraph to add another after it. Note that .on() allows a click event on any paragraph--even new ones--since the event is handled by the ever-present body element after it bubbles to there.', () => {
    const customHtml = `<p>Click me!</p><span></span>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const body = $('body')
    const p = $('p')
    // jQuery event handler:
    var count = 0
    body.on('click', 'p', function () {
      ++count
      $(this).after(`<p class="p${count}">Another paragraph! ${count}</p>`)
    })
    // click the p for first time
    p.trigger('click')
    const p1 = $('p.p1')
    customFunc(p1.text())
    // click the p for second time
    p.trigger('click')
    const p2 = $('p.p2')
    customFunc(p2.text())
    // click the p for third time
    p.trigger('click')
    const p3 = $('p.p3')
    customFunc(p3.text())
    expect(customFunc).toHaveBeenNthCalledWith(1, 'Another paragraph! 1')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'Another paragraph! 2')
    expect(customFunc).toHaveBeenNthCalledWith(3, 'Another paragraph! 3')
  })
  test("Display each paragraph's text in an alert box whenever it is clicked", () => {
    const customHtml = `<div class="wrapper"><p class="paragraph-1">Click me!</p><p class="paragraph-2"><span class="inside-paragraph">hello from inside paragraph</span></p></div>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const body = $('body')
    // jQuery event handler:
    const mockCallback = jest.fn(function (e, elem) {
      $(this).attr('customAttr', elem)
    })
    // attach click event
    body.on('click', 'p', mockCallback)
    // click the p for first time
    const p1 = $('p.paragraph-1')
    p1.trigger('click', 'paragraph 1')
    customFunc(p1.attr('customAttr'))
    // click the p for second time
    const p2 = $('p.paragraph-2')
    p2.trigger('click', 'paragraph 2')
    customFunc(p2.attr('customAttr'))
    // click the outer div
    const wrapperDiv = $('div.wrapper')
    wrapperDiv.trigger('click', 'wrapper div')
    customFunc(wrapperDiv.attr('customAttr'))
    // click the inner div
    const insideParagraphSpn = $('span.inside-paragraph')
    insideParagraphSpn.trigger('click', 'inside paragraph')
    customFunc(insideParagraphSpn.attr('customAttr'))

    expect(mockCallback.mock.calls.length).toBe(3)
    expect(customFunc.mock.calls.length).toBe(4)
    expect(customFunc).toHaveBeenNthCalledWith(1, 'paragraph 1')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'paragraph 2')
    expect(customFunc).toHaveBeenNthCalledWith(3, undefined)
    expect(customFunc).toHaveBeenNthCalledWith(4, undefined)
  })
  test('Attach multiple events—one on mouseenter and one on mouseleave to the same element', () => {
    const customHtml = `<div class="wrapper">hello world</div>`
    setDefaultHtml(customHtml)
    const customFunc = jest.fn()
    const div = $('div.wrapper')
    // attach click event
    div.on('mouseenter mouseleave', function (event) {
      customFunc(event.type)
    })
    // fire the mouseenter event
    div.trigger('mouseenter')
    // fire the mouseleave event
    div.trigger('mouseleave')

    expect(customFunc.mock.calls.length).toBe(2)
    expect(customFunc).toHaveBeenNthCalledWith(1, 'mouseenter')
    expect(customFunc).toHaveBeenNthCalledWith(2, 'mouseleave')
  })
  test("Cancel a link's default action using the .preventDefault() method", () => {
    $('body').on('click', 'a', function (event) {
      event.preventDefault()
    })
  })
})

describe('.trigger() method', () => {
  // Set up the document body
  //   const defaultHtml = `<style>p {color: red;}span {color: blue;}</style><p>Has an attached custom event.</p><button>Trigger custom event</button><span style="display:none;"></span>`
  test('with the .trigger() method. A call to .trigger() executes the handlers in the same order they would be if the event were triggered naturally by the user', () => {})
})
