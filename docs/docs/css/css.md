# .css()

Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.

| Method Call                                                    | Description                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [.css(propertyName)](#css-propertyname-and-css-propertynames)  | <b>propertyName</b> <br>Type: String A CSS property.                                                                                                                                                                                                                                                                |
| [.css(propertyNames)](#css-propertyname-and-css-propertynames) | <b>propertyNames</b><br>Type: Array<br>An array of one or more CSS properties.                                                                                                                                                                                                                                      |
| [.css(propertyName,value)](#css-propertyname-value)            | <b>propertyName</b><br>Type: String<br>A CSS property name.<br><b>value</b><br>Type: String or Number <br>A value to set for the property.                                                                                                                                                                          |
| .css(propertyName,function)                                 | <b>propertyName</b><br>Type: String<br>A CSS property name. <br> <b>function</b> <br>Type: Function( Integer index, String value ) => String or Number<br>A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments. |
| .css(properties)                                             | <b>properties</b><br>Type: PlainObject<br> An object of property-value pairs to set.                                                                                                                                                                                                                                |

### Code Examples

Few Example for .css() method

###### .css(propertyName) and .css(propertyNames)

Get the css property value using the .css() method.

Html code

```html
<style>
  div {
    width: 60px;
    height: 60px;
    margin: 5px;
    float: left;
  }</style
><span id="result">&nbsp;</span>
<div style="background-color: blue"></div>
<div style="background-color: rgb(15, 99, 30)"></div>
<div style="background-color: #123456"></div>
<div style="background-color: #f11"></div>
```

Baby Query code

```javascript
console.log($('div').css('background-color'))
```

Check the console now. output will be:

```
'rgb(0, 0, 255)'
```

Now add this Baby Query code

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

###### .css(propertyName,value)

Set the css property value using the .css() method.

Now add this code to the js file

```javascript
$('div').css('background', 'red')
```

Each div `background-color` will be changed to `red`

```html
<style>
  div {
    width: 60px;
    height: 60px;
    margin: 5px;
    float: left;
  }</style
><span id="result">&nbsp;</span>
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


###### .css(propertyName,function) 
