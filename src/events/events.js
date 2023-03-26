import checkers from '../checkers'
const { isArrayLike, isPlainObject } = checkers
export default {
  /**
   *
   * @param {String|Object} eventType
   * Type: String - One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
   * Type: PlainObject - An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
   * @param {String} selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
   * @param {any} data Data to be passed to the handler in event.data when an event occurs.
   * @param {Function} callback Function( Event eventObject [, Anything extraParameter ] [, ... ] ) A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
   *
   */
  on: function (eventType, selector, data, callback) {
    if (typeof selector === 'function') {
      ;(selector = undefined), (data = undefined), (callback = selector)
    } else if ((isPlainObject(selector) || isArrayLike(selector)) && typeof data === 'function') {
      ;(data = selector), (callback = data), (selector = undefined)
    } else if (typeof data === 'function') {
      ;(data = undefined), (callback = selector), (selector = undefined)
    }

    
  },
  gptOn: function (eventTypes, selector, data, callback, options) {},
  gptOne: function (eventTypes, selector, targetSelector, callback, options) {
    if (typeof targetSelector === 'function') {
      options = callback
      callback = targetSelector
      targetSelector = undefined
    }
    const namespaces = eventTypes.split('.')
    eventTypes = namespaces.shift()
    const events = eventTypes.split(' ')
    const elements = document.querySelectorAll(selector)
    const delegator = options && options.delegator ? document.querySelector(options.delegator) : document.querySelector('body')
    const eventListeners = []
    for (let i = 0; i < events.length; i++) {
      const eventType = events[i]
      for (let j = 0; j < elements.length; j++) {
        const element = elements[j]
        const eventListener = function (e) {
          if (targetSelector) {
            const possibleTargets = element.querySelectorAll(targetSelector)
            let target = e.target
            while (target && target !== this) {
              for (let i = 0; i < possibleTargets.length; i++) {
                if (possibleTargets[i] === target) {
                  callback.call(target, e)
                  break
                }
              }
              target = target.parentNode
            }
          } else {
            if (namespaces.length > 0) {
              const $this = this
              const $target = e.target
              let matched = false

              while ($target && $target !== $this) {
                for (let k = 0; k < namespaces.length; k++) {
                  if ($target.matches(`[data-namespace="${namespaces[k]}"]`)) {
                    matched = true
                    break
                  }
                }
                if (matched) {
                  break
                }
                $target = $target.parentNode
              }
              if (matched) {
                callback.call($target, e)
              }
            } else {
              callback.call(this, e)
            }
          }
        }
        if (options && options.once) {
          element.addEventListener(eventType, eventListener, { once: true })
        } else {
          delegator.addEventListener(eventType, eventListener)
        }
        eventListeners.push({ element, eventType, eventListener })
      }
    }
    return {
      off: function () {
        for (let i = 0; i < eventListeners.length; i++) {
          const { element, eventType, eventListener } = eventListeners[i]
          element.removeEventListener(eventType, eventListener)
        }
      }
    }
  },
  gptOff: function (eventTypes, selector, callback) {
    const namespaces = eventTypes.split('.')
    eventTypes = namespaces.shift()
    const events = eventTypes.split(' ')
    const elements = document.querySelectorAll(selector)

    for (let i = 0; i < events.length; i++) {
      const eventType = events[i]
      for (let j = 0; j < elements.length; j++) {
        const element = elements[j]
        const eventListeners = element.eventListeners || []
        const remainingListeners = []

        for (let k = 0; k < eventListeners.length; k++) {
          const { registeredEventType, registeredCallback } = eventListeners[k]
          if (registeredEventType === eventType && (!callback || registeredCallback === callback)) {
            element.removeEventListener(eventType, registeredCallback)
          } else {
            remainingListeners.push(eventListeners[k])
          }
        }

        element.eventListeners = remainingListeners
      }
    }

    // Remove the event listeners associated with the given selector and event types from the delegator element
    const delegator = document.querySelector('body')
    const selectorEventListeners = delegator.eventListeners || []
    const remainingSelectorListeners = []

    for (let i = 0; i < selectorEventListeners.length; i++) {
      const { registeredEventType, registeredSelector } = selectorEventListeners[i]
      if (registeredEventType === eventTypes && registeredSelector === selector) {
        delegator.removeEventListener(eventTypes, selectorEventListeners[i].eventListener)
      } else {
        remainingSelectorListeners.push(selectorEventListeners[i])
      }
    }

    delegator.eventListeners = remainingSelectorListeners
  },
  gptTrigger: function (selector, eventType, eventData, options) {
    const elements = document.querySelectorAll(selector)
    const defaultOptions = {
      bubbles: true,
      cancelable: true,
      detail: eventData
    }
    const mergedOptions = Object.assign({}, defaultOptions, options)

    for (let i = 0; i < elements.length; i++) {
      const event = new CustomEvent(eventType, mergedOptions)

      // Add properties to the event object
      for (const prop in eventData) {
        if (eventData.hasOwnProperty(prop)) {
          event[prop] = eventData[prop]
        }
      }

      // Allow triggering of native browser events
      if (eventType.indexOf('mouse') === 0 || eventType.indexOf('click') === 0 || eventType.indexOf('key') === 0) {
        elements[i][eventType]()
      } else {
        elements[i].dispatchEvent(event)
      }
    }
  }
}
