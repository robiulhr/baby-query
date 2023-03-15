const checkers = {
  isValidElementSelector: function (input) {
    try {
      document.createDocumentFragment().querySelector(input)
    } catch {
      return false
    }
    return true
  },
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
  isFunction: function (obj) {
    return typeof obj === 'function' && typeof obj.nodeType !== 'number' && typeof obj.item !== 'function'
  },
  isWindow: function(obj) {
    return obj != null && obj === obj.window
  },
  toType: function (obj) {
    if (obj == null) {
      return obj + ''
    }
    return typeof obj === 'object' || typeof obj === 'function' ? Object[Object.prototype.toString.call(obj)] || 'object' : typeof obj
  },
  isArrayLike: function (obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = checkers.toType(obj)

    if (checkers.isFunction(obj) || checkers.isWindow(obj)) {
      return false
    }

    return type === 'array' || length === 0 || (typeof length === 'number' && length > 0 && length - 1 in obj)
  },

  isPlainObject: function (obj) {
    var proto, Ctor

    // Detect obvious negatives
    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
      return false
    }

    proto = Object.getPrototypeOf(obj)

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor
    return typeof Ctor === 'function' && Object.prototype.toString.call(Ctor) === Object.prototype.toString.call(Object)
  },

  isEmptyObject: function (obj) {
    var name
    for (name in obj) {
      return false
    }
    return true
  }
}

export default checkers