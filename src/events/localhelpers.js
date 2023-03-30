import checkers from '../checkers'
const { isFunction, isArrayLike } = checkers
const localhelpers = {
  /**
   * @param {Object} event Event object 
   * @param {Function} callback function which was passed as argument of the on() method
   * @returns {any} returns the callback's returned value
   */
  onMethodCallbackHandler: function (event, callback) {
    // event has been dispatched using the .trigger() method
    if (event.__triggered && isFunction(callback) && event.detail) {
      return isArrayLike(event.detail) ? callback.call(this, event, ...event.detail) : callback.call(this, event, event.detail)
    } else if (isFunction(callback)) {
      return callback.call(this, event)
    }
  },
  /**
   * @param {String} event event type 
   * [ Note: it may contain more that one event type separated with space.]
   * @param {String} selector css selector that was passed as argument of on() method for delegation 
   * @param {Object} data object which was passed as a argument of on() method
   * @param {Function} callback function which was passed as argument of the on() method
   * @returns {Object}
   */
  onSingleEventsMacker: function (event, selector, data, callback) {
    const splitedEventType = event.split('.')
    const namespaces = [...splitedEventType].slice(1)
    const singleEventType = [...splitedEventType].shift()
    return {
      data,
      namespaces,
      handler: callback,
      selector,
      type: singleEventType
    }
  },
  /**
   * @param {String} selector css selector that was passed as argument of on() method for delegation 
   * @param {Object} data object which was passed as a argument of on() method
   * @param {Function} callback function which was passed as argument of the on() method
   * @param {String} event event type 
   * [ Note: it may contain more that one event type separated with space.]
   */
  onEventListener: function (selector, data, callback, event) {
    // customise the event object
    event.isDefaultPrevented = function () {
      return event.defaultPrevented
    }
    event.isPropagationStopped = function () {
      return event.cancelBubble
    }
    data && (event.data = data)
    // define callback return value checker
    let callbackReturnedValue = true
    // check if selector in available
    if (selector) {
      let clickedTargetEle = event.target
      while (clickedTargetEle) {
        if (clickedTargetEle.matches(selector)) {
          const selectorElm = clickedTargetEle.closest(selector)
          // call the callback
          callbackReturnedValue = localhelpers.onMethodCallbackHandler.call(selectorElm ? selectorElm : this, event, callback)
          break
        }
        clickedTargetEle = clickedTargetEle.parentElement
      }
    } else {
      // call the callback
      callbackReturnedValue = localhelpers.onMethodCallbackHandler.call(this, event, callback)
    }
    // check if the callback value is false or callback returns false
    if (callback === false || callbackReturnedValue === false) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}

export default localhelpers
