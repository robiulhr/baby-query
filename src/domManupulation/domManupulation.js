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
  /**
   * @param {String|Object} name 
   * - The name of the attribute to get. 
   * - An object of attribute-value pairs to set.
   * @param {String|Number|Boolean|Function} value 
   * - A value to set for the attribute. If null, the specified attribute will be removed.
   * - A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old attribute value as arguments.
   * @returns {Object} return the BabyQuery object
   */
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
  /**
   * @param {String|Function|Object} input 
   * - A string of HTML to set as the content of each matched element.
   * - A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.
   * @returns {Object} return the BabyQuery object
   */
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
  /**
   * @param {String|HTMLElement|Boolean} text 
   * - The text to set as the content of each matched element. When Number or Boolean is supplied, it will be converted to a String representation.
   * - A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments.
   * @returns {Object} return the BabyQuery object
   */
  text: function (text) {
    console.log(this[0])
    if (!text) {
      return this[0].textContent
    } else if (typeof text === 'string' || typeof text ===  "number") {
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
