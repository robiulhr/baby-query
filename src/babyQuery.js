import helpers from './helpers.js'
import checkers from './checkers.js'
import domManupulation from './domManupulation.js'
const { isValidElementSelector, isValidHtmlElement, isPlainObject, isFunction, isWindow, toType, isArrayLike, isEmptyObject } = checkers
const { createHtmlElementDynamically, handleDOMReady, myExtend } = helpers

export default (function (globalThis) {
  function BabyQuery (selector, context) {
    // if Developer doesn't use the new keyword
    if (!(this instanceof BabyQuery)) {
      return new BabyQuery(selector, context)
    }
    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
      return this
    }

    // if Developer pass a css selector
    if (typeof selector === 'string') {
      // HANDLE: $(".class") , $("#id") and more valid selector
      if (isValidElementSelector(selector)) {
        // selecting all element
        this.nodes = (context || document).querySelectorAll(selector)
        // HANDLE: $(html)
      } else if (isValidHtmlElement(selector)) {
        this.nodes = createHtmlElementDynamically(selector)
        // HANDLE: $(html, props)
        if (context) {
          if (isPlainObject(context)) {
            this.nodes.forEach((ele, i) => {
              for (let prop in context) {
                this.attr.call(ele, prop, context[prop])
              }
            })
          }
        }
      }
    } else if (typeof selector === 'function') {
      handleDOMReady(selector)
    }
    if (this.nodes?.length) {
      this.length = this.nodes.length;
      // assinging all elements to the object
      for (let i = 0; i < this.nodes?.length; i++) {
        this[i] = this.nodes[i]
      }
    }
  }

  BabyQuery.fn = BabyQuery.prototype = {
    // ready funciton = wait until all document and scripts get loads
    ready: function (callback) {
      if (isFunction(callback)) {
        handleDOMReady(callback)
      }
    }
  }

  BabyQuery.extend = BabyQuery.fn.extend = myExtend

  BabyQuery.fn.extend(domManupulation)

  globalThis.BabyQuery = globalThis.$ = BabyQuery

  return BabyQuery
})('undefined' != typeof window ? window : global, undefined)
