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
  myExtend: function (source) {
    if (!source || typeof source !== 'object') {
      return this
    }
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        var value = source[key]

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

    return this
  },
  separateValueUnit(valueStr){
    let value = ""
    let unit = ""
    if(typeof valueStr !== "string") return {value:valueStr,unit}
    for(let i = 0;i<valueStr.length;i++){
      isNaN(+valueStr[i]) ? unit+=valueStr[i] : value+=valueStr[i]
    }
    return {value:Number(value),unit}
  }
}
