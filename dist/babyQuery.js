var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "default", () => $047f9defc20f6cd7$export$2e2bcd8739ae039, (v) => $047f9defc20f6cd7$export$2e2bcd8739ae039 = v);
const $d4df80a29a2554d2$var$checkers = {
    /**
   * checks the provided input is a value Css selector
   * @param {String} input Exp: "width"
   * @returns {Boolean} return true if the provided String(input) is valid CSS selector otherwise false
   *
   */ isValidElementSelector: function(input) {
        try {
            document.createDocumentFragment().querySelector(input);
        } catch  {
            return false;
        }
        return true;
    },
    /**
   * check the provided String is a valid html element
   * @param {String} html String to create a html element from it.
   * @returns {Boolean}  return true if the provided String(html) is valid html element otherwise false
   */ isValidHtmlElement: (html)=>{
        // Check for extra characters before the HTML code
        if (!/^\s*</.test(html)) return false;
        // Check for extra characters after the HTML code
        if (!/\s*>$/.test(html)) return false;
        const tagRegex = /<\/?\w+((\s+\w+(=(\"|\').*?(\"|\'))?)*)\s*\/?>/g;
        const tagMatches = html.match(tagRegex);
        if (tagMatches === null) return false;
        const tags = tagMatches.map((match)=>{
            const parts = match.trim().split(/[\s>]/);
            const lastPart = match.match(/\s*\/\s*>$/)?.[0];
            return (parts[0] + lastPart).replace(/[<>]/g, "");
        });
        const stack = [];
        for(let i = 0; i < tags.length; i++){
            const tag = tags[i];
            if (tag.startsWith("/")) {
                if (stack.length === 0) return false;
                const lastTag = stack.pop();
                if (lastTag !== tag.slice(1)) return false;
            } else if (tag.endsWith("/")) ;
            else stack.push(tag);
        }
        return stack.length === 0;
    },
    /**
   * checks the provided input is a funciton or not
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is valid function otherwise false
   */ isFunction: function(input) {
        return typeof input === "function" && typeof input.nodeType !== "number" && typeof input.item !== "function";
    },
    /**
   * checks the provided input is a window object or not
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is window object otherwise false
   *
   */ isWindow: function(input) {
        return input != null && input === input.window;
    },
    /**
   * checks the type of the input value
   * @param {*} input
   * @returns {String} return the type of the value(input)
   */ toType: function(input) {
        if (input == null) return input + "";
        return typeof input === "object" || typeof input === "function" ? Object[Object.prototype.toString.call(input)] || "object" : typeof input;
    },
    /**
   * checks the input value is a Array
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is Array otherwise false
   */ isArrayLike: function(input) {
        if (typeof input === "string") return false;
        var length = !!input && "length" in input && input.length, type = $d4df80a29a2554d2$var$checkers.toType(input);
        if ($d4df80a29a2554d2$var$checkers.isFunction(input) || $d4df80a29a2554d2$var$checkers.isWindow(input)) return false;
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in input;
    },
    /**
   * checks the input value is a plainObject
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is plainObject otherwise false
   */ isPlainObject: function(input) {
        var proto, Ctor;
        // Detect obvious negatives
        if (!input || Object.prototype.toString.call(input) !== "[object Object]") return false;
        proto = Object.getPrototypeOf(input);
        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) return true;
        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && Object.prototype.toString.call(Ctor) === Object.prototype.toString.call(Object);
    },
    /**
   * checks the input value is a emptyObject
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is emptyObject otherwise false
   */ isEmptyObject: function(input) {
        var name;
        for(name in input)return false;
        return true;
    },
    /**
   *
   * @returns {Boolean} return true if all the provided values are equal objects otherwise false
   *
   */ isEqualObject () {
        let first = JSON.stringify(arguments[0]);
        for(let i = 1; i < arguments.length; i++){
            if (first !== JSON.stringify(arguments[i])) return false;
        }
        return true;
    },
    /**
   * checks the input value is a BabyQuery Object
   * @param {*} input
   * @returns {Boolean} return true if the provided value (input) is BabyQuery Object otherwise false
   */ isBabyQueryObject (input) {
        return input instanceof window.$ || input instanceof $parcel$global.$;
    }
};
var $d4df80a29a2554d2$export$2e2bcd8739ae039 = $d4df80a29a2554d2$var$checkers;


const { isArrayLike: $20b4a97a61b3fccb$var$isArrayLike , isEqualObject: $20b4a97a61b3fccb$var$isEqualObject , isPlainObject: $20b4a97a61b3fccb$var$isPlainObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
var $20b4a97a61b3fccb$export$2e2bcd8739ae039 = {
    /**
   * checks the document.readyState is completed ifso then call the funciton otherwise push it to domReadyQueue array to wait and once the DOMContentLoaded fire then call the funciton from the domReadyQueue array
   * @param {Function} callback
   *
   */ handleDOMReady: function(callback) {
        var domReadyQueue = [];
        document.readyState === "complete" ? callback.call(document) : domReadyQueue.push(callback);
        // running domReadyQueue funcitons after the dom loads.
        document.addEventListener("DOMContentLoaded", function onDOMReady() {
            document.removeEventListener("DOMContentLoaded", onDOMReady);
            while(domReadyQueue.length)domReadyQueue.shift().call(document);
        });
    },
    /**
   * create html element from String
   * @param {String} html Exp: "\<div>hello world\</div>"
   * @returns {HTMLElement} returns the created html element from the String
   */ createHtmlElementDynamically: function(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return template.content.childNodes;
    },
    /**
   * Extends provided objects to the main object
   * @returns {Object} return the main object
   * Note: if the property is not a function won't be Added
   */ myExtend: function() {
        for(let i = 0; i < arguments.length; i++){
            if (!arguments[i] || typeof arguments[i] !== "object") continue;
            for(let key in arguments[i])if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                let value = arguments[i][key];
                if (value !== undefined) {
                    if (typeof value === "object" && value !== null && !$20b4a97a61b3fccb$var$isPlainObject(value) && !$20b4a97a61b3fccb$var$isArrayLike(value)) {
                        if (!this[key] || typeof this[key] !== "object") this[key] = {};
                        this[key].merge(value);
                    } else this[key] = value;
                }
            }
        }
        return this;
    },
    /**
   * separates value, unit and operator from the provided value
   * @param {String} valueStr Exp: "+=200px"
   * @returns {Object} Exp : { value: 200, unit:"px", operator:"+=" }
   */ separateValueUnitOperators: function(valueStr) {
        let value = "";
        let unit = "";
        let operator = "";
        if (typeof valueStr !== "string") return {
            value: valueStr,
            unit: unit,
            operator: operator
        };
        for(let i = 0; i < valueStr.length; i++){
            if (!isNaN(valueStr[i])) value += valueStr[i];
            else if (valueStr[i] === "+" || valueStr[i] === "-" || valueStr[i] === "=") operator += valueStr[i];
            else unit += valueStr[i];
        }
        return {
            value: Number(value),
            unit: unit,
            operator: operator
        };
    },
    /**
   * fillters the buplicate value which is reapeted in a row
   * @param {Array} array Exp: [2,3,3,2,4,4,2,3,4]
   * @returns {Array} Exp: [2,3,2,4,2,3,4]
   *
   */ fileterDuplicateInaRow: function(array) {
        if (!$20b4a97a61b3fccb$var$isArrayLike(array)) return;
        let filteredArr = [];
        let outerCount = 0;
        while(outerCount < array.length){
            let value = array[outerCount];
            let innerCount = outerCount + 1;
            if ($20b4a97a61b3fccb$var$isEqualObject(value, array[innerCount])) while($20b4a97a61b3fccb$var$isEqualObject(value, array[innerCount]))innerCount++;
            filteredArr.push(value);
            outerCount = innerCount;
        }
        return filteredArr;
    },
    /**
   * filter all duplicate value in a array
   * @param {Array} array Exp: [1,3,5,3,3,5,2,1]
   * @returns {Array} return the filtered array Exp: [1, 3, 5, 2]
   */ removeDuplicates: function(array) {
        const unique = [];
        for (const item of array){
            const isDuplicate = unique.find((obj)=>$20b4a97a61b3fccb$var$isEqualObject(obj, item));
            if (!isDuplicate) unique.push(item);
        }
        return unique;
    }
};






const { isArrayLike: $8e7efde313f1b90f$var$isArrayLike , isBabyQueryObject: $8e7efde313f1b90f$var$isBabyQueryObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $8e7efde313f1b90f$var$createHtmlElementDynamically  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const $8e7efde313f1b90f$var$localhelpers = {
    /**
   * @param {HTMLElement} elem html element that need to be insert after the context element
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   * @param {Array} clonedNodeList array of all cloned node list 
   * @returns {Array} returns the clonedNodeList array
   */ afterElemCloneHandler: function(elem, thisIndex, clonedNodeList) {
        // clone the element
        let newClonedElement = elem.cloneNode(true);
        // check if the element is already in the clonedNodeList
        const alreadyClonedElementInd = clonedNodeList.findIndex((ele)=>{
            return ele.originalElement === elem && ele.contextElementIndex === thisIndex;
        });
        if (alreadyClonedElementInd !== -1) {
            // remove the element from the dom tree
            clonedNodeList[alreadyClonedElementInd].oldClonedElement.replaceWith(newClonedElement);
            clonedNodeList[alreadyClonedElementInd].originalElement.replaceWith(elem);
            // filter it from the clonedNodeList
            clonedNodeList = clonedNodeList.filter((ele, ind)=>{
                return ind != alreadyClonedElementInd;
            });
        } else {
            // remove the element from the dom tree
            elem.remove();
            $8e7efde313f1b90f$var$localhelpers.insertAfterBabyqueryObject(elem, newClonedElement, this[thisIndex], thisIndex, this.length);
        }
        clonedNodeList.push({
            contextElementIndex: thisIndex,
            oldClonedElement: newClonedElement,
            originalElement: elem
        });
        return clonedNodeList;
    },
    /**
   * @param {String|HTMLElement|Object|Array} input value for the html element that need to be insert after the context element
   * @param {Array} clonedNodeList array of all cloned node list 
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   * @returns {Array} returns the clonedNodeList array
   */ inputNotFunctionorArrayForAfter: function(input, clonedNodeList, thisIndex) {
        if (typeof input === "string" || input instanceof HTMLElement) {
            // Loop over BabyQuery context object Example: BabyQuery {0: h2, 1: h2, nodes: NodeList(2), length: 2}
            const newElement = typeof input === "string" ? $8e7efde313f1b90f$var$createHtmlElementDynamically(input)[0] : input;
            clonedNodeList = $8e7efde313f1b90f$var$localhelpers.afterElemCloneHandler.call(this, newElement, thisIndex, clonedNodeList);
        } else if ($8e7efde313f1b90f$var$isArrayLike(input) && !input.nodes) input.reverse().forEach((ele)=>{
            clonedNodeList = $8e7efde313f1b90f$var$localhelpers.inputNotFunctionorArrayForAfter.call(this, ele, clonedNodeList, thisIndex);
        });
        else if ($8e7efde313f1b90f$var$isBabyQueryObject(input)) for(let i = input.length - 1; i >= 0; i--)clonedNodeList = $8e7efde313f1b90f$var$localhelpers.afterElemCloneHandler.call(this, input[i], thisIndex, clonedNodeList);
        return clonedNodeList;
    },
    /**
   * @param {HTMLElement} elem html element that need to be insert after the context element
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   * @param {Array} clonedNodeList array of all cloned node list 
   * @returns {Array|HTMLElement} returns the clonedNodeList array or a html element [origianl or coppied element]
   */ appendElemCloneHandler: function(elem, thisIndex, clonedNodeList) {
        // clone the element
        let newClonedElement = elem.cloneNode(true);
        // check if the element is already in the clonedNodeList
        const alreadyClonedElementInd = clonedNodeList.findIndex((ele)=>{
            return ele.originalElement === elem && ele.contextElementIndex === thisIndex;
        });
        if (alreadyClonedElementInd !== -1) {
            // remove the element from the dom tree
            clonedNodeList[alreadyClonedElementInd].oldClonedElement.remove();
            clonedNodeList[alreadyClonedElementInd].originalElement.remove();
            // filter it from the clonedNodeList
            clonedNodeList = clonedNodeList.filter((elem, eleInd)=>{
                return eleInd != alreadyClonedElementInd;
            });
        }
        // remove the element from the dom tree
        elem.remove();
        $8e7efde313f1b90f$var$localhelpers.appendBabyQueryChild(elem, newClonedElement, this[thisIndex], thisIndex, this.length);
        clonedNodeList.push({
            contextElementIndex: thisIndex,
            oldClonedElement: newClonedElement,
            originalElement: elem
        });
        return clonedNodeList;
    },
    /**
   * @param {String|HTMLElement|Object|Array} input value for the html element that need to be insert after the context element
   * @param {Array} clonedNodeList array of all cloned node list 
   * @param {Number} thisIndex index of the context element [index of this value like: this[0]]
   */ inputNotFunctionorArrayForAppend: function(input, clonedNodeList, thisIndex) {
        if (typeof input === "string" || input instanceof HTMLElement) {
            const newElement = typeof input === "string" ? $8e7efde313f1b90f$var$createHtmlElementDynamically(input)[0] : input;
            clonedNodeList = $8e7efde313f1b90f$var$localhelpers.appendElemCloneHandler.call(this, newElement, thisIndex, clonedNodeList);
        } else if ($8e7efde313f1b90f$var$isArrayLike(input) && !input.nodes) input.forEach((ele)=>{
            clonedNodeList = $8e7efde313f1b90f$var$localhelpers.inputNotFunctionorArrayForAppend.call(this, ele, clonedNodeList, thisIndex);
        });
        else if ($8e7efde313f1b90f$var$isBabyQueryObject(input)) for(let i = 0; i < input.length; i++)clonedNodeList = $8e7efde313f1b90f$var$localhelpers.appendElemCloneHandler.call(this, input[i], thisIndex, clonedNodeList);
        return clonedNodeList;
    },
    /**
   * inserts new node after the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   *
   */ insertAfterNormalElem: function(newNode, existingNode) {
        // if its the last existing element
        existingNode.parentNode.insertBefore(newNode, existingNode.nextElementSibling);
    },
    /**
   * inserts new node after the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted if(elemIndex == totalElement - 1) returns true
   * @param {HTMLElement} clonedNode the clonedNode of the newNode which will be inserted if(elemIndex == totalElement - 1) returns false
   * @param {HTMLElement} targetNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   * @param {Number} totalElement total count of context element (the existing elements) which after the new element will take place [more specifically this.length property]
   *
   */ insertAfterBabyqueryObject: function(newNode, clonedNode, targetNode, elemIndex, totalElement) {
        // if its the last existing element
        if (elemIndex == totalElement - 1) targetNode.parentNode.insertBefore(newNode, targetNode.nextElementSibling);
        else targetNode.parentNode.insertBefore(clonedNode, targetNode.nextElementSibling);
    },
    /**
   * inserts new node inside the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} targetNode the existing element which after the new element will take place
   */ appendNormalChild: function(newNode, targetNode) {
        targetNode.appendChild(newNode);
    },
    /**
   * inserts new node inside the context element (the existing element)
   * @param {HTMLElement} newNode the new node which will be inserted if(elemIndex == totalElement - 1) returns true
   * @param {HTMLElement} clonedNode the clonedNode of the newNode which will be inserted if(elemIndex == totalElement - 1) returns false
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   * @param {Number} totalElement total count of context element (the existing elements) which after the new element will take place [more specifically this.length property]
   *
   */ appendBabyQueryChild: function(newNode, clonedNode, targetNode, elemIndex, totalElement) {
        // if its the last existing element
        if (elemIndex == totalElement - 1) targetNode.appendChild(newNode);
        else targetNode.appendChild(clonedNode);
    },
    /**
   * check the parentNode have any cloned node of the provided node
   * @param {HTMLElement} parentNode node to check inside
   * @param {HTMLElement} node node to check of
   */ checkHaveAnyClonedNode: function(parentNode, node) {
        let ClonedElement = [];
        parentNode.querySelectorAll("*").forEach((element)=>{
            if (element !== node && element.isEqualNode(node)) ClonedElement.push(element);
        });
        return ClonedElement || false;
    }
};
var $8e7efde313f1b90f$export$2e2bcd8739ae039 = $8e7efde313f1b90f$var$localhelpers;


const { inputNotFunctionorArrayForAppend: $d8203bae9db46050$var$inputNotFunctionorArrayForAppend , inputNotFunctionorArrayForAfter: $d8203bae9db46050$var$inputNotFunctionorArrayForAfter  } = (0, $8e7efde313f1b90f$export$2e2bcd8739ae039);
const { isFunction: $d8203bae9db46050$var$isFunction , isPlainObject: $d8203bae9db46050$var$isPlainObject , isValidHtmlElement: $d8203bae9db46050$var$isValidHtmlElement , isBabyQueryObject: $d8203bae9db46050$var$isBabyQueryObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
var $d8203bae9db46050$export$2e2bcd8739ae039 = {
    /**
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   * @param {HTMLElement|String|Function} element Exp:
   * @returns {Object} return the BabyQuery object
   */ after: function() {
        // keep all cloned element listed
        let clonedNodeList = [];
        for(let index = arguments.length - 1; index >= 0; index--){
            for(let ind = 0; ind < this.length; ind++)if ($d8203bae9db46050$var$isFunction(arguments[index])) {
                const callBackReturnedValue = arguments[index].call(this[ind]);
                /**
           * checks return value and handles it
           * string
           * BabyQuery Object
           * array element
           * Html element
           */ clonedNodeList = $d8203bae9db46050$var$inputNotFunctionorArrayForAfter.call(this, callBackReturnedValue, clonedNodeList, ind);
            } else clonedNodeList = $d8203bae9db46050$var$inputNotFunctionorArrayForAfter.call(this, arguments[index], clonedNodeList, ind);
        }
        return this;
    },
    /**
   * insert content, specified by the parameter, inside each element in the set of matched elements.
   * @param {HTMLElement|String|Function} element Exp:
   * @returns {Object} return the BabyQuery object
   */ append: function() {
        // keep all cloned element listed
        let clonedNodeList = [];
        for(let index = 0; index < arguments.length; index++){
            for(let ind = 0; ind < this.length; ind++)if ($d8203bae9db46050$var$isFunction(arguments[index])) {
                const callBackReturnedValue = arguments[index].call(this[ind]);
                /**
           * checks return value and handles it
           * string
           * BabyQuery Object
           * array element
           * Html element
           */ clonedNodeList = $d8203bae9db46050$var$inputNotFunctionorArrayForAppend.call(this, callBackReturnedValue, clonedNodeList, ind);
            } else clonedNodeList = $d8203bae9db46050$var$inputNotFunctionorArrayForAppend.call(this, arguments[index], clonedNodeList, ind);
        }
        return this;
    },
    /**
   * @param {String|Object} name 
   * - The name of the attribute to get. 
   * - An object of attribute-value pairs to set.
   * @param {String|Number|Boolean|Function} value 
   * - A value to set for the attribute. If null, the specified attribute will be removed.
   * - A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old attribute value as arguments.
   * @returns {Object} return the BabyQuery object
   */ attr: function(name, value) {
        if (typeof name === "string") {
            if (!value) return this["0"]?.getAttribute(name) || undefined;
            else if (typeof value === "string") this["0"]?.setAttribute(name, value);
            else if ($d8203bae9db46050$var$isFunction(value)) for(let i = 0; i < this.length; i++){
                const currVal = this[i]?.getAttribute(name);
                const newVal = value.call(this[i], i, currVal);
                newVal && this[i]?.setAttribute(name, newVal);
            }
        } else if ($d8203bae9db46050$var$isPlainObject(value)) for(let prop in value)this["0"].setAttribute(prop, value[prop]);
        return this;
    },
    before: function() {},
    empty: function() {},
    get: function() {},
    has: function() {},
    /**
   * @param {String|Function|Object} input 
   * - A string of HTML to set as the content of each matched element.
   * - A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.
   * @returns {Object} return the BabyQuery object
   */ html: function(input) {
        if (!input) return this["0"].innerHTML;
        for(let i = 0; i < this.length; i++){
            if (typeof input === "string" && $d8203bae9db46050$var$isValidHtmlElement(input)) this[i].innerHTML = input;
            else if ($d8203bae9db46050$var$isFunction(input)) this[i].innerHTML = input(i, this[i].innerHTML);
            else if ($d8203bae9db46050$var$isBabyQueryObject(input)) {
                let tamplateElement = document.createElement("div");
                for(let ind = 0; ind < input.length; ind++)tamplateElement.appendChild(input[ind]);
                this[i].innerHTML = tamplateElement.innerHTML;
            }
        }
        return this;
    },
    prepend: function() {},
    remove: function() {},
    removeAttr: function() {},
    /**
   * @param {String|HTMLElement|Boolean} text 
   * - The text to set as the content of each matched element. When Number or Boolean is supplied, it will be converted to a String representation.
   * - A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments.
   * @returns {Object} return the BabyQuery object
   */ text: function(text) {
        console.log(this[0]);
        if (!text) return this[0].textContent;
        else if (typeof text === "string" || typeof text === "number") for(let i = 0; i < this.length; i++)this[i].textContent = text;
        else if ($d8203bae9db46050$var$isFunction(text)) for(let i = 0; i < this.length; i++)this[i].textContent = text.call(this[i], i, this[i].textContent);
        return this;
    },
    toggle: function() {}
};




const { separateValueUnitOperators: $a21d1168b2ad536e$var$separateValueUnitOperators  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const $a21d1168b2ad536e$var$localhelpers = {
    /**
   * convert length value px to rem and rem to px
   * @param {Number} value value wanna convert
   * @param {String} fromUnit unit wanna convert from 
   * @param {String} toUnit unit wanna convert to 
   * @param {Number}[fonSize = parseFloat(getComputedStyle(document.documentElement).fontSize)] fontSize fonSize of the element 
   * @returns {Number} round the result to 3 decimal places 
   */ convertUnitsPxRem: function(value, fromUnit, toUnit, fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)) {
        // check if the input value is a string and contains a unit
        const match = value.toString().match(/^([\d\.]+)(\w*)$/);
        if (!match) throw new Error(`Invalid value: ${value}`);
        const numericValue = parseFloat(match[1]);
        const unit = match[2] || fromUnit;
        // convert the input value to pixels if necessary
        let pixels;
        if (unit === "px") pixels = numericValue;
        else if (unit === "rem") pixels = numericValue * fontSize;
        else throw new Error(`Invalid unit: ${unit}`);
        // convert the pixels to the target unit
        let result;
        if (toUnit === "px") result = pixels;
        else if (toUnit === "rem") result = pixels / fontSize;
        else throw new Error(`Invalid target unit: ${toUnit}`);
        // round the result to 3 decimal places
        return parseFloat(result.toFixed(3));
    },
    /**
   * when .css(name,value) value is a funciton 
   * @param {String} cssProp name passed in .css() method as property Exp: "width","backgroundColor"
   * @param {Function} callback function passed in .css() method as value
   * @param {Array} elementArr array of element in Babyquery object
   * 
   */ cssValueIsFunction: function(cssProp, callback, elementArr) {
        for(let i = 0; i < elementArr.length; i++){
            const propValue = window.getComputedStyle(elementArr[i])[cssProp];
            const givenValue = callback.call(elementArr[i], i, propValue);
            $a21d1168b2ad536e$var$localhelpers.setIncreaseDecreaseLength(cssProp, givenValue, elementArr[i]);
        }
    },
    /**
   * count increamented or decremented value for a element's css property
   * @param {Number} currValue value which is now of a dom element
   * @param {Number} givenValue value which is given to increase or decrease from the current value
   * @param {String} operator "+=" (have to increase the value) or "-=" (have to decrease the value) 
   * @returns {Number} calculated value after increasing or decreasing
   * 
   */ increDecreLength: function(currValue, givenValue, operator) {
        return operator.slice(0, 1) === "+" ? currValue + givenValue : currValue - givenValue;
    },
    /**
   * set or increment or decrement element's css property 
   * @param {String} propName name passed in .css() method as property Exp: "width","backgroundColor"
   * @param {String} givenValue the value has been given in as .css() value Exp: "+=200px" or "200px" or "200" 
   * @param {HTMLElement} currElement html element which is now reffering.
   * 
   */ setIncreaseDecreaseLength: function(propName, givenValue, currElement) {
        let toIncreaseDecrease = false;
        const { value: givenValueParsed , unit: givenUnitParsed , operator: givenOparatorParsed  } = $a21d1168b2ad536e$var$separateValueUnitOperators(givenValue);
        givenOparatorParsed && (toIncreaseDecrease = true);
        const { value: currValue , unit: currentUnit  } = $a21d1168b2ad536e$var$separateValueUnitOperators(window.getComputedStyle(currElement)[propName]);
        if (toIncreaseDecrease) {
            let newValue;
            let currValueConverted;
            let newUnit;
            if (currentUnit === givenUnitParsed) {
                currValueConverted = currValue;
                newUnit = currentUnit || "px";
            } else if (givenUnitParsed === "px" && currentUnit === "rem" || givenUnitParsed === "rem" && currentUnit === "px") {
                const fontSize = parseFloat(getComputedStyle(currElement).fontSize);
                currValueConverted = $a21d1168b2ad536e$var$localhelpers.convertUnitsPxRem(currValue, currentUnit, givenUnitParsed, fontSize);
                newUnit = givenUnitParsed;
            } else if (!givenUnitParsed) {
                currValueConverted = currValue;
                newUnit = currentUnit || "px";
            } else {
                currValueConverted = currValue;
                newUnit = "px";
            }
            newValue = $a21d1168b2ad536e$var$localhelpers.increDecreLength(currValueConverted, givenValueParsed, givenOparatorParsed) + newUnit;
            currElement.style[propName] = newValue;
        } else currElement.style[propName] = givenValueParsed + (givenUnitParsed || currentUnit);
    }
};
var $a21d1168b2ad536e$export$2e2bcd8739ae039 = $a21d1168b2ad536e$var$localhelpers;


const { isFunction: $a9a61dad2c314c2e$var$isFunction , isPlainObject: $a9a61dad2c314c2e$var$isPlainObject , isArrayLike: $a9a61dad2c314c2e$var$isArrayLike  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { cssValueIsFunction: $a9a61dad2c314c2e$var$cssValueIsFunction , setIncreaseDecreaseLength: $a9a61dad2c314c2e$var$setIncreaseDecreaseLength  } = (0, $a21d1168b2ad536e$export$2e2bcd8739ae039);
var $a9a61dad2c314c2e$export$2e2bcd8739ae039 = {
    /**
   * Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
   * @param {String | Object | Array} name Exp: "width" or {width:"200px",background:function(ele){return "200px"}} or ["width","background"]
   * @param {String | function} value Exp: "200px" or "red" or function(ind,ele){return "+=200px"}
   * @returns {String|Object} if the second parameter is absent then it will return String otherwise will return the BabyQuery object
   */ css: function(name, value) {
        if (typeof name === "string") {
            // handle .css("width","20px") or .css("width","+=20px") or .css("width","-=20px")
            if (typeof value === "string") {
                const isValueHaveNumber = (value.match(/[\d\.]+/) || [])[0];
                if (isValueHaveNumber) for(let i = 0; i < this.length; i++)$a9a61dad2c314c2e$var$setIncreaseDecreaseLength(name, value, this[i]);
                else if (!isValueHaveNumber) for(let i = 0; i < this.length; i++)this[i].style[name] = value;
            } else if ($a9a61dad2c314c2e$var$isFunction(value)) $a9a61dad2c314c2e$var$cssValueIsFunction(name, value, this);
            else if (!value) return window.getComputedStyle(this["0"])[name];
        } else if ($a9a61dad2c314c2e$var$isArrayLike(name)) {
            let attrs = {};
            for(let i = 0; i < name.length; i++)attrs[name[i]] = window.getComputedStyle(this["0"])[name[i]];
            return attrs;
        } else if ($a9a61dad2c314c2e$var$isPlainObject(name)) for(let props in name){
            // .css({"background":function,"width":function})
            if ($a9a61dad2c314c2e$var$isFunction(name[props])) $a9a61dad2c314c2e$var$cssValueIsFunction(props, name[props], this);
            else for(let i = 0; i < this.length; i++)this[i].style[props] = name[props];
        }
        return this;
    },
    addClass: function() {},
    removeClass: function() {},
    hasClass: function() {},
    toggleClass: function() {}
};




const { isFunction: $5d3be07a2d287b78$var$isFunction , isArrayLike: $5d3be07a2d287b78$var$isArrayLike  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const $5d3be07a2d287b78$var$localhelpers = {
    /**
   * @param {Object} event Event object 
   * @param {Function} callback function which was passed as argument of the on() method
   * @returns {any} returns the callback's returned value
   */ onMethodCallbackHandler: function(event, callback) {
        // event has been dispatched using the .trigger() method
        if (event.__triggered && $5d3be07a2d287b78$var$isFunction(callback) && event.detail) return $5d3be07a2d287b78$var$isArrayLike(event.detail) ? callback.call(this, event, ...event.detail) : callback.call(this, event, event.detail);
        else if ($5d3be07a2d287b78$var$isFunction(callback)) return callback.call(this, event);
    },
    /**
   * @param {String} event event type 
   * [ Note: it may contain more that one event type separated with space.]
   * @param {String} selector css selector that was passed as argument of on() method for delegation 
   * @param {Object} data object which was passed as a argument of on() method
   * @param {Function} callback function which was passed as argument of the on() method
   * @returns {Object}
   */ onSingleEventsMacker: function(event, selector, data, callback) {
        const splitedEventType = event.split(".");
        const namespaces = [
            ...splitedEventType
        ].slice(1);
        const singleEventType = [
            ...splitedEventType
        ].shift();
        return {
            data: data,
            namespaces: namespaces,
            handler: callback,
            selector: selector,
            type: singleEventType
        };
    },
    /**
   * @param {String} selector css selector that was passed as argument of on() method for delegation 
   * @param {Object} data object which was passed as a argument of on() method
   * @param {Function} callback function which was passed as argument of the on() method
   * @param {String} event event type 
   * [ Note: it may contain more that one event type separated with space.]
   */ onEventListener: function(selector, data, callback, event) {
        // customise the event object
        event.isDefaultPrevented = function() {
            return event.defaultPrevented;
        };
        event.isPropagationStopped = function() {
            return event.cancelBubble;
        };
        data && (event.data = data);
        // define callback return value checker
        let callbackReturnedValue = true;
        // check if selector in available
        if (selector) {
            let clickedTargetEle = event.target;
            while(clickedTargetEle){
                if (clickedTargetEle.matches(selector)) {
                    const selectorElm = clickedTargetEle.closest(selector);
                    // call the callback
                    callbackReturnedValue = $5d3be07a2d287b78$var$localhelpers.onMethodCallbackHandler.call(selectorElm ? selectorElm : this, event, callback);
                    break;
                }
                clickedTargetEle = clickedTargetEle.parentElement;
            }
        } else // call the callback
        callbackReturnedValue = $5d3be07a2d287b78$var$localhelpers.onMethodCallbackHandler.call(this, event, callback);
        // check if the callback value is false or callback returns false
        if (callback === false || callbackReturnedValue === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
};
var $5d3be07a2d287b78$export$2e2bcd8739ae039 = $5d3be07a2d287b78$var$localhelpers;


const { isPlainObject: $6003777f4412a1bb$var$isPlainObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { onSingleEventsMacker: $6003777f4412a1bb$var$onSingleEventsMacker , onEventListener: $6003777f4412a1bb$var$onEventListener  } = (0, $5d3be07a2d287b78$export$2e2bcd8739ae039);
var $6003777f4412a1bb$export$2e2bcd8739ae039 = {
    /**
   * All Events Object
   */ _allEventListeners: {},
    /**
   * @param {String|Object} eventType
   * Type: String - One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
   * Type: PlainObject - An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
   * @param {String} selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
   * @param {any} data Data to be passed to the handler in event.data when an event occurs.
   * @param {Function} callback Function( Event eventObject [, Anything extraParameter ] [, ... ] ) A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.
   *
   */ on: function(eventType, selector, data, callback) {
        // handle arguments
        if (typeof selector === "function" || selector === false) callback = selector, selector = undefined, data = undefined;
        else if ((typeof data === "function" || data === false) && typeof selector === "string") callback = data, data = undefined;
        else if ((typeof data === "function" || data === false) && typeof selector !== "string") callback = data, data = selector, selector = undefined;
        else if ($6003777f4412a1bb$var$isPlainObject(selector)) data = selector, selector = undefined;
        // check eventType and callback are available
        if (!callback || !eventType) new Error("Must provide event type and event handler.");
        // loop over all this elements
        if ($6003777f4412a1bb$var$isPlainObject(eventType)) for(let item in eventType){
            const singleEvent = $6003777f4412a1bb$var$onSingleEventsMacker(item, selector, data, eventType[item]);
            const { type: singleEventType , namespaces: namespaces  } = singleEvent;
            for(let index = 0; index < this.length; index++){
                (this._allEventListeners[this[index]] ??= {}) && (this._allEventListeners[this[index]][item] ??= []);
                this._allEventListeners[this[index]][item].push(singleEvent);
                this[index].addEventListener(namespaces.length > 0 ? [
                    singleEventType,
                    ...namespaces
                ].join(".") : singleEventType, $6003777f4412a1bb$var$onEventListener.bind(this[index], selector, data, eventType[item]));
            }
        }
        else if (typeof eventType == "string") {
            const events = eventType.split(" ");
            for(let index = 0; index < events.length; index++){
                const singleEvent = $6003777f4412a1bb$var$onSingleEventsMacker(events[index], selector, data, callback);
                const { type: singleEventType , namespaces: namespaces  } = singleEvent;
                for(let ind = 0; ind < this.length; ind++){
                    (this._allEventListeners[this[ind]] ??= {}) && (this._allEventListeners[this[ind]][eventType] ??= []);
                    this._allEventListeners[this[ind]][eventType].push(singleEvent);
                    this[ind].addEventListener(namespaces.length > 0 ? [
                        singleEventType,
                        ...namespaces
                    ].join(".") : singleEventType, $6003777f4412a1bb$var$onEventListener.bind(this[ind], selector, data, callback));
                }
            }
        }
        return this;
    },
    one: function() {},
    /**
   * Execute all handlers and behaviors attached to the matched elements for the given event type.
   * @param {Event|String} eventType A string containing a JavaScript event type, such as click or submit or A Event object.
   * @param {Array|Object} data Additional parameters to pass along to the event handler.
   */ trigger: function(eventType, data) {
        if (typeof eventType === "string") for(let index = 0; index < this.length; index++){
            const event = new CustomEvent(eventType, {
                bubbles: true,
                detail: data
            });
            event.__triggered = true;
            this[index].dispatchEvent(event);
        }
        else if ($6003777f4412a1bb$var$isPlainObject(eventType)) for(let index = 0; index < this.length; index++){
            const event = new CustomEvent(eventType.type, {
                bubbles: true,
                detail: data
            });
            for(let item in eventType)if (item !== "type") event[item] = eventType[item];
            event.__triggered = true;
            this[index].dispatchEvent(event);
        }
        else if (eventType instanceof Event) for(let index = 0; index < this.length; index++){
            eventType.__triggered = true;
            eventType.detail = data;
            this[index].dispatchEvent(eventType);
        }
        return this;
    },
    /**
   *
   * @param {String,Object,Event} event
   * - One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".
   * - An object where the string keys represent one or more space-separated event types and optional namespaces, and the values represent handler functions previously attached for the event(s).
   * - A BabyQuery.Event object.
   * @param {String} selector A selector which should match the one originally passed to .on() when attaching event handlers.
   * @param {Function|Boolean} handler A handler function previously attached for the event(s), or the special value false.
   */ off: function(event, selector, handler) {},
    click: function() {}
};


const { isValidElementSelector: $047f9defc20f6cd7$var$isValidElementSelector , isValidHtmlElement: $047f9defc20f6cd7$var$isValidHtmlElement , isPlainObject: $047f9defc20f6cd7$var$isPlainObject , isFunction: $047f9defc20f6cd7$var$isFunction  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $047f9defc20f6cd7$var$createHtmlElementDynamically , handleDOMReady: $047f9defc20f6cd7$var$handleDOMReady , myExtend: $047f9defc20f6cd7$var$myExtend  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const $047f9defc20f6cd7$var$$ = function(globalThis) {
    /**
   * BabyQuery Constructor function
   * @param {String|HTMLElement|Function|null|undefined} selector to create or select elements on which all changes should apply
   * @param {HTMLElement} context inside which the element should be created
   * @returns {Object} contains all element selected or created uning the provided selector
   */ function BabyQuery(selector, context) {
        // if Developer doesn't use the new keyword
        if (!(this instanceof BabyQuery)) return new BabyQuery(selector, context);
        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) return this;
        // if Developer pass a css selector
        if (typeof selector === "string") {
            this.selector = selector;
            // HANDLE: $(".class") , $("#id") and more valid selector
            if ($047f9defc20f6cd7$var$isValidElementSelector(selector)) {
                // selecting all element
                console.log(selector, document);
                this.nodes = (context || document).querySelectorAll(selector);
            // HANDLE: $(html)
            } else if ($047f9defc20f6cd7$var$isValidHtmlElement(selector)) {
                this.nodes = $047f9defc20f6cd7$var$createHtmlElementDynamically(selector);
                // HANDLE: $(html, props)
                if (context) {
                    if ($047f9defc20f6cd7$var$isPlainObject(context)) this.nodes.forEach((ele, i)=>{
                        for(let prop in context)this.attr.call(ele, prop, context[prop]);
                    });
                }
            }
        } else if (typeof selector === "function") $047f9defc20f6cd7$var$handleDOMReady(selector);
        else if (selector instanceof HTMLElement) this.nodes = [
            selector
        ];
        if (this.nodes?.length) {
            this.length = this.nodes.length;
            // assinging all elements to the object
            for(let i = 0; i < this.nodes?.length; i++)this[i] = this.nodes[i];
        }
    }
    BabyQuery.fn = BabyQuery.prototype = {
        /**
     * .ready() waits until all document and scripts get loads
     * @param {Function} callback which will wait to be load the dom and all other scripts
     *
     */ ready: function(callback) {
            if ($047f9defc20f6cd7$var$isFunction(callback)) $047f9defc20f6cd7$var$handleDOMReady(callback);
        }
    };
    BabyQuery.extend = BabyQuery.fn.extend = $047f9defc20f6cd7$var$myExtend;
    BabyQuery.fn.extend((0, $d8203bae9db46050$export$2e2bcd8739ae039), (0, $a9a61dad2c314c2e$export$2e2bcd8739ae039), (0, $6003777f4412a1bb$export$2e2bcd8739ae039));
    globalThis.BabyQuery = globalThis.$ = BabyQuery;
    return BabyQuery;
}("undefined" != typeof window ? window : $parcel$global, undefined);
// Export the function using CommonJS syntax
module.exports = $047f9defc20f6cd7$var$$;
var // Export the function using ES module syntax
$047f9defc20f6cd7$export$2e2bcd8739ae039 = $047f9defc20f6cd7$var$$;


//# sourceMappingURL=babyQuery.js.map
