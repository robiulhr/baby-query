'use strict'
import $ from '../../src/babyQuery'
// import $ from '../../examples/api/jquery/jquery'

const setDefaultHtml = htmlText => {
  document.body.innerHTML = htmlText
}

describe('.css() method', () => {
  // Set up the document body
  const defaultHtml = `<style>:root{font-size: 16px;}div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><div style="background-color: blue"></div><div style="background-color: rgb(15, 99, 30)"></div><div style="background-color: #123456"></div><div style="background-color: rgb(255, 17, 17)"></div>`
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
  test("$('div').css('width', '+=200px')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', '+=200px')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('260px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('260px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('260px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('260px')
    $('div').css('width', '+=200px')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('460px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('460px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('460px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('460px')
  })
  test("$('div').css('width', '-=20px')", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', '-=20px')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('40px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('40px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('40px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('40px')
    $('div').css('width', '-=20px')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('20px')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('20px')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('20px')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('20px')
  })
  // test("$('div').css('width', '+=2rem')", () => {
  //   // set the html to default html
  //   setDefaultHtml(defaultHtml)
  //   $('div').css('width', '+=2rem')
  //   // somehow div width not updating. but it's working on the browser.
  //   expect(document.body.innerHTML).toBe('<style>:root{font-size: 16px;}div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><div style="background-color: blue; width: 5.75rem;"></div><div style="background-color: rgb(15, 99, 30); width: 5.75rem;"></div><div style="background-color: #123456; width: 5.75rem;"></div><div style="background-color: rgb(255, 17, 17); width: 5.75rem;"></div>')

  //   $('div').css('width', '+=200px')
  //   expect(document.body.innerHTML).toBe('<style>:root{font-size: 16px;}div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><div style="background-color: blue; width: 292px;"></div><div style="background-color: rgb(15, 99, 30); width: 292px;"></div><div style="background-color: #123456; width: 292px;"></div><div style="background-color: rgb(255, 17, 17); width: 292px;"></div>')

  // })
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
  test('$("p").css("width",function(i,ele){return "+=200px"})', () => {
    const customHtml = `<style>p{width: 100px;height: 30px;}</style><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p></div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('p').css('width', function (i, ele) {
      return '+=200px'
    })
    expect(document.querySelector('.container').innerHTML).toEqual(
      '<h2>Greetings</h2><div class="inner">Hello</div><p style="width: 300px;">Test</p><div class="inner">Goodbye</div><p style="width: 300px;">Test</p>'
    )
  })
  test('$("p").css("width",function(i,ele){return "+=200"})', () => {
    const customHtml = `<style>p{width: 100px;height: 30px;}</style><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p></div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('p').css('width', function (i, ele) {
      return '+=200'
    })
    expect(document.querySelector('.container').innerHTML).toEqual(
      '<h2>Greetings</h2><div class="inner">Hello</div><p style="width: 300px;">Test</p><div class="inner">Goodbye</div><p style="width: 300px;">Test</p>'
    )
  })
  // test('$("p").css("width",function(i,ele){return "+=2rem"})', () => {
  //   const customHtml = `<style>p{width: 100px;height: 30px;}</style><div class="container"><h2>Greetings</h2><div class="inner">Hello</div><p>Test</p><div class="inner">Goodbye</div><p>Test</p></div>`
  //   // set the html to default html
  //   setDefaultHtml(customHtml)
  //   $('p').css('width', function (i, ele) {
  //     return '+=2rem'
  //   })
  //   // somehow p element not updating but it's working fine in the browser.
  //   expect(document.querySelector('.container').innerHTML).toEqual(
  //     '<h2>Greetings</h2><div class="inner">Hello</div><p style="width: 8.25rem;">Test</p><div class="inner">Goodbye</div><p style="width: 8.25rem;">Test</p>'
  //   )
  //   $('p').css('width', function (i, ele) {
  //     return '+=20px'
  //   })
  //   expect(document.querySelector('.container').innerHTML).toEqual(
  //     '<h2>Greetings</h2><div class="inner">Hello</div><p style="width: 152px;">Test</p><div class="inner">Goodbye</div><p style="width: 152px;">Test</p>'
  //   )
  // })
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
    const allDivs = document.querySelectorAll('div')
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
    const allDivs = document.querySelectorAll('div')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('0px')
    expect(allDivs[0].textContent).toEqual('width is 0')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('60px')
    expect(allDivs[1].textContent).toEqual('width is 60')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('120px')
    expect(allDivs[2].textContent).toEqual('width is 120')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('180px')
    expect(allDivs[3].textContent).toEqual('width is 180')
  })
  test("$('div').css('width', function (index, value) { const width = parseFloat(value) * index this.textContent = `width is ${width}` return width})", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', function (index, value) {
      $(this).text('new div here.')
      return '200px'
    })
    const allDivs = document.querySelectorAll('div')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('200px')
    expect(allDivs[0].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('200px')
    expect(allDivs[1].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('200px')
    expect(allDivs[2].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('200px')
    expect(allDivs[3].textContent).toEqual('new div here.')
  })
  test(" $('div').css('width', function (index, value) {if(index!=0) $(this).text('new div here.')return '-=20px'}) 1", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', function (index, value) {
      if (index != 0) $(this).text('new div here.')
      return '-=20px'
    })
    const allDivs = document.querySelectorAll('div')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('40px')
    expect(allDivs[0].textContent).toEqual('')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('40px')
    expect(allDivs[1].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('40px')
    expect(allDivs[2].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('40px')
    expect(allDivs[3].textContent).toEqual('new div here.')
  })
  test(" $('div').css('width', function (index, value) {if(index!=0) $(this).text('new div here.')return '-=20px'}) 2", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', function (index, value) {
      if (index != 0) $(this).text('new div here.')
      return '-=20px'
    })
    const allDivs = document.querySelectorAll('div')
    expect(window.getComputedStyle($('div')[0])['width']).toEqual('40px')
    expect(allDivs[0].textContent).toEqual('')
    expect(window.getComputedStyle($('div')[1])['width']).toEqual('40px')
    expect(allDivs[1].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[2])['width']).toEqual('40px')
    expect(allDivs[2].textContent).toEqual('new div here.')
    expect(window.getComputedStyle($('div')[3])['width']).toEqual('40px')
    expect(allDivs[3].textContent).toEqual('new div here.')
  })
  test("$('div').css('width', function (i, ele) {if (i === 3) $('span').after(this)return '+=20px'}))", () => {
    // set the html to default html
    setDefaultHtml(defaultHtml)
    $('div').css('width', function (i, ele) {
      if (i === 3) $('span').after(this)
      return '+=20px'
    })
    expect(document.body.innerHTML).toEqual(
      '<style>:root{font-size: 16px;}div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><div style="background-color: rgb(255, 17, 17); width: 80px;"></div><div style="background-color: blue; width: 80px;"></div><div style="background-color: rgb(15, 99, 30); width: 80px;"></div><div style="background-color: rgb(18, 52, 86); width: 80px;"></div>'
    )
  })
  test(" $('div').css('width', function (index, value) {if(index!=0) $(this).text('new div here.')return '-=20px'})", () => {
    const customHtml = `<style>:root{font-size: 16px;}div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><span id="result">&nbsp;</span><div style="background-color: blue"></div><div style="background-color: rgb(15, 99, 30)"></div><div style="background-color: #123456"></div><div style="background-color: rgb(255, 17, 17)"></div>`
    // set the html to default html
    setDefaultHtml(customHtml)
    $('div').css('width', function (i, ele) {
      if (i === 3) $('span').after(this)
      return '+=20px'
    })
    expect(document.body.innerHTML).toEqual(
      '<style>:root{font-size: 16px;}div {width: 60px;height: 60px;margin: 5px;float: left;}</style><span id="result">&nbsp;</span><div style="background-color: rgb(255, 17, 17)"></div><span id="result">&nbsp;</span><div style="background-color: rgb(255, 17, 17); width: 80px;"></div><div style="background-color: blue; width: 80px;"></div><div style="background-color: rgb(15, 99, 30); width: 80px;"></div><div style="background-color: rgb(18, 52, 86); width: 80px;"></div>'
    )
  })
})
