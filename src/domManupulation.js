import checkers from './checkers'
import helpers from './helpers'
const { isFunction, isPlainObject, isValidHtmlElement } = checkers

export default {
  after: function (element, elemArr) {
    if (typeof element === 'string') {
      console.log('element is string')
    }
  },
  append: function () {},
  attr: function (name, value) {
    if (typeof name === 'string') {
      if (!value) {
        return this['0']?.getAttribute(name)
      } else if (typeof value === 'string') {
        this['0']?.setAttribute(name, value)
        return this
      } else if (isFunction(value)) {
        for (let i = 0; i < this.length; i++) {
          const currVal = this[i]?.getAttribute(name)
          const newVal = value(i, currVal)
          newVal && this[i]?.setAttribute(name, newVal)
        }
        return this
      }
    } else if (isPlainObject(value)) {
      for (let prop in value) {
        this['0'].setAttribute(prop, value[prop])
      }
      return this
    }
  },
  before: function () {},
  empty: function () {},
  get: function () {},
  has: function () {},
  html: function (input) {
    if (!input) {
      return this['0'].innerHTML
    } else if (typeof input === 'string' && isValidHtmlElement(input)) {
      this['0'].innerHTML = input
      return this
    } else if (isFunction(input)) {
      console.log(input())
      this['0'].innerHTML = input();
      return this
    }
  },
  prepend: function () {},
  remove: function () {},
  removeAttr: function () {},
  text: function () {},
  toggle: function () {}
}
