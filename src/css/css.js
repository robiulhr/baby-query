import checkers from '../checkers'
import helpers from '../helpers'
import localhelpers from './localhelpers'
const { isFunction, isPlainObject, isArrayLike } = checkers
const { separateValueUnit } = helpers
const { cssIsValueFunction } = localhelpers
export default {
  css: function (name, value) {
    if (typeof name === 'string') {
      if (typeof value === 'string') {
        let toIncrease = false
        value.slice(0, 2) == '+=' && (toIncrease = true)
        for (let i = 0; i < this.length; i++) {
          if (toIncrease) {
            const { value: currValue, unit } = separateValueUnit(window.getComputedStyle(this[i])[name])
            const newValue = currValue + Number(value.slice(2))
            this[i].style[name] = newValue + unit
          } else {
            this[i].style[name] = value
          }
        }
      } else if (isFunction(value)) {
        cssIsValueFunction(name, value, this)
      } else if (!value) return window.getComputedStyle(this['0'])[name]
    } else if (isArrayLike(name)) {
      let attrs = {}
      for (let i = 0; i < name.length; i++) {
        attrs[name[i]] = window.getComputedStyle(this['0'])[name[i]]
      }
      return attrs
    } else if (isPlainObject(name)) {
      for (let props in name) {
        if (isFunction(name[props])) {
          cssIsValueFunction(props, name[props], this)
        } else {
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
