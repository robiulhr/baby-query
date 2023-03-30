import checkers from '../checkers'
import helpers from '../helpers'
const { isArrayLike, isBabyQueryObject } = checkers
const { createHtmlElementDynamically } = helpers
const localhelpers = {
  /**
   * @param {HTMLElement} elem html element that need to be insert after the context element
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   * @param {Array} clonedNodeList array of all cloned node list 
   * @returns {Array} returns the clonedNodeList array
   */
  afterElemCloneHandler: function (elem, thisIndex, clonedNodeList) {
    // clone the element
    let newClonedElement = elem.cloneNode(true)
    // check if the element is already in the clonedNodeList
    const alreadyClonedElementInd = clonedNodeList.findIndex(ele => {
      return ele.originalElement === elem && ele.contextElementIndex === thisIndex
    })
    if (alreadyClonedElementInd !== -1) {
      // remove the element from the dom tree
      clonedNodeList[alreadyClonedElementInd].oldClonedElement.replaceWith(newClonedElement)
      clonedNodeList[alreadyClonedElementInd].originalElement.replaceWith(elem)
      // filter it from the clonedNodeList
      clonedNodeList = clonedNodeList.filter((ele, ind) => {
        return ind != alreadyClonedElementInd
      })
    } else {
      // remove the element from the dom tree
      elem.remove()
      localhelpers.insertAfterBabyqueryObject(elem, newClonedElement, this[thisIndex], thisIndex, this.length)
    }
    clonedNodeList.push({ contextElementIndex: thisIndex, oldClonedElement: newClonedElement, originalElement: elem })
    return clonedNodeList
  },
  /**
   * @param {String|HTMLElement|Object|Array} input value for the html element that need to be insert after the context element
   * @param {Array} clonedNodeList array of all cloned node list 
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   * @returns {Array} returns the clonedNodeList array
   */
  inputNotFunctionorArrayForAfter: function (input, clonedNodeList, thisIndex) {
    if (typeof input === 'string' || input instanceof HTMLElement) {
      // Loop over BabyQuery context object Example: BabyQuery {0: h2, 1: h2, nodes: NodeList(2), length: 2}
      const newElement = typeof input === 'string' ? createHtmlElementDynamically(input)[0] : input
      clonedNodeList = localhelpers.afterElemCloneHandler.call(this, newElement, thisIndex, clonedNodeList)
    } else if (isArrayLike(input) && !input.nodes) {
      input.reverse().forEach(ele => {
        clonedNodeList = localhelpers.inputNotFunctionorArrayForAfter.call(this, ele, clonedNodeList, thisIndex)
      })
    } else if (isBabyQueryObject(input)) {
      for (let i = input.length - 1; i >= 0; i--) {
        clonedNodeList = localhelpers.afterElemCloneHandler.call(this, input[i], thisIndex, clonedNodeList)
      }
    }
    return clonedNodeList
  },
  /**
   * @param {HTMLElement} elem html element that need to be insert after the context element
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   * @param {Array} clonedNodeList array of all cloned node list 
   * @returns {Array|HTMLElement} returns the clonedNodeList array or a html element [origianl or coppied element]
   */
  appendElemCloneHandler: function (elem, thisIndex, clonedNodeList) {
    // clone the element
    let newClonedElement = elem.cloneNode(true)
    // check if the element is already in the clonedNodeList
    const alreadyClonedElementInd = clonedNodeList.findIndex(ele => {
      return ele.originalElement === elem && ele.contextElementIndex === thisIndex
    })
    if (alreadyClonedElementInd !== -1) {
      // remove the element from the dom tree
      clonedNodeList[alreadyClonedElementInd].oldClonedElement.remove()
      clonedNodeList[alreadyClonedElementInd].originalElement.remove()
      // filter it from the clonedNodeList
      clonedNodeList = clonedNodeList.filter((elem, eleInd) => {
        return eleInd != alreadyClonedElementInd
      })
    }
    // remove the element from the dom tree
    elem.remove()
    localhelpers.appendBabyQueryChild(elem, newClonedElement, this[thisIndex], thisIndex, this.length)
    clonedNodeList.push({ contextElementIndex: thisIndex, oldClonedElement: newClonedElement, originalElement: elem })
    return clonedNodeList
  },
  /**
   * @param {String|HTMLElement|Object|Array} input value for the html element that need to be insert after the context element
   * @param {Array} clonedNodeList array of all cloned node list 
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   */
  inputNotFunctionorArrayForAppend: function (input, clonedNodeList, thisIndex) {
    if (typeof input === 'string' || input instanceof HTMLElement) {
      const newElement = typeof input === 'string' ? createHtmlElementDynamically(input)[0] : input
      clonedNodeList = localhelpers.appendElemCloneHandler.call(this, newElement, thisIndex, clonedNodeList)
    } else if (isArrayLike(input) && !input.nodes) {
      input.forEach(ele => {
        clonedNodeList = localhelpers.inputNotFunctionorArrayForAppend.call(this, ele, clonedNodeList, thisIndex)
      })
    } else if (isBabyQueryObject(input)) {
      for (let i = 0; i < input.length; i++) {
        clonedNodeList = localhelpers.appendElemCloneHandler.call(this, input[i], thisIndex, clonedNodeList)
      }
    }
    return clonedNodeList
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
   * @param {HTMLElement} newNode the new node which will be inserted if(elemIndex == totalElement - 1) returns true
   * @param {HTMLElement} clonedNode the clonedNode of the newNode which will be inserted if(elemIndex == totalElement - 1) returns false
   * @param {HTMLElement} targetNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   * @param {Number} totalElement total count of context element (the existing elements) which after the new element will take place [more specifically this.length property]
   *
   */
  insertAfterBabyqueryObject: function (newNode, clonedNode, targetNode, elemIndex, totalElement) {
    // if its the last existing element
    if (elemIndex == totalElement - 1) {
      targetNode.parentNode.insertBefore(newNode, targetNode.nextElementSibling)
    } else {
      targetNode.parentNode.insertBefore(clonedNode, targetNode.nextElementSibling)
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
   * @param {HTMLElement} newNode the new node which will be inserted if(elemIndex == totalElement - 1) returns true
   * @param {HTMLElement} clonedNode the clonedNode of the newNode which will be inserted if(elemIndex == totalElement - 1) returns false
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   * @param {Number} totalElement total count of context element (the existing elements) which after the new element will take place [more specifically this.length property]
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
