import checkers from '../checkers'
import helpers from '../helpers'
import localhelpers from './localhelpers'
const { insertAfterBabyqueryObject, insertAfterNormalElem, appendBabyQueryChild, appendNormalChild } = localhelpers
const { createHtmlElementDynamically } = helpers
const { isFunction, isPlainObject, isArrayLike, isValidHtmlElement, isBabyQueryObject } = checkers

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
          Array.isArray(callBackReturnedValue) ? this.after(...callBackReturnedValue) : this.after(callBackReturnedValue)
        } else if (typeof arguments[index] === 'string' || arguments[index] instanceof HTMLElement) {
          // Loop over BabyQuery context object Example: BabyQuery {0: h2, 1: h2, nodes: NodeList(2), length: 2}
          const newElement = typeof arguments[index] === 'string' ? createHtmlElementDynamically(arguments[index])[0] : arguments[index]
          insertAfterNormalElem(newElement, this[ind], ind)
        } else if (isArrayLike(arguments[index]) && !arguments[index].nodes) {
          this.after(...arguments[index])
        } else if (isBabyQueryObject(arguments[index])) {
          for (let i = arguments[index].length - 1; i >= 0; i--) {
            // clone the element
            let newClonedElement = arguments[index][i].cloneNode(true)
            // check if the element is already in the clonedNodeList
            const alreadyClonedElementInd = clonedNodeList.findIndex(ele => {
              return ele.originalElement === arguments[index][i] && ele.contextElementIndex === ind
            })
            if (alreadyClonedElementInd !== -1) {
              // remove the element from the dom tree
              clonedNodeList[alreadyClonedElementInd].oldClonedElement.replaceWith(newClonedElement)
              clonedNodeList[alreadyClonedElementInd].originalElement.replaceWith(arguments[index][i])
              // filter it from the clonedNodeList
              clonedNodeList = clonedNodeList.filter((ele, ind) => {
                return ind != alreadyClonedElementInd
              })
            } else {
              insertAfterBabyqueryObject(arguments[index][i], newClonedElement, this[ind], ind, this.length)
            }
            clonedNodeList.push({ contextElementIndex: ind, oldClonedElement: newClonedElement, originalElement: arguments[index][i] })
          }
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
          this.append(callBackReturnedValue)
        } else if (typeof arguments[index] === 'string' || arguments[index] instanceof HTMLElement) {
          const newElement = typeof arguments[index] === 'string' ? createHtmlElementDynamically(arguments[index])[0] : arguments[index]
          appendNormalChild(newElement, this[ind])
        } else if (isArrayLike(arguments[index]) && !arguments[index].nodes) {
          this.append(...arguments[index])
        } else if (isBabyQueryObject(arguments[index])) {
          for (let i = 0; i < arguments[index].length; i++) {
            // clone the element
            let newClonedElement = arguments[index][i].cloneNode(true)
            // check if the element is already in the clonedNodeList
            const alreadyClonedElementInd = clonedNodeList.findIndex(ele => {
              return ele.originalElement === arguments[index][i] && ele.contextElementIndex === ind
            })
            if (alreadyClonedElementInd !== -1) {
              // remove the element from the dom tree
              clonedNodeList[alreadyClonedElementInd].oldClonedElement.remove()
              clonedNodeList[alreadyClonedElementInd].originalElement.remove()
              // filter it from the clonedNodeList
              clonedNodeList = clonedNodeList.filter((elem, eleInd) => {
                return eleInd != alreadyClonedElementInd
              })
            }
            clonedNodeList.push({ contextElementIndex: ind, oldClonedElement: newClonedElement, originalElement: arguments[index][i] })
            appendBabyQueryChild(arguments[index][i], newClonedElement, this[ind], ind, this.length)
          }
        }
      }
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
