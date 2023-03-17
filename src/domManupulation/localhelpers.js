import checkers from '../checkers'
import helpers from '../helpers'
const { isBabyQueryObject, isArrayLike } = checkers
const { createHtmlElementDynamically } = helpers
const localhelpers = {
  afterandAppendmethodRecursive: function (elementArray, methodName) {
    for (let index = (methodName === "after" ? elementArray.length - 1: 0); (methodName === "after" ? index >= 0: index < elementArray.length); (methodName === "after" ? index--: index++)) {
      if (typeof elementArray[index] === 'string') {
        for (let ind = 0; ind < this.length; ind++) {
          switch (methodName) {
            case 'after':
              localhelpers.insertAfter(createHtmlElementDynamically(elementArray[index])[0], this[ind])
              break
            case 'append':
              localhelpers.appendChild(createHtmlElementDynamically(elementArray[index])[0], this[ind])
              break
          }
        }
      } else if (isBabyQueryObject(elementArray[index])) {
        console.log("element is babyquery object")
        for (let ind = 0; ind < this.length; ind++) {
          for (let i = 0; i < elementArray[index].length; i++) {
            switch (methodName) {
              case 'after':
                localhelpers.insertAfter(elementArray[index][i], this[ind])
                break
              case 'append':
                localhelpers.appendChild(elementArray[index][i], this[ind])
                break
            }
          }
        }
      } else if (isArrayLike(elementArray[index])) {
        // call the afterandAppendmethodRecursive function again (recursively)
        localhelpers.afterandAppendmethodRecursive.call(this, elementArray[index], methodName)
      } else if (elementArray[index] instanceof HTMLElement) {
        for (let ind = 0; ind < this.length; ind++) {
          switch (methodName) {
            case 'after':
              localhelpers.insertAfter(elementArray[index], this[ind])
              break
            case 'append':
              localhelpers.appendChild(elementArray[index], this[ind])
              break
          }
        }
      }
    }
  },
  insertAfter: function (newNode, existingNode) {
    // make a clone of the element
    let cloneNode = newNode.cloneNode(true)
    // remove the original element
    newNode.remove()
    // insert the cloned element
    existingNode.parentNode.insertBefore(cloneNode, existingNode.nextElementSibling)
  },
  appendChild (newNode, targetNode) {
    targetNode.appendChild(newNode)
  }
}

export default localhelpers
