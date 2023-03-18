import checkers from '../checkers'
import helpers from '../helpers'
import localhelpers from './localhelpers'
const { afterandAppendmethodRecursive, insertAfter, appendChild } = localhelpers
const { isFunction, isPlainObject, isValidHtmlElement, isBabyQueryObject } = checkers
const { createHtmlElementDynamically, fileterDuplicateInaRow } = helpers

export default {
  after: function (element) {
    // binding this to the afterMethodRecursive function
    const afterandAppendmethodRecursiveBinded = afterandAppendmethodRecursive.bind(this)
    if (isFunction(element)) {
      for (let ind = 0; ind < this.length; ind++) {
        insertAfter(createHtmlElementDynamically(element.call(this[ind]))[0], this[ind])
      }
    } else {
      const filteredArguments = fileterDuplicateInaRow(arguments)
      afterandAppendmethodRecursiveBinded(filteredArguments, 'after')
    }
    return this
  },
  append: function (element) {
    // binding this to the  function
    const afterandAppendmethodRecursiveBinded = afterandAppendmethodRecursive.bind(this)
    if (isFunction(element)) {
      for (let ind = 0; ind < this.length; ind++) {
        appendChild(createHtmlElementDynamically(element.call(this[ind]))[0], this[ind])
      }
    } else {
      const filteredArguments = fileterDuplicateInaRow(arguments)
      afterandAppendmethodRecursiveBinded(filteredArguments, 'append')
    }
    return this
  },
  attr: function (name, value) {
    if (typeof name === 'string') {
      if (!value) {
        return this['0']?.getAttribute(name)
      } else if (typeof value === 'string') {
        this['0']?.setAttribute(name, value)
      } else if (isFunction(value)) {
        for (let i = 0; i < this.length; i++) {
          const currVal = this[i]?.getAttribute(name)
          const newVal = value.call(this[i],i, currVal)
          newVal && this[i]?.setAttribute(name, newVal)
        }
      }
    } else if (isPlainObject(value)) {
      for (let prop in value) {
        this['0'].setAttribute(prop, value[prop])
      }
    }
    return this
  },
  before: function () {},
  empty: function () {},
  get: function () {},
  has: function () {},
  html: function (input) {
    if (!input) {
      return this['0'].innerHTML
    }
    for (let i = 0; i < this.length; i++) {
      if (typeof input === 'string' && isValidHtmlElement(input)) {
        this[i].innerHTML = input
      } else if (isFunction(input)) {
        this[i].innerHTML = input(i, this[i].innerHTML)
      } else if (isBabyQueryObject(input)) {
        let tamplateElement = document.createElement('div')
        for (let ind = 0; ind < input.length; ind++) {
          tamplateElement.appendChild(input[ind])
        }
        this[i].innerHTML = tamplateElement.innerHTML
      }
    }

    return this
  },
  prepend: function () {},
  remove: function () {},
  removeAttr: function () {},
  text: function (text) {
    if (!text) {
      return this[0].textContent
    } else if (typeof text === 'string') {
      for (let i = 0; i < this.length; i++) {
        this[i].textContent = text
      }
    } else if (isFunction(text)) {
      for (let i = 0; i < this.length; i++) {
        this[i].textContent = text.call(this[i],i, this[i].textContent)
      }
    }
    return this
  },
  toggle: function () {}
}
