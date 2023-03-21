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
        return typeof input === "object" && !$d4df80a29a2554d2$var$checkers.isPlainObject(input) && input.length && input.nodes;
    }
};
var $d4df80a29a2554d2$export$2e2bcd8739ae039 = $d4df80a29a2554d2$var$checkers;


const { isArrayLike: $20b4a97a61b3fccb$var$isArrayLike , isEqualObject: $20b4a97a61b3fccb$var$isEqualObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
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
   */ myExtend: function() {
        for(let i = 0; i < arguments.length; i++){
            if (!arguments[i] || typeof arguments[i] !== "object") continue;
            for(var key in arguments[i])if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                var value = arguments[i][key];
                if (value !== undefined) {
                    if (typeof value === "object" && value !== null) {
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







const { isBabyQueryObject: $8e7efde313f1b90f$var$isBabyQueryObject , isArrayLike: $8e7efde313f1b90f$var$isArrayLike  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $8e7efde313f1b90f$var$createHtmlElementDynamically  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const $8e7efde313f1b90f$var$localhelpers = {
    /**
   * function to run recursively in .after() and .append() method
   * @param {Array} argumentArray array of arguments which has been passed in .after() method
   * @param {String} methodName after or append
   */ afterandAppendmethodRecursive: function(argumentArray, methodName) {
        // keep all cloned element listed
        let clonedNodeList = [];
        for(let index = methodName === "after" ? argumentArray.length - 1 : 0; methodName === "after" ? index >= 0 : index < argumentArray.length; methodName === "after" ? index-- : index++){
            if (typeof argumentArray[index] === "string" || argumentArray[index] instanceof HTMLElement) for(let ind = 0; ind < this.length; ind++){
                const newElement = typeof argumentArray[index] === "string" ? $8e7efde313f1b90f$var$createHtmlElementDynamically(argumentArray[index])[0] : argumentArray[index];
                switch(methodName){
                    case "after":
                        $8e7efde313f1b90f$var$localhelpers.insertAfterNormalElem(newElement, this[ind], ind);
                        break;
                    case "append":
                        $8e7efde313f1b90f$var$localhelpers.appendNormalChild(newElement, this[ind]);
                        break;
                }
            }
            else if ($8e7efde313f1b90f$var$isBabyQueryObject(argumentArray[index])) {
                for(let ind = 0; ind < this.length; ind++)for(let i = methodName === "after" ? argumentArray[index].length - 1 : 0; methodName === "after" ? i >= 0 : i < argumentArray[index].length; methodName === "after" ? i-- : i++){
                    // clone the element
                    let newClonedElement = argumentArray[index][i].cloneNode(true);
                    // check if the element is already in the clonedNodeList
                    const alreadyClonedElementInd = clonedNodeList.findIndex((ele)=>{
                        return ele.originalElement === argumentArray[index][i] && ele.contextElementIndex === ind;
                    });
                    switch(methodName){
                        case "after":
                            if (alreadyClonedElementInd !== -1) {
                                // remove the element from the dom tree
                                clonedNodeList[alreadyClonedElementInd].oldClonedElement.replaceWith(newClonedElement);
                                clonedNodeList[alreadyClonedElementInd].originalElement.replaceWith(argumentArray[index][i]);
                                // filter it from the clonedNodeList
                                clonedNodeList = clonedNodeList.filter((ele, ind)=>{
                                    return ind != alreadyClonedElementInd;
                                });
                            } else $8e7efde313f1b90f$var$localhelpers.insertAfterBabyqueryObject(argumentArray[index][i], newClonedElement, this[ind], ind, this.length);
                            clonedNodeList.push({
                                contextElementIndex: ind,
                                oldClonedElement: newClonedElement,
                                originalElement: argumentArray[index][i]
                            });
                            break;
                        case "append":
                            if (alreadyClonedElementInd !== -1) {
                                // remove the element from the dom tree
                                clonedNodeList[alreadyClonedElementInd].oldClonedElement.remove();
                                clonedNodeList[alreadyClonedElementInd].originalElement.remove();
                                // filter it from the clonedNodeList
                                clonedNodeList = clonedNodeList.filter((ele, ind)=>{
                                    return ind != alreadyClonedElementInd;
                                });
                            }
                            clonedNodeList.push({
                                contextElementIndex: ind,
                                oldClonedElement: newClonedElement,
                                originalElement: argumentArray[index][i]
                            });
                            $8e7efde313f1b90f$var$localhelpers.appendBabyQueryChild(argumentArray[index][i], newClonedElement, this[ind], ind, this.length);
                            break;
                    }
                }
            } else if ($8e7efde313f1b90f$var$isArrayLike(argumentArray[index]) && !argumentArray[index].nodes) // call the afterandAppendmethodRecursive function again (recursively)
            $8e7efde313f1b90f$var$localhelpers.afterandAppendmethodRecursive.call(this, argumentArray[index], methodName);
        }
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
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
   * @param {Number} totalElement total count of context element (the existing elements) which after the new element will take place [more specifically this.length property]
   *
   */ insertAfterBabyqueryObject: function(newNode, clonedNode, existingNode, elemIndex, totalElement) {
        // if its the last existing element
        if (elemIndex == totalElement - 1) existingNode.parentNode.insertBefore(newNode, existingNode.nextElementSibling);
        else existingNode.parentNode.insertBefore(clonedNode, existingNode.nextElementSibling);
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
   * @param {HTMLElement} newNode the new node which will be inserted
   * @param {HTMLElement} existingNode the existing element which after the new element will take place
   * @param {Number} elemIndex the index of context element (the existing element) which after the new element will take place
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


const { afterandAppendmethodRecursive: $d8203bae9db46050$var$afterandAppendmethodRecursive , insertAfterNormalElem: $d8203bae9db46050$var$insertAfterNormalElem , appendNormalChild: $d8203bae9db46050$var$appendNormalChild  } = (0, $8e7efde313f1b90f$export$2e2bcd8739ae039);
const { isFunction: $d8203bae9db46050$var$isFunction , isPlainObject: $d8203bae9db46050$var$isPlainObject , isValidHtmlElement: $d8203bae9db46050$var$isValidHtmlElement , isBabyQueryObject: $d8203bae9db46050$var$isBabyQueryObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $d8203bae9db46050$var$createHtmlElementDynamically  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
var $d8203bae9db46050$export$2e2bcd8739ae039 = {
    /**
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   * @param {HTMLElement|String|Function} element Exp:
   * @returns {Object} return the BabyQuery object
   */ after: function(element) {
        // binding this to the afterMethodRecursive function
        const afterandAppendmethodRecursiveBinded = $d8203bae9db46050$var$afterandAppendmethodRecursive.bind(this);
        if ($d8203bae9db46050$var$isFunction(element)) for(let ind = 0; ind < this.length; ind++)$d8203bae9db46050$var$insertAfterNormalElem($d8203bae9db46050$var$createHtmlElementDynamically(element.call(this[ind]))[0], this[ind]);
        else afterandAppendmethodRecursiveBinded(arguments, "after");
        return this;
    },
    /**
   * insert content, specified by the parameter, inside each element in the set of matched elements.
   * @param {HTMLElement|String|Function} element Exp:
   * @returns {Object} return the BabyQuery object
   */ append: function(element) {
        // binding this to the  function
        const afterandAppendmethodRecursiveBinded = $d8203bae9db46050$var$afterandAppendmethodRecursive.bind(this);
        if ($d8203bae9db46050$var$isFunction(element)) for(let ind = 0; ind < this.length; ind++)$d8203bae9db46050$var$appendNormalChild($d8203bae9db46050$var$createHtmlElementDynamically(element.call(this[ind]))[0], this[ind]);
        else afterandAppendmethodRecursiveBinded(arguments, "append");
        return this;
    },
    attr: function(name, value) {
        if (typeof name === "string") {
            if (!value) return this["0"]?.getAttribute(name);
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
    html: function(input) {
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
    text: function(text) {
        if (!text) return this[0].textContent;
        else if (typeof text === "string") for(let i = 0; i < this.length; i++)this[i].textContent = text;
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


const { isValidElementSelector: $047f9defc20f6cd7$var$isValidElementSelector , isValidHtmlElement: $047f9defc20f6cd7$var$isValidHtmlElement , isPlainObject: $047f9defc20f6cd7$var$isPlainObject , isFunction: $047f9defc20f6cd7$var$isFunction , isWindow: $047f9defc20f6cd7$var$isWindow , toType: $047f9defc20f6cd7$var$toType , isArrayLike: $047f9defc20f6cd7$var$isArrayLike , isEmptyObject: $047f9defc20f6cd7$var$isEmptyObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $047f9defc20f6cd7$var$createHtmlElementDynamically , handleDOMReady: $047f9defc20f6cd7$var$handleDOMReady , myExtend: $047f9defc20f6cd7$var$myExtend  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
var $047f9defc20f6cd7$export$2e2bcd8739ae039 = function(globalThis) {
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
            // HANDLE: $(".class") , $("#id") and more valid selector
            if ($047f9defc20f6cd7$var$isValidElementSelector(selector)) // selecting all element
            this.nodes = (context || document).querySelectorAll(selector);
            else if ($047f9defc20f6cd7$var$isValidHtmlElement(selector)) {
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
    BabyQuery.fn.extend((0, $d8203bae9db46050$export$2e2bcd8739ae039), (0, $a9a61dad2c314c2e$export$2e2bcd8739ae039));
    globalThis.BabyQuery = globalThis.$ = BabyQuery;
    return BabyQuery;
}("undefined" != typeof window ? window : $parcel$global, undefined);


//# sourceMappingURL=babyQuery.js.map
