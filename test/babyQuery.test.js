'use strict';

import $ from '../src/babyQuery'

// Set up our document body
document.body.innerHTML = `<div>
      <ul id="main-menu" class="menu">
          <li class="menu-items">Menu items 1</li>
          <li class="menu-items">Menu items 2</li>
          <li class="menu-items">Menu items 3</li>
          <li class="menu-items">Menu items 4</li>
          <li class="menu-items">Menu items 5</li>
      </ul>
  </div>
  <div>
      <ul id="sub-menu" class="menu">
          <li class="menu-items">Menu items 1</li>
          <li class="menu-items">Menu items 2</li>
          <li class="menu-items">Menu items 3</li>
          <li class="menu-items">Menu items 4</li>
          <li class="menu-items">Menu items 5</li>
      </ul>
  </div>`


describe('main function of babyQuery', () => {
  test('Calling $ function without any argument', () => {
    expect(typeof $()).toBe('object')
  })

  test('Selecting html element with html selector', () => {
    let liElements = document.querySelectorAll('li')
    expect($('li').nodes.length).toBe(liElements.length)
  })

  test('Selecting html element with Css selector', () => {
    let menuItems = document.querySelectorAll('.menu-items')
    expect($('.menu-items').nodes.length).toBe(menuItems.length)
  })

  test('Selecting html element with Css selector', () => {
    let mainMenu = document.querySelectorAll('#main-menu')
    expect($('#main-menu').nodes.length).toBe(mainMenu.length)
  })
})