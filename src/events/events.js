import checkers from '../checkers'
import localhelpers from './localhelpers'
const { isPlainObject } = checkers
const { onSingleEventsMacker, onEventListener } = localhelpers
export default {
  /**
   * All Events Object
   */
  _allEventListeners: {},
  /**
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
      ;(callback = data), (data = selector), (selector = undefined)
    } else if (isPlainObject(selector)) {
      ;(data = selector), (selector = undefined)
    }
    // check eventType and callback are available
    if (!callback || !eventType) new Error('Must provide event type and event handler.')
    // loop over all this elements
    if (isPlainObject(eventType)) {
      for (let item in eventType) {
        const singleEvent = onSingleEventsMacker(item, selector, data, eventType[item])
        const { type: singleEventType, namespaces } = singleEvent
        for (let index = 0; index < this.length; index++) {
          ;(this._allEventListeners[this[index]] ??= {}) && (this._allEventListeners[this[index]][item] ??= [])
          this._allEventListeners[this[index]][item].push(singleEvent)
          this[index].addEventListener(namespaces.length > 0 ? [singleEventType, ...namespaces].join('.') : singleEventType, onEventListener.bind(this[index], selector, data, eventType[item]))
        }
      }
    } else if (typeof eventType == 'string') {
      const events = eventType.split(' ')
      for (let index = 0; index < events.length; index++) {
        const singleEvent = onSingleEventsMacker(events[index], selector, data, callback)
        const { type: singleEventType, namespaces } = singleEvent
        for (let ind = 0; ind < this.length; ind++) {
          ;(this._allEventListeners[this[ind]] ??= {}) && (this._allEventListeners[this[ind]][eventType] ??= [])
          this._allEventListeners[this[ind]][eventType].push(singleEvent)
          this[ind].addEventListener(namespaces.length > 0 ? [singleEventType, ...namespaces].join('.') : singleEventType, onEventListener.bind(this[ind], selector, data, callback))
        }
      }
    }
    return this
  },
  one: function () {},
  /**
   * Execute all handlers and behaviors attached to the matched elements for the given event type.
   * @param {Event|String} eventType A string containing a JavaScript event type, such as click or submit or A Event object.
   * @param {Array|Object} data Additional parameters to pass along to the event handler.
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
          if (item !== 'type') {
            event[item] = eventType[item]
          }
        }
        event.__triggered = true
        this[index].dispatchEvent(event)
      }
    } else if (eventType instanceof Event) {
      for (let index = 0; index < this.length; index++) {
        eventType.__triggered = true
        eventType.detail = data
        this[index].dispatchEvent(eventType)
      }
    }
    return this
  },
  /**
   *
   * @param {String,Object,Event} event
   * - One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".
   * - An object where the string keys represent one or more space-separated event types and optional namespaces, and the values represent handler functions previously attached for the event(s).
   * - A BabyQuery.Event object.
   * @param {String} selector A selector which should match the one originally passed to .on() when attaching event handlers.
   * @param {Function|Boolean} handler A handler function previously attached for the event(s), or the special value false.
   */
  off: function (event, selector, handler) {},
  click: function () {}
}
