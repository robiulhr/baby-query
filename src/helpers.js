import checkers from './checkers'
const { isArrayLike, isEqualObject } = checkers

export default {
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
  createHtmlElementDynamically: function (html) {
    var template = document.createElement('template')
    template.innerHTML = html
    return template.content.childNodes
  },
  myExtend: function () {
    for(let i = 0;i<arguments.length;i++){
      if (!arguments[i] || typeof arguments[i] !== 'object') {
        continue;
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
  separateValueUnit: function (valueStr) {
    let value = ''
    let unit = ''
    if (typeof valueStr !== 'string') return { value: valueStr, unit }
    for (let i = 0; i < valueStr.length; i++) {
      isNaN(+valueStr[i]) ? (unit += valueStr[i]) : (value += valueStr[i])
    }
    return { value: Number(value), unit }
  },
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
  }
}
