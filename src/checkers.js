const checkers = {
  /**
   * checks the provided input is a value Css selector
   * @param {String} input Exp: "width"
   * @returns {Boolean} return true if the provided String(input) is valid CSS selector otherwise false
   *
   */
  isValidElementSelector: function (input) {
    try {
      document.createDocumentFragment().querySelector(input)
    } catch {
      return false
    }
    return true
  },
  /**
   * check the provided String is a valid html element
   * @param {String} html String to create a html element from it.
   * @returns {Boolean}  return true if the provided String(html) is valid html element otherwise false
   */
  isValidHtmlElement: html => {
    // Check for extra characters before the HTML code
    if (!/^\s*</.test(html)) {
      return false
    }
    // Check for extra characters after the HTML code
    if (!/\s*>$/.test(html)) {
      return false
    }
    const tagRegex = /<\/?\w+((\s+\w+(=(\"|\').*?(\"|\'))?)*)\s*\/?>/g
    const tagMatches = html.match(tagRegex)
    if (tagMatches === null) {
      return false
    }
    const tags = tagMatches.map(match => {
      const parts = match.trim().split(/[\s>]/)
      const lastPart = match.match(/\s*\/\s*>$/)?.[0]
      return (parts[0] + lastPart).replace(/[<>]/g, '')
    })
    const stack = []

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      if (tag.startsWith('/')) {
        if (stack.length === 0) {
          return false
        }
        const lastTag = stack.pop()
        if (lastTag !== tag.slice(1)) {
          return false
        }
      } else if (tag.endsWith('/')) {
        // Self-closing tag, do nothing
      } else {
        stack.push(tag)
      }
    }
    return stack.length === 0
  },
  /**
   * checks the provided input is a funciton or not
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is valid function otherwise false
   */
  isFunction: function (input) {
    return typeof input === 'function' && typeof input.nodeType !== 'number' && typeof input.item !== 'function'
  },
  /**
   * checks the provided input is a window object or not
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is window object otherwise false
   *
   */
  isWindow: function (input) {
    return input != null && input === input.window
  },
  /**
   * checks the type of the input value
   * @param {*} input
   * @returns {String} return the type of the value(input)
   */
  toType: function (input) {
    if (input == null) {
      return input + ''
    }
    return typeof input === 'object' || typeof input === 'function' ? Object[Object.prototype.toString.call(input)] || 'object' : typeof input
  },
  /**
   * checks the input value is a Array
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is Array otherwise false
   */
  isArrayLike: function (input) {
    var length = !!input && 'length' in input && input.length,
      type = checkers.toType(input)

    if (checkers.isFunction(input) || checkers.isWindow(input)) {
      return false
    }

    return type === 'array' || length === 0 || (typeof length === 'number' && length > 0 && length - 1 in input)
  },
  /**
   * checks the input value is a plainObject
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is plainObject otherwise false
   */
  isPlainObject: function (input) {
    var proto, Ctor

    // Detect obvious negatives
    if (!input || Object.prototype.toString.call(input) !== '[object Object]') {
      return false
    }

    proto = Object.getPrototypeOf(input)

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor
    return typeof Ctor === 'function' && Object.prototype.toString.call(Ctor) === Object.prototype.toString.call(Object)
  },
  /**
   * checks the input value is a emptyObject
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is emptyObject otherwise false
   */
  isEmptyObject: function (input) {
    var name
    for (name in input) {
      return false
    }
    return true
  },
  /**
   *
   * @returns {Boolean} return true if all the provided values are equal objects otherwise false
   *
   */
  isEqualObject () {
    let first = JSON.stringify(arguments[0])
    for (let i = 1; i < arguments.length; i++) {
      if (first !== JSON.stringify(arguments[i])) return false
    }
    return true
  },
  /**
   * checks the input value is a BabyQuery Object
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is BabyQuery Object otherwise false
   */
  isBabyQueryObject (input) {
    return typeof input === 'object' && !checkers.isPlainObject(input) && input.length && input.nodes
  }
}

export default checkers
