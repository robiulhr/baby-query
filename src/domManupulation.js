import checkers from './checkers'
import helpers from './helpers'
const { isFunction, isPlainObject, isArrayLike } = checkers
const { separateValueUnit } = helpers

export default {
  after: function () {
    
  },
  addClass: function () {},
  after: function () {},
  append: function () {},
  attr: function (name, value) {
    if (typeof name === 'string') {
      if (!value) {
        return this['0']?.getAttribute(name)
      } else if (typeof value === 'string') {
        this['0']?.setAttribute(name, value)
        return this
      } else if (isFunction(value)) {
        for (let i = 0; i < this.nodes.length; i++) {
          const currVal = this[i]?.getAttribute(name)
          const newVal = value(i, currVal)
          newVal && this[i]?.setAttribute(name, newVal)
        }
        return this
      }
    } else if (isPlainObject(value)) {
      for (let prop in value) {
        this['0'].setAttribute(prop, value[prop])
      }
      return this
    }
  },
  before: function () {},
  css: function (name, value) {
    if (typeof name === 'string') {
      if (typeof value === 'string') {
        let toIncrease = false
        value.slice(0, 2) == '+=' && (toIncrease = true)
        for (let i = 0; i < this.nodes.length; i++) {
          if (toIncrease) {
            const { value: currValue, unit } = separateValueUnit(window.getComputedStyle(this[i])[name])
            const newValue = currValue + Number(value.slice(2))
            this[i].style[name] = newValue + unit
          } else {
            this[i].style[name] = value
          }
        }
        return this
      } else if (isFunction(value)) {
        for (let i = 0; i < this.nodes.length; i++) {
          const propValue = window.getComputedStyle(this[i])[name]
          const { unit: currentUnit } = separateValueUnit(propValue)
          const { value: givenValue, unit: givenUnit } = separateValueUnit(value(i, propValue))
          this[i].style[name] = givenValue + (givenUnit || currentUnit)
        }
        return this
      } else if (!value) return window.getComputedStyle(this['0'])[name]
    } else if (isArrayLike(name)) {
      let attrs = {}
      for (let i = 0; i < name.length; i++) {
        attrs[name[i]] = window.getComputedStyle(this['0'])[name[i]]
      }
      return attrs
    } else if (isPlainObject(name)) {
      for (let i = 0; i < this.nodes.length; i++) {
        for (let props in name) {
          this[i].style[props] = name[props]
        }
      }
      return this
    }
  },
  empty: function () {},
  get: function () {},
  has: function () {},
  hasClass: function () {},
  html: function () {},
  prepend:function(){},
  remove:function(){},
  removeAttr: function () {},
  removeClass: function () {},
  text:function(){},
  toggle:function(){},
}
