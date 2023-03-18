'use strict'
import $ from '../../src/babyQuery'
// import $ from '../../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
  document.body.innerHTML = htmlText
}

describe('.css() method', () => {
  // Set up the document body
  const defaultHtml = `<style>div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><div style="background-color: blue"></div><div style="background-color: rgb(15, 99, 30)"></div><div style="background-color: #123456"></div><div style="background-color: #f11"></div>`
  test('.css()', () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    expect($('div').css('background-color')).toEqual('blue')
  })
  test("$('div').css(['width', 'height', 'color', 'background-color'])", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    expect(
      $('div').css(['width', 'height', 'color', 'background-color'])
    ).toEqual({
      'background-color': 'blue',
      color: '',
      height: '60px',
      width: '60px'
    })
  })
  test("$('div').css('background', 'red')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('background', 'red')
    expect(window.getComputedStyle($('div')[0])['background-color']).toEqual(
      'red'
    )
    expect(window.getComputedStyle($('div')[1])['background-color']).toEqual(
      'red'
    )
    expect(window.getComputedStyle($('div')[2])['background-color']).toEqual(
      'red'
    )
    expect(window.getComputedStyle($('div')[3])['background-color']).toEqual(
      'red'
    )
  })
  test("$('div').css('width', '+=200')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', '+=200')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('260px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('260px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('260px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('260px')
  })
  test("$('div').css({'background-color': 'yellow','font-weight': 'bolder'})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css({
      'background-color': 'yellow',
      'font-weight': 'bolder'
    })
    expect(window.getComputedStyle($('div')[0])['background-color']).toEqual(
      'yellow'
    )
    expect(window.getComputedStyle($('div')[0])['font-weight']).toEqual(
      'bolder'
    )
    expect(window.getComputedStyle($('div')[1])['background-color']).toEqual(
      'yellow'
    )
    expect(window.getComputedStyle($('div')[1])['font-weight']).toEqual(
      'bolder'
    )
    expect(window.getComputedStyle($('div')[2])['background-color']).toEqual(
      'yellow'
    )
    expect(window.getComputedStyle($('div')[2])['font-weight']).toEqual(
      'bolder'
    )
    expect(window.getComputedStyle($('div')[3])['background-color']).toEqual(
      'yellow'
    )
    expect(window.getComputedStyle($('div')[3])['font-weight']).toEqual(
      'bolder'
    )
  })
  test("$('div').css({width: function (index, value) {return parseFloat(value) * index},height: function (index, value) {return parseFloat(value) * index}})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css({
      width: function (index, value) {
        return parseFloat(value) * index
      },
      height: function (index, value) {
        return parseFloat(value) * index
      }
    })
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('0px')
    expect(window.getComputedStyle($('div')[0])['height']).toEqual('0px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('60px')
    expect(window.getComputedStyle($('div')[1])['height']).toEqual('60px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('120px')
    expect(window.getComputedStyle($('div')[2])['height']).toEqual('120px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('180px')
    expect(window.getComputedStyle($('div')[3])['height']).toEqual('180px')
  })

  test("$('div').css({width: function (index, value) { const width = parseFloat(value) * index this.textContent = `width is ${width}` return width },height: function (index, value) {const height = parseFloat(value) * index this.textContent = `width is ${height}` return height}})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css({
      width: function (index, value) {
        const width = parseFloat(value) * index
        this.textContent = `width is ${width}`
        return width
      },
      height: function (index, value) {
        const height = parseFloat(value) * index
        this.textContent = `width is ${height}`
        return height
      }
    })
    const allDivs = document.querySelectorAll("div")
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('0px')
    expect(window.getComputedStyle($('div')[0])['height']).toEqual('0px')
    expect(allDivs[0].textContent).toEqual('width is 0')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('60px')
    expect(window.getComputedStyle($('div')[1])['height']).toEqual('60px')
    expect(allDivs[1].textContent).toEqual('width is 60')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('120px')
    expect(window.getComputedStyle($('div')[2])['height']).toEqual('120px')
    expect(allDivs[2].textContent).toEqual('width is 120')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('180px')
    expect(window.getComputedStyle($('div')[3])['height']).toEqual('180px')
    expect(allDivs[3].textContent).toEqual('width is 180')

  })
  test("$('div').css('width', function (index, value) {return parseFloat(value) * index})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', function (index, value) {
      return parseFloat(value) * index
    })
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('0px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('60px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('120px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('180px')
  })
  test("$('div').css('width', function (index, value) { const width = parseFloat(value) * index this.textContent = `width is ${width}` return width})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', function (index, value) {
      const width = parseFloat(value) * index
      this.textContent = `width is ${width}`
      return width
    })
    const allDivs = document.querySelectorAll("div")
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('0px')
    expect(allDivs[0].textContent).toEqual('width is 0')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('60px')
    expect(allDivs[1].textContent).toEqual('width is 60')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('120px')
    expect(allDivs[2].textContent).toEqual('width is 120')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('180px')
    expect(allDivs[3].textContent).toEqual('width is 180')
  })
})
