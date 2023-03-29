import checkers from '../checkers'
import localhelpers from './localhelpers'
const { inputNotFunctionorArrayForAppend, inputNotFunctionorArrayForAfter } = localhelpers
const { isFunction, isPlainObject,isValidHtmlElement, isBabyQueryObject } = checkers

export default {
  /**
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   * @param {HTMLElement|String|Function} element Exp:
   * @returns {Object} return the BabyQuery object
   */
  after: function () {
    // keep all cloned element listed
    let clonedNodeList = []
    for (let index = arguments.length - 1; index >= 0; index--) {
      for (let ind = 0; ind < this.length; ind++) {
        if (isFunction(arguments[index])) {
          const callBackReturnedValue = arguments[index].call(this[ind])
          /**
           * checks return value and handles it
           * string
           * BabyQuery Object
           * array element
           * Html element
           */
          clonedNodeList = inputNotFunctionorArrayForAfter.call(this, callBackReturnedValue, clonedNodeList, ind)
        } else {
          clonedNodeList = inputNotFunctionorArrayForAfter.call(this, arguments[index], clonedNodeList, ind)
        }
      }
    }
    return this
  },
  /**
   * insert content, specified by the parameter, inside each element in the set of matched elements.
   * @param {HTMLElement|String|Function} element Exp:
   * @returns {Object} return the BabyQuery object
   */
  append: function () {
    // keep all cloned element listed
    let clonedNodeList = []
    for (let index = 0; index < arguments.length; index++) {
      for (let ind = 0; ind < this.length; ind++) {
        if (isFunction(arguments[index])) {
          const callBackReturnedValue = arguments[index].call(this[ind])
          /**
           * checks return value and handles it
           * string
           * BabyQuery Object
           * array element
           * Html element
           */
          clonedNodeList = inputNotFunctionorArrayForAppend.call(this, callBackReturnedValue, clonedNodeList, ind)
        } else {
          clonedNodeList = inputNotFunctionorArrayForAppend.call(this, arguments[index], clonedNodeList, ind)
        }
      }
    }
    return this
  },
  attr: function (name, value) {
    if (typeof name === 'string') {
      if (!value) {
        return this['0']?.getAttribute(name) || undefined
      } else if (typeof value === 'string') {
        this['0']?.setAttribute(name, value)
      } else if (isFunction(value)) {
        for (let i = 0; i < this.length; i++) {
          const currVal = this[i]?.getAttribute(name)
          const newVal = value.call(this[i], i, currVal)
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
        this[i].textContent = text.call(this[i], i, this[i].textContent)
      }
    }
    return this
  },
  toggle: function () {}
}
