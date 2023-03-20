import helpers from '../helpers'
const { separateValueUnitOperators } = helpers
const localhelpers = {
  /**
   * convert length value px to rem and rem to px
   * @param {Number} value value wanna convert
   * @param {String} fromUnit unit wanna convert from 
   * @param {String} toUnit unit wanna convert to 
   * @param {Number}[fonSize = parseFloat(getComputedStyle(document.documentElement).fontSize)] fontSize fonSize of the element 
   * @returns {Number} round the result to 3 decimal places 
   */
  convertUnitsPxRem:function(value, fromUnit, toUnit, fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) ) {  
    // check if the input value is a string and contains a unit
    const match = value.toString().match(/^([\d\.]+)(\w*)$/);
    if (!match) {
      throw new Error(`Invalid value: ${value}`);
    }
  
    const numericValue = parseFloat(match[1]);
    const unit = match[2] || fromUnit;
  
    // convert the input value to pixels if necessary
    let pixels;
    if (unit === 'px') {
      pixels = numericValue;
    } else if (unit === 'rem') {
      pixels = numericValue * fontSize;
    } else {
      throw new Error(`Invalid unit: ${unit}`);
    }
  
    // convert the pixels to the target unit
    let result;
    if (toUnit === 'px') {
      result = pixels;
    } else if (toUnit === 'rem') {
      result = pixels / fontSize;
    } else {
      throw new Error(`Invalid target unit: ${toUnit}`);
    }
  
    // round the result to 3 decimal places
    return parseFloat(result.toFixed(3));
  }
  ,
  /**
   * when .css(name,value) value is a funciton 
   * @param {String} cssProp name passed in .css() method as property Exp: "width","backgroundColor"
   * @param {Function} callback function passed in .css() method as value
   * @param {Array} elementArr array of element in Babyquery object
   * 
   */
  cssValueIsFunction: function (cssProp, callback, elementArr) {
    for (let i = 0; i < elementArr.length; i++) {
      const propValue = window.getComputedStyle(elementArr[i])[cssProp]
      const givenValue = callback.call(elementArr[i], i, propValue)
      localhelpers.setIncreaseDecreaseLength(cssProp, givenValue, elementArr[i])
    }
  },
  /**
   * count increamented or decremented value for a element's css property
   * @param {Number} currValue value which is now of a dom element
   * @param {Number} givenValue value which is given to increase or decrease from the current value
   * @param {String} operator "+=" (have to increase the value) or "-=" (have to decrease the value) 
   * @returns {Number} calculated value after increasing or decreasing
   * 
   */
  increDecreLength: function (currValue, givenValue, operator) {
    return operator.slice(0, 1) === '+' ? currValue + givenValue : currValue - givenValue;
  },
  /**
   * set or increment or decrement element's css property 
   * @param {String} propName name passed in .css() method as property Exp: "width","backgroundColor"
   * @param {String} givenValue the value has been given in as .css() value Exp: "+=200px" or "200px" or "200" 
   * @param {HTMLElement} currElement html element which is now reffering.
   * 
   */
  setIncreaseDecreaseLength: function (propName, givenValue, currElement) {
    let toIncreaseDecrease = false
    const { value: givenValueParsed, unit: givenUnitParsed, operator: givenOparatorParsed } = separateValueUnitOperators(givenValue)
    givenOparatorParsed && (toIncreaseDecrease = true)
    const { value: currValue, unit: currentUnit } = separateValueUnitOperators(window.getComputedStyle(currElement)[propName])
    if (toIncreaseDecrease) {
      let newValue
      let currValueConverted
      let newUnit
      if (currentUnit === givenUnitParsed) {
        currValueConverted = currValue
        newUnit = currentUnit || 'px'
      } else if ((givenUnitParsed === 'px'  && currentUnit === 'rem') || givenUnitParsed === 'rem'  && currentUnit === 'px') {
        const fontSize = parseFloat(getComputedStyle(currElement).fontSize)
        currValueConverted = localhelpers.convertUnitsPxRem(currValue,currentUnit,givenUnitParsed,fontSize)
        newUnit = givenUnitParsed
      }else if (!givenUnitParsed) {
        currValueConverted = currValue
        newUnit = currentUnit || 'px'
      } else {
        currValueConverted = currValue
        newUnit = 'px'
      }
      newValue = localhelpers.increDecreLength(currValueConverted, givenValueParsed, givenOparatorParsed) + newUnit
      currElement.style[propName] = newValue
    } else {
      currElement.style[propName] = givenValueParsed + (givenUnitParsed || currentUnit)
    }
  }
}
export default localhelpers
