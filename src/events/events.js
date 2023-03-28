import checkers from '../checkers'
import localhelpers from './localhelpers'
const { isPlainObject } = checkers
const { onMethodCallbackHandler } = localhelpers
export default {
  _allEventListeners: {},
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
    // handle arguments
    if (typeof selector === 'function' || selector === false) {
      ;(callback = selector), (selector = undefined), (data = undefined)
    } else if ((typeof data === 'function' || data === false) && typeof selector === 'string') {
      ;(callback = data), (data = undefined)
    } else if ((typeof data === 'function' || data === false) && typeof selector !== 'string') {
      ;(callback = data), (data = selector),(selector = undefined)
    } 
    // console.log(eventType)
    // console.log(selector)
    // console.log(data)
    // console.log(callback)
    // check eventType and callback are available
    if (!callback || !eventType) new Error('Must provide event type and event handler.')
    // loop over all this elements
    if (isPlainObject(eventType)) {
      for (let index = 0; index < this.length; index++) {
        for (let items in eventType) {
          console.log(eventType[items])
        }
      }
    } else if (typeof eventType == 'string') {
      const events = eventType.split(' ')
      for (let index = 0; index < events.length; index++) {
        const splitedEventType = events[index].split('.')
        const namespaces = [...splitedEventType].slice(1)
        const singleEventType = [...splitedEventType].shift()
        const singleEvent = {
          data: data,
          namespace: namespaces,
          handler: callback,
          selector: selector,
          type: singleEventType
        }
        for (let ind = 0; ind < this.length; ind++) {
          ;(this._allEventListeners[this[ind]] ??= {}) && (this._allEventListeners[this[ind]][eventType] ??= [])
          this._allEventListeners[this[ind]][eventType].push(singleEvent)
          const eventListener = function (selector, data, callback, event) {
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
                  callbackReturnedValue = onMethodCallbackHandler.call(selectorElm ? selectorElm : this, event, callback)
                  break
                }
                clickedTargetEle = clickedTargetEle.parentElement
              }
            } else {
              // call the callback
              callbackReturnedValue = onMethodCallbackHandler.call(this, event, callback)
            }
            // check if the callback value is false or callback returns false
            if (callback === false || callbackReturnedValue === false) {
              event.preventDefault()
              event.stopPropagation()
            }
          }
          this[ind].addEventListener(namespaces.length > 0 ? [singleEventType, ...namespaces].join('.') : singleEventType, eventListener.bind(this[ind], selector, data, callback))
        }
      }
    }
    return this
  },
  /**
   *
   * @param {Object|String} eventType
   * @param {Array|Object} data
   */
  trigger: function (eventType, data) {
    if (typeof eventType === 'string') {
      for (let index = 0; index < this.length; index++) {
        const event = new CustomEvent(eventType, { bubbles: true, detail: data })
        event.__triggered = true
        this[index].dispatchEvent(event)
      }
    } else if (isPlainObject(eventType)) {
      for (let index = 0; index < this.length; index++) {
        const event = new CustomEvent(eventType.type, { bubbles: true, detail: data })
        for (let item in eventType) {
          // have to check if the item can be change or only have the getter
          if (item !== 'type') {
            event[item] = eventType[item]
          }
        }
        event.__triggered = true
        this[index].dispatchEvent(event)
      }
    } else if (eventType instanceof Event) {
    }
    return this
  },
  click: function () {},

  gptOne: function (eventTypes, selector, data, callback, options) {
    // Handle argument overloading
    if (typeof selector === 'function') {
      callback = selector
      selector = undefined
      data = undefined
    } else if (typeof data === 'function') {
      callback = data
      data = undefined
    }

    // Split eventTypes by namespaces
    const namespaces = eventTypes.split('.')
    eventTypes = namespaces.shift()

    // Split eventTypes by space to support multiple event types
    const events = eventTypes.split(' ')

    // Get the elements to attach the events to
    const elements = document.querySelectorAll(selector)

    // Set the delegator to options.delegator or default to body
    const delegator = options && options.delegator ? document.querySelector(options.delegator) : document.querySelector('body')

    // Create an array to store event listeners for later removal
    const eventListeners = []

    // Loop through each event type
    for (let i = 0; i < events.length; i++) {
      const eventType = events[i]

      // Loop through each element and attach event listener
      for (let j = 0; j < elements.length; j++) {
        const element = elements[j]

        const eventListener = function (e) {
          // Handle event delegation
          if (selector) {
            const possibleTargets = element.querySelectorAll(selector)
            let target = e.target
            while (target && target !== this) {
              for (let i = 0; i < possibleTargets.length; i++) {
                if (possibleTargets[i] === target) {
                  if (callback.call(target, e, data) === false) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                  break
                }
              }
              target = target.parentNode
            }
          } else {
            // Handle namespaces
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
                if (callback.call($target, e, data) === false) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }
            } else {
              if (callback.call(this, e, data) === false) {
                e.preventDefault()
                e.stopPropagation()
              }
            }
          }
        }

        // Check for 'once' option
        if (options && options.once) {
          element.addEventListener(eventType, eventListener, { once: true })
        } else {
          delegator.addEventListener(eventType, eventListener)
        }

        // Store the event listener for later removal
        eventListeners.push({ element, eventType, eventListener })
      }
    }

    // Return an object with an 'off' method to remove the event listeners
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
