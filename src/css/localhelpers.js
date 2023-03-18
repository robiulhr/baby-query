import helpers from "../helpers"
const {separateValueUnit} = helpers
const localhelpers = {
  isCssValueFunction: function (cssProp, callback, elementArr) {
    for (let i = 0; i < elementArr.length; i++) {
      const propValue = window.getComputedStyle(elementArr[i])[cssProp]
      const { unit: currentUnit } = separateValueUnit(propValue)
      const { value: givenValue, unit: givenUnit } = separateValueUnit(callback.call(elementArr[i], i, propValue))
      elementArr[i].style[cssProp] = givenValue + (givenUnit || currentUnit)
    }
  }
}
export default localhelpers