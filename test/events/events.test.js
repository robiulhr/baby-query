'use strict'
// import $ from '../../src/babyQuery'
import $ from '../../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
  document.body.innerHTML = htmlText
}

describe('.on() method', () => {
  // Set up the document body
  //   const defaultHtml = `<style>p {color: red;}span {color: blue;}</style><p>Has an attached custom event.</p><button>Trigger custom event</button><span style="display:none;"></span>`
  test('should add a click event listener to the button', () => {
    const customHtml = `<div><button id="my-button">Click me</button></div>`
    setDefaultHtml(customHtml)
    const button = document.getElementById('my-button')
    const callback = jest.fn()
    $('#my-button').on('click', callback)
    button.click()
    expect(callback).toHaveBeenCalled()
  })

  test('On a data table with 1,000 rows in its tbody, this example attaches a handler to 1,000 elements', () => {
    const customHtml = `<table id="dataTable"><thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead><tbody><tr><td>Row 1, Column 1</td><td>Row 1, Column 2</td><td>Row 1, Column 3</td></tr><tr><td>Row 2, Column 1</td><td>Row 2, Column 2</td><td>Row 2, Column 3</td></tr><tr><td>Row 3, Column 1</td><td>Row 3, Column 2</td><td>Row 3, Column 3</td></tr></tbody></table><p></p>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('#dataTable tbody tr').on('click', function () {
      $(this).attr('data-clicked', true)
    })
    document.querySelectorAll('#dataTable tbody tr').forEach(ele => {
      ele.click()
      expect(ele.getAttribute('data-clicked')).toBe('true')
    })
  })

  test('An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody)', () => {
    // Set up the HTML for the table
    const customHtml = `<table id="dataTable"><tbody><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></tbody></table>`
    setDefaultHtml(customHtml)
    // Mock the console.log method
    console.log = jest.fn().mockImplementation()
    // Attach the event handler
    $('#dataTable tbody').on('click', 'tr', function () {
      console.log($(this).text())
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
     *  the on tBody click the callback won't be called because we pass the "tr" as argument in the on() method to stop the propogation bubbling up.
     */
    const tBody = document.querySelector('#dataTable tbody')
    tBody.click()
    // Check that console.log was called with the correct text
    expect(console.log).toHaveBeenNthCalledWith(1, 'Row 1')
    expect(console.log).toHaveBeenNthCalledWith(2, 'Row 1')
    expect(console.log).toHaveBeenNthCalledWith(3, 'Row 2')
    expect(console.log).toHaveBeenNthCalledWith(4, 'Row 2')

    // Restore the original console.log method
    console.log.mockRestore()
  })
  test('An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody)', () => {
    // Set up the HTML for the table
    const customHtml = `<table id="dataTable"><tbody><tr><td>Row 1<span style="color:aliceblue">hello world</span></td></tr></tbody></table>`
    setDefaultHtml(customHtml)
    // Mock the console.log method
    console.log = jest.fn().mockImplementation()
    // Attach the event handler
    $('#dataTable tbody').on('click', 'td', function () {
      console.log($(this).text())
    })

    // Restore the original console.log method
    console.log.mockRestore()
  })
})
