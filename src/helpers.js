import checkers from './checkers'
const { isArrayLike, isEqualObject } = checkers

export default {
  /**
   * checks the document.readyState is completed ifso then call the funciton otherwise push it to domReadyQueue array to wait and once the DOMContentLoaded fire then call the funciton from the domReadyQueue array
   * @param {Function} callback
   *
   */
  handleDOMReady: function (callback) {
    var domReadyQueue = []
    document.readyState === 'complete' ? callback.call(document) : domReadyQueue.push(callback)
    // running domReadyQueue funcitons after the dom loads.
    document.addEventListener('DOMContentLoaded', function onDOMReady () {
      document.removeEventListener('DOMContentLoaded', onDOMReady)
      while (domReadyQueue.length) {
        domReadyQueue.shift().call(document)
      }
    })
  },
  /**
   * create html element from String
   * @param {String} html Exp: "\<div>hello world\</div>"
   * @returns {HTMLElement} returns the created html element from the String
   */
  createHtmlElementDynamically: function (html) {
    var template = document.createElement('template')
    template.innerHTML = html
    return template.content.childNodes
  },
  /**
   * Extends provided objects to the main object
   * @returns {Object} return the main object
   */
  myExtend: function () {
    for (let i = 0; i < arguments.length; i++) {
      if (!arguments[i] || typeof arguments[i] !== 'object') {
        continue
      }
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          var value = arguments[i][key]

          if (value !== undefined) {
            if (typeof value === 'object' && value !== null) {
              if (!this[key] || typeof this[key] !== 'object') {
                this[key] = {}
              }
              this[key].merge(value)
            } else {
              this[key] = value
            }
          }
        }
      }
    }

    return this
  },
  /**
   * separates value, unit and operator from the provided value
   * @param {String} valueStr Exp: "+=200px"
   * @returns {Object} Exp : { value: 200, unit:"px", operator:"+=" }
   */
  separateValueUnitOperators: function (valueStr) {
    let value = ''
    let unit = ''
    let operator = ''
    if (typeof valueStr !== 'string') return { value: valueStr, unit, operator }
    for (let i = 0; i < valueStr.length; i++) {
      if (!isNaN(valueStr[i])) {
        value += valueStr[i]
      } else if (valueStr[i] === '+' || valueStr[i] === '-' || valueStr[i] === '=') {
        operator += valueStr[i]
      } else {
        unit += valueStr[i]
      }
    }
    return { value: Number(value), unit, operator }
  },
  /**
   * fillters the buplicate value which is reapeted in a row
   * @param {Array} array Exp: [2,3,3,2,4,4,2,3,4]
   * @returns {Array} Exp: [2,3,2,4,2,3,4]
   *
   */
  fileterDuplicateInaRow: function (array) {
    if (!isArrayLike(array)) return
    let filteredArr = []
    let outerCount = 0
    while (outerCount < array.length) {
      let value = array[outerCount]
      let innerCount = outerCount + 1
      if (isEqualObject(value, array[innerCount])) {
        while (isEqualObject(value, array[innerCount])) {
          innerCount++
        }
      }
      filteredArr.push(value)
      outerCount = innerCount
    }
    return filteredArr
  },
  /**
   * filter all duplicate value in a array
   * @param {Array} array Exp: [1,3,5,3,3,5,2,1]
   * @returns {Array} return the filtered array Exp: [1, 3, 5, 2]
   */
  removeDuplicates: function (array) {
    const unique = []
    for (const item of array) {
      const isDuplicate = unique.find(obj =>  isEqualObject(obj, item))
      if (!isDuplicate) {
        unique.push(item)
      }
    }
    return unique;
  }
}
