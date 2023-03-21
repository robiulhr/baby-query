const localhelpers = {
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
