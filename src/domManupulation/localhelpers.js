import checkers from '../checkers'
import helpers from '../helpers'
const { isBabyQueryObject, isArrayLike } = checkers
const { createHtmlElementDynamically } = helpers
const localhelpers = {
  /**
   * function to run recursively in .after() and .append() method
   * @param {Array} argumentArray array of arguments which has been passed in .after() method  
   * @param {String} methodName after or append 
   */
  afterandAppendmethodRecursive: function (argumentArray, methodName) {
    // keep all cloned element listed
    let clonedNodeList = []
    for (let index = argumentArray.length - 1; index >= 0; index--) {
      if (typeof argumentArray[index] === 'string' || argumentArray[index] instanceof HTMLElement) {
        for (let ind = 0; ind < this.length; ind++) {
          const newElement = typeof argumentArray[index] === 'string' ? createHtmlElementDynamically(argumentArray[index])[0] : argumentArray[index]
          switch (methodName) {
            case 'after':
              localhelpers.insertAfterNormalElem(newElement, this[ind], ind)
              break
            case 'append':
              localhelpers.appendNormalChild(newElement, this[ind])
              break
          }
        }
      } else if (isBabyQueryObject(argumentArray[index])) {
        for (let ind = 0; ind < this.length; ind++) {
          for (let i = methodName === 'after' ? argumentArray[index].length - 1 : 0; methodName === 'after' ? i >= 0 : i < argumentArray[index].length; methodName === 'after' ? i-- : i++) {
            let clonedElement = argumentArray[index][i].cloneNode(true)
            switch (methodName) {
              case 'after':
                // check if the element is already in the clonedNodeList
                const alreadyClonedElement = clonedNodeList.find(ele => {
                  return ele == argumentArray[index][i]
                })
                if (alreadyClonedElement) {
                  // remove the element from the dom tree
                  alreadyClonedElement.remove()
                  // filter it from the clonedNodeList
                  clonedNodeList = clonedNodeList.filter(ele => {
                    return ele !== alreadyClonedElement
                  })
                }
                clonedNodeList.push(clonedElement)
                localhelpers.insertAfterBabyqueryObject(argumentArray[index][i], clonedElement, this[ind], ind, this.length)
                break
              case 'append':
                localhelpers.appendBabyQueryChild(argumentArray[index][i], clonedElement, this[ind], ind, this.length)
                break
            }
          }
        }
      } else if (isArrayLike(argumentArray[index]) && !argumentArray[index].nodes) {
        // call the afterandAppendmethodRecursive function again (recursively)
        localhelpers.afterandAppendmethodRecursive.call(this, argumentArray[index], methodName)
      }
    }
  },
  /**
   * inserts new node after the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   *
   */
  insertAfterNormalElem: function (newNode, existingNode) {
    // if its the last existing element
    existingNode.parentNode.insertBefore(newNode, existingNode.nextElementSibling)
  },
  /**
   * inserts new node after the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   * @param {Number} totalElement total count of context element (the existing elements) which after the new element will take place [more specifically this.length property]
   *
   */
  insertAfterBabyqueryObject: function (newNode, clonedNode, existingNode, elemIndex, totalElement) {
    // if its the last existing element
    if (elemIndex == totalElement - 1) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextElementSibling)
    } else {
      existingNode.parentNode.insertBefore(clonedNode, existingNode.nextElementSibling)
    }
  },
  /**
   * inserts new node inside the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} targetNode the existing element which after the new element will take place
   */
  appendNormalChild: function (newNode, targetNode) {
    targetNode.appendChild(newNode)
  },
  /**
   * inserts new node inside the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   *
   */
  appendBabyQueryChild: function (newNode, clonedNode, targetNode, elemIndex, totalElement) {
    // if its the last existing element
    if (elemIndex == totalElement - 1) {
      targetNode.appendChild(newNode)
    } else {
      targetNode.appendChild(clonedNode)
    }
  },
  /**
   * check the parentNode have any cloned node of the provided node
   * @param {HTMLElement} parentNode node to check inside
   * @param {HTMLElement} node node to check of
   */
  checkHaveAnyClonedNode: function (parentNode, node) {
    let ClonedElement = []
    parentNode.querySelectorAll('*').forEach(element => {
      if (element !== node && element.isEqualNode(node)) ClonedElement.push(element)
    })
    return ClonedElement || false
  }
}

export default localhelpers
