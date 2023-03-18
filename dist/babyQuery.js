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
    isValidElementSelector: function(input) {
        try {
            document.createDocumentFragment().querySelector(input);
        } catch  {
            return false;
        }
        return true;
    },
    isValidHtmlElement: (html)=>{
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
    isFunction: function(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
    },
    isWindow: function(obj) {
        return obj != null && obj === obj.window;
    },
    toType: function(obj) {
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ? Object[Object.prototype.toString.call(obj)] || "object" : typeof obj;
    },
    isArrayLike: function(obj) {
        var length = !!obj && "length" in obj && obj.length, type = $d4df80a29a2554d2$var$checkers.toType(obj);
        if ($d4df80a29a2554d2$var$checkers.isFunction(obj) || $d4df80a29a2554d2$var$checkers.isWindow(obj)) return false;
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    },
    isPlainObject: function(obj) {
        var proto, Ctor;
        // Detect obvious negatives
        if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") return false;
        proto = Object.getPrototypeOf(obj);
        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) return true;
        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && Object.prototype.toString.call(Ctor) === Object.prototype.toString.call(Object);
    },
    isEmptyObject: function(obj) {
        var name;
        for(name in obj)return false;
        return true;
    },
    /**
   * @return {Boolean} true/false  
   * can be pass as many as object exmple: isEqualObject(obj1,obj2,obj3);
   */ isEqualObject () {
        let first = JSON.stringify(arguments[0]);
        for(let i = 1; i < arguments.length; i++){
            if (first !== JSON.stringify(arguments[i])) return false;
        }
        return true;
    },
    isBabyQueryObject (obj) {
        return typeof obj === "object" && !$d4df80a29a2554d2$var$checkers.isPlainObject(obj) && obj.length && obj.nodes;
    }
};
var $d4df80a29a2554d2$export$2e2bcd8739ae039 = $d4df80a29a2554d2$var$checkers;


const { isArrayLike: $20b4a97a61b3fccb$var$isArrayLike , isEqualObject: $20b4a97a61b3fccb$var$isEqualObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
var $20b4a97a61b3fccb$export$2e2bcd8739ae039 = {
    handleDOMReady: function(callback) {
        var domReadyQueue = [];
        document.readyState === "complete" ? callback.call(document) : domReadyQueue.push(callback);
        // running domReadyQueue funcitons after the dom loads.
        document.addEventListener("DOMContentLoaded", function onDOMReady() {
            document.removeEventListener("DOMContentLoaded", onDOMReady);
            while(domReadyQueue.length)domReadyQueue.shift().call(document);
        });
    },
    createHtmlElementDynamically: function(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return template.content.childNodes;
    },
    myExtend: function() {
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
    separateValueUnit: function(valueStr) {
        let value = "";
        let unit = "";
        if (typeof valueStr !== "string") return {
            value: valueStr,
            unit: unit
        };
        for(let i = 0; i < valueStr.length; i++)isNaN(+valueStr[i]) ? unit += valueStr[i] : value += valueStr[i];
        return {
            value: Number(value),
            unit: unit
        };
    },
    fileterDuplicateInaRow: function(array) {
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
    }
};







const { isBabyQueryObject: $8e7efde313f1b90f$var$isBabyQueryObject , isArrayLike: $8e7efde313f1b90f$var$isArrayLike  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $8e7efde313f1b90f$var$createHtmlElementDynamically  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const $8e7efde313f1b90f$var$localhelpers = {
    afterandAppendmethodRecursive: function(elementArray, methodName) {
        for(let index = methodName === "after" ? elementArray.length - 1 : 0; methodName === "after" ? index >= 0 : index < elementArray.length; methodName === "after" ? index-- : index++){
            if (typeof elementArray[index] === "string") for(let ind = 0; ind < this.length; ind++)switch(methodName){
                case "after":
                    $8e7efde313f1b90f$var$localhelpers.insertAfter($8e7efde313f1b90f$var$createHtmlElementDynamically(elementArray[index])[0], this[ind]);
                    break;
                case "append":
                    $8e7efde313f1b90f$var$localhelpers.appendChild($8e7efde313f1b90f$var$createHtmlElementDynamically(elementArray[index])[0], this[ind]);
                    break;
            }
            else if ($8e7efde313f1b90f$var$isBabyQueryObject(elementArray[index])) {
                for(let ind = 0; ind < this.length; ind++)for(let i = 0; i < elementArray[index].length; i++)switch(methodName){
                    case "after":
                        $8e7efde313f1b90f$var$localhelpers.insertAfter(elementArray[index][i], this[ind]);
                        break;
                    case "append":
                        $8e7efde313f1b90f$var$localhelpers.appendChild(elementArray[index][i], this[ind]);
                        break;
                }
            } else if ($8e7efde313f1b90f$var$isArrayLike(elementArray[index]) && !elementArray[index].nodes) // call the afterandAppendmethodRecursive function again (recursively)
            $8e7efde313f1b90f$var$localhelpers.afterandAppendmethodRecursive.call(this, elementArray[index], methodName);
            else if (elementArray[index] instanceof HTMLElement) for(let ind = 0; ind < this.length; ind++)switch(methodName){
                case "after":
                    $8e7efde313f1b90f$var$localhelpers.insertAfter(elementArray[index], this[ind]);
                    break;
                case "append":
                    $8e7efde313f1b90f$var$localhelpers.appendChild(elementArray[index], this[ind]);
                    break;
            }
        }
    },
    insertAfter: function(newNode, existingNode) {
        // make a clone of the element
        let cloneNode = newNode.cloneNode(true);
        // remove the original element
        newNode.remove();
        // insert the cloned element
        existingNode.parentNode.insertBefore(cloneNode, existingNode.nextElementSibling);
    },
    appendChild (newNode, targetNode) {
        // make a clone of the element
        let cloneNode = newNode.cloneNode(true);
        // remove the original element
        newNode.remove();
        // append the cloned element
        targetNode.appendChild(cloneNode);
    }
};
var $8e7efde313f1b90f$export$2e2bcd8739ae039 = $8e7efde313f1b90f$var$localhelpers;


const { afterandAppendmethodRecursive: $d8203bae9db46050$var$afterandAppendmethodRecursive , insertAfter: $d8203bae9db46050$var$insertAfter , appendChild: $d8203bae9db46050$var$appendChild  } = (0, $8e7efde313f1b90f$export$2e2bcd8739ae039);
const { isFunction: $d8203bae9db46050$var$isFunction , isPlainObject: $d8203bae9db46050$var$isPlainObject , isValidHtmlElement: $d8203bae9db46050$var$isValidHtmlElement , isBabyQueryObject: $d8203bae9db46050$var$isBabyQueryObject  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { createHtmlElementDynamically: $d8203bae9db46050$var$createHtmlElementDynamically , fileterDuplicateInaRow: $d8203bae9db46050$var$fileterDuplicateInaRow  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
var $d8203bae9db46050$export$2e2bcd8739ae039 = {
    after: function(element) {
        // binding this to the afterMethodRecursive function
        const afterandAppendmethodRecursiveBinded = $d8203bae9db46050$var$afterandAppendmethodRecursive.bind(this);
        if ($d8203bae9db46050$var$isFunction(element)) for(let ind = 0; ind < this.length; ind++)$d8203bae9db46050$var$insertAfter($d8203bae9db46050$var$createHtmlElementDynamically(element.call(this[ind]))[0], this[ind]);
        else {
            const filteredArguments = $d8203bae9db46050$var$fileterDuplicateInaRow(arguments);
            afterandAppendmethodRecursiveBinded(filteredArguments, "after");
        }
        return this;
    },
    append: function(element) {
        // binding this to the  function
        const afterandAppendmethodRecursiveBinded = $d8203bae9db46050$var$afterandAppendmethodRecursive.bind(this);
        if ($d8203bae9db46050$var$isFunction(element)) for(let ind = 0; ind < this.length; ind++)$d8203bae9db46050$var$appendChild($d8203bae9db46050$var$createHtmlElementDynamically(element.call(this[ind]))[0], this[ind]);
        else {
            const filteredArguments = $d8203bae9db46050$var$fileterDuplicateInaRow(arguments);
            afterandAppendmethodRecursiveBinded(filteredArguments, "append");
        }
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





const { separateValueUnit: $a21d1168b2ad536e$var$separateValueUnit  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const $a21d1168b2ad536e$var$localhelpers = {
    isCssValueFunction: function(cssProp, callback, elementArr) {
        for(let i = 0; i < elementArr.length; i++){
            const propValue = window.getComputedStyle(elementArr[i])[cssProp];
            const { unit: currentUnit  } = $a21d1168b2ad536e$var$separateValueUnit(propValue);
            const { value: givenValue , unit: givenUnit  } = $a21d1168b2ad536e$var$separateValueUnit(callback.call(elementArr[i], i, propValue));
            elementArr[i].style[cssProp] = givenValue + (givenUnit || currentUnit);
        }
    }
};
var $a21d1168b2ad536e$export$2e2bcd8739ae039 = $a21d1168b2ad536e$var$localhelpers;


const { isFunction: $a9a61dad2c314c2e$var$isFunction , isPlainObject: $a9a61dad2c314c2e$var$isPlainObject , isArrayLike: $a9a61dad2c314c2e$var$isArrayLike  } = (0, $d4df80a29a2554d2$export$2e2bcd8739ae039);
const { separateValueUnit: $a9a61dad2c314c2e$var$separateValueUnit  } = (0, $20b4a97a61b3fccb$export$2e2bcd8739ae039);
const { isCssValueFunction: $a9a61dad2c314c2e$var$isCssValueFunction  } = (0, $a21d1168b2ad536e$export$2e2bcd8739ae039);
var $a9a61dad2c314c2e$export$2e2bcd8739ae039 = {
    css: function(name, value) {
        if (typeof name === "string") {
            if (typeof value === "string") {
                let toIncrease = false;
                value.slice(0, 2) == "+=" && (toIncrease = true);
                for(let i = 0; i < this.length; i++)if (toIncrease) {
                    const { value: currValue , unit: unit  } = $a9a61dad2c314c2e$var$separateValueUnit(window.getComputedStyle(this[i])[name]);
                    const newValue = currValue + Number(value.slice(2));
                    this[i].style[name] = newValue + unit;
                } else this[i].style[name] = value;
            } else if ($a9a61dad2c314c2e$var$isFunction(value)) $a9a61dad2c314c2e$var$isCssValueFunction(name, value, this);
            else if (!value) return window.getComputedStyle(this["0"])[name];
        } else if ($a9a61dad2c314c2e$var$isArrayLike(name)) {
            let attrs = {};
            for(let i = 0; i < name.length; i++)attrs[name[i]] = window.getComputedStyle(this["0"])[name[i]];
            return attrs;
        } else if ($a9a61dad2c314c2e$var$isPlainObject(name)) for(let props in name){
            if ($a9a61dad2c314c2e$var$isFunction(name[props])) $a9a61dad2c314c2e$var$isCssValueFunction(props, name[props], this);
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
    function BabyQuery(selector, context) {
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
        if (this.nodes?.length) {
            this.length = this.nodes.length;
            // assinging all elements to the object
            for(let i = 0; i < this.nodes?.length; i++)this[i] = this.nodes[i];
        }
    }
    BabyQuery.fn = BabyQuery.prototype = {
        // ready funciton = wait until all document and scripts get loads
        ready: function(callback) {
            if ($047f9defc20f6cd7$var$isFunction(callback)) $047f9defc20f6cd7$var$handleDOMReady(callback);
        }
    };
    BabyQuery.extend = BabyQuery.fn.extend = $047f9defc20f6cd7$var$myExtend;
    BabyQuery.fn.extend((0, $d8203bae9db46050$export$2e2bcd8739ae039), (0, $a9a61dad2c314c2e$export$2e2bcd8739ae039));
    globalThis.BabyQuery = globalThis.$ = BabyQuery;
    return BabyQuery;
}("undefined" != typeof window ? window : $parcel$global, undefined);


//# sourceMappingURL=babyQuery.js.map
