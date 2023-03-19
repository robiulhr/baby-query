# .css()

Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.

## Method Details

| Method Call                                                    | Description                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [.css(propertyName)](#css-propertyname-and-css-propertynames)  | <b>propertyName</b> <br>Type: String A CSS property.                                                                                                                                                                                                                                                                |
| [.css(propertyNames)](#css-propertyname-and-css-propertynames) | <b>propertyNames</b><br>Type: Array<br>An array of one or more CSS properties.                                                                                                                                                                                                                                      |
| [.css(propertyName,value)](#css-propertyname-value)            | <b>propertyName</b><br>Type: String<br>A CSS property name.<br><b>value</b><br>Type: String or Number <br>A value to set for the property.                                                                                                                                                                          |
| [.css(propertyName,function)](#css-propertyname-function)      | <b>propertyName</b><br>Type: String<br>A CSS property name. <br> <b>function</b> <br>Type: Function( Integer index, String value ) => String or Number<br>A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments. |
| [.css(properties)](#css-properties)                            | <b>properties</b><br>Type: PlainObject<br> An object of property-value pairs to set.                                                                                                                                                                                                                                |

## Code Examples

Few Example for `.css()` method

### .css(propertyName) and .css(propertyNames)

Get the css property value using the `.css()` method.

Html code

```html
<style>
  div {
    width: 60px;
    height: 60px;
    margin: 5px;
    float: left;
  }
</style>
><span id="result">&nbsp;</span>
<div style="background-color: blue"></div>
<div style="background-color: rgb(15, 99, 30)"></div>
<div style="background-color: #123456"></div>
<div style="background-color: #f11"></div>
```

add this `Baby Query` code to a js file

```javascript
console.log($('div').css('background-color'))
```

Check the console now. output will be:

```
'rgb(0, 0, 255)'
```

Now add this `Baby Query` code

```javascript
console.log($('div').css(['width', 'height', 'color', 'background-color']))
```

Check the console now. output will be:

```
{
background-color: 'blue',
color: '',
height: '60px',
width: '60px'
}

```

### .css(propertyName,value)

Set the css property value using the .css() method.

Now add this code to the js file

```javascript
$('div').css('background', 'red')
```

Each div `background-color` will be changed to `red`

```html
<div style="background-color: red"></div>
<div style="background-color: red"></div>
<div style="background-color: red"></div>
<div style="background-color: red"></div>
```

Also css property can be modified dynamically like this:

```javascript
$('div').css('width', '+=200')
```

Now each div's `width` value will be encreased `200`;

> Note: The unit will be the current unit of the element. In this case the `width` unit is `px`. So the updated `width` will be in `px`.

### .css(propertyName,function)

Function can be pass as a second parameter in the `.css()` method.

remove the previous code snippet and Add this `Baby Query` code in the js file

```javascript
$('div').css('width', function (index, value) {
  return parseFloat(value) * index
})
```

this code will set the `width` property of each `div` elements dynamically.

Now the html will look like below:

```html
<div style="background-color: blue; width: 0px;"></div>
<div style="background-color: rgb(15, 99, 30); width: 60px;"></div>
<div style="background-color: rgb(18, 52, 86); width: 120px;"></div>
<div style="background-color: rgb(255, 17, 17); width: 180px;"></div>
```

Also current html element can be access from inside the callback using the `this` keyword:

remove the previous code snippet and add this code to the js file:

```javascript
$('div').css('width', function (index, value) {
  const width = parseFloat(value) * index
  this.textContent = `width is ${width}`
  return width
})
```

Now the html will look like below:

```html
<div style="background-color: blue; width: 0px;">width is 0</div>
<div style="background-color: rgb(15, 99, 30); width: 60px;">width is 60</div>
<div style="background-color: rgb(18, 52, 86); width: 120px;">width is 120</div>
<div style="background-color: rgb(255, 17, 17); width: 180px;">width is 180</div>
```

Inside the callback function a new `BabyQuery` object can be created passing the `this` keyword as a selector.

remove the previous code snippet and add this code to the js file:

```javascript
$('div').css('width', function (index, value) {
  $(this).text('new div here.')
  return '200px'
})
```

Here this code creating a new `Babyquery` object inside the callback function of `.css()` method and setting it `textContent` to `new div here` and since it's returning `200px` that's why each `div` `width` will be set to `200px`.

> Note: Since here `this` keyword referencing the `div` itself. so, it will set `textContent` of each `div` to `new div here`. 

Now the html will look like below:

```javascript
    <div style="background-color: blue; width: 200px;">new div here.</div>
    <div style="background-color: rgb(15, 99, 30); width: 200px;">new div here.</div>
    <div style="background-color: rgb(18, 52, 86); width: 200px;">new div here.</div>
    <div style="background-color: rgb(255, 17, 17); width: 200px;">new div here.</div>
```

### .css(properties)

Object can be passed as the parameter in `.css()` method.

remove the previous code snippet and Add this `Baby Query` code in the js file

```javascript
$('div').css({
  'background-color': 'yellow',
  'font-weight': 'bolder'
})
```

this code will set the `background-color` and `font-weight` property of each `div` elements.

Now the html will look like below:

```html
<div style="background-color: yellow; font-weight: bolder;"></div>
<div style="background-color: yellow; font-weight: bolder;"></div>
<div style="background-color: yellow; font-weight: bolder;"></div>
<div style="background-color: yellow; font-weight: bolder;"></div>
```

Also the object properties can be a `function`

remove the previous code snippet and Add this `Baby Query` code in the js file

```javascript
$('div').css({
  width: function (index, value) {
    return parseFloat(value) * index
  },
  height: function (index, value) {
    return parseFloat(value) * index
  }
})
```

this code will set the `width` and `height` property of each `div` elements.

Now the html will look like below:

```html
<div style="background-color: blue; width: 0px; height: 0px;"></div>
<div style="background-color: rgb(15, 99, 30); width: 60px; height: 60px;"></div>
<div style="background-color: rgb(18, 52, 86); width: 120px; height: 120px;"></div>
<div style="background-color: rgb(255, 17, 17); width: 180px; height: 180px;"></div>
```

Also current element can be access from inside this `functions` using the `this` keyword.

remove the previous code snippet and Add this `Baby Query` code in the js file

```javascript
$('div').css({
  width: function (index, value) {
    const width = parseFloat(value) * index
    this.textContent = `width is ${width}`
    return width
  },
  height: function (index, value) {
    const height = parseFloat(value) * index
    this.textContent = `width is ${height}`
    return height
  }
})
```

this code will set the `width`, `height` property and the `textContent` of each `div` elements.

Now the html will look like below:

```html
<div style="background-color: blue; width: 0px; height: 0px;">width is 0</div>
<div style="background-color: rgb(15, 99, 30); width: 60px; height: 60px;">width is 60</div>
<div style="background-color: rgb(18, 52, 86); width: 120px; height: 120px;">width is 120</div>
<div style="background-color: rgb(255, 17, 17); width: 180px; height: 180px;">width is 180</div>
```
