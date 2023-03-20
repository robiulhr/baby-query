import checkers from '../checkers'
import localhelpers from './localhelpers'
const { isFunction, isPlainObject, isArrayLike } = checkers
const { cssValueIsFunction, setIncreaseDecreaseLength } = localhelpers
export default {
  /**
   * Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
   * @param {String | Object | Array} name Exp: "width" or {width:"200px",background:function(ele){return "200px"}} or ["width","background"]
   * @param {String | function} value Exp: "200px" or "red" or function(ind,ele){return "+=200px"}
   * @returns {String|Object} if the second parameter is absent then it will return String otherwise will return the BabyQuery object
   */
  css: function (name, value) {
    if (typeof name === 'string') {
      // handle .css("width","20px") or .css("width","+=20px") or .css("width","-=20px")
      if (typeof value === 'string') {
        const isValueHaveNumber = (value.match(/[\d\.]+/) || [])[0]
        if (isValueHaveNumber) {
          for (let i = 0; i < this.length; i++) {
            setIncreaseDecreaseLength(name, value, this[i])
          }
        }
        // handle .css("background","red")
        else if (!isValueHaveNumber) {
          for (let i = 0; i < this.length; i++) {
            this[i].style[name] = value
          }
        }
      }
      // handle .css("background",function)
      else if (isFunction(value)) {
        cssValueIsFunction(name, value, this)
      }
      // handle .css("background")
      else if (!value) return window.getComputedStyle(this['0'])[name]
    }
    // handle .css(["background","width"])
    else if (isArrayLike(name)) {
      let attrs = {}
      for (let i = 0; i < name.length; i++) {
        attrs[name[i]] = window.getComputedStyle(this['0'])[name[i]]
      }
      return attrs
    }
    // handle .css(object)
    else if (isPlainObject(name)) {
      for (let props in name) {
        // .css({"background":function,"width":function})
        if (isFunction(name[props])) {
          cssValueIsFunction(props, name[props], this)
        }
        // .css({"background":"red","width":"20px"})
        else {
          for (let i = 0; i < this.length; i++) {
            this[i].style[props] = name[props]
          }
        }
      }
    }
    return this
  },
  addClass: function () {},
  removeClass: function () {},
  hasClass: function () {},
  toggleClass: function () {}
}
