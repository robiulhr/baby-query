import checkers from '../checkers'
const { isFunction,isArrayLike } = checkers
export default {
  onMethodCallbackHandler: function (event, callback) {
    // event has been dispatched using the .trigger() method
    if (event.__triggered && isFunction(callback) && event.detail) {
      return isArrayLike(event.detail) ? callback.call(this, event, ...event.detail) : callback.call(this, event, event.detail)
    } else if (isFunction(callback)) {
      return callback.call(this, event)
    }
  }
}
