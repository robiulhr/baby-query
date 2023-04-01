# .css()

Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.

## Method Details

| Method Call                 | Description                                                                                                                                                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .css(propertyName)          | <b>propertyName</b> <br>Type: String A CSS property.                                                                                                                                                                                                                                                                   |
| .css(propertyNames)         | <b>propertyNames</b><br>Type: Array<br>An array of one or more CSS properties.                                                                                                                                                                                                                                         |
| .css(propertyName,value)    | <b>propertyName</b><br>Type: String<br>A CSS property name.<br><hr><b>value</b><br>Type: String or Number <br>A value to set for the property.                                                                                                                                                                         |
| .css(propertyName,function) | <b>propertyName</b><br>Type: String<br>A CSS property name. <br><hr><b>function</b> <br>Type: Function( Integer index, String value ) => String or Number<br>A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments. |
| .css(properties)            | <b>properties</b><br>Type: PlainObject<br> An object of property-value pairs to set.                                                                                                                                                                                                                                   |

The `.css()` method is a convenient way to get a computed style property from the first matched element.

<!-- especially in light of the different ways browsers access most of those properties (the `getComputedStyle()` method in standards-based browsers versus the currentStyle and runtimeStyle properties in Internet Explorer prior to version 9) and the different terms browsers use for certain properties. For example, Internet Explorer's DOM implementation refers to the float property as styleFloat, while W3C standards-compliant browsers refer to it as cssFloat. For consistency, you can simply use "float", and BabyQuery will translate it to the correct value for each browser. -->

Also, BabyQuery can equally interpret the CSS and DOM formatting of multiple-word properties. For example, BabyQuery understands and returns the correct value for both `.css( "background-color" )` and `.css( "backgroundColor" )`. This means mixed case has a special meaning, `.css( "WiDtH" )` won't do the same as `.css( "width" )`, for example.

<!-- > Note that the computed style of an element may not be the same as the value specified for that element in a style sheet. For example, computed styles of dimensions are almost always pixels, but they can be specified as em, ex, px or % in a style sheet. Different browsers may return CSS color values that are logically but not textually equal, e.g., `#FFF`, `#ffffff`, and `rgb(255,255,255)`. -->

Retrieval of shorthand CSS properties (e.g., `margin`, `background`, `border`), although functional with some browsers, is not guaranteed. For example, if you want to retrieve the rendered `border-width`, use: `$(elem).css("borderTopWidth"), $(elem).css("borderBottomWidth")`, and so on.

An element should be connected to the DOM when calling `.css()` on it. If it isn't, BabyQuery may throw an error.

As of BabyQuery, passing an array of style properties to `.css()` will result in an object of property-value pairs. For example, to retrieve all four rendered `border-width` values, you could use `$(elem).css(["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"])`.

<!-- As of BabyQuery, CSS Custom Properties (also called CSS Variables) are supported: `$("p").css("--custom-property")`. Note that you need to provide the property name as-is, camelCasing it won't work as it does for regular CSS properties. -->

## Examples:

Get the background color of a clicked div.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      div {
        width: 60px;
        height: 60px;
        margin: 5px;
        float: left;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <span id="result">&nbsp;</span>
    <div style="background-color:blue;"></div>
    <div style="background-color:rgb(15,99,30);"></div>
    <div style="background-color:#123456;"></div>
    <div style="background-color:#f11;"></div>

    <script>
      $('div').on('click', function () {
        var color = $(this).css('background-color')
        $('#result').html("<span style='color:" + color + ";'>" + 'That div is ' + color + '</span>')
      })
    </script>
  </body>
</html>
```

Get the width, height, text color, and background color of a clicked div.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      div {
        height: 50px;
        margin: 5px;
        padding: 5px;
        float: left;
      }
      #box1 {
        width: 50px;
        color: yellow;
        background-color: blue;
      }
      #box2 {
        width: 80px;
        color: rgb(255, 255, 255);
        background-color: rgb(15, 99, 30);
      }
      #box3 {
        width: 40px;
        color: #fcc;
        background-color: #123456;
      }
      #box4 {
        width: 70px;
        background-color: #f11;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p id="result">&nbsp;</p>
    <div id="box1">1</div>
    <div id="box2">2</div>
    <div id="box3">3</div>
    <div id="box4">4</div>

    <script>
      $('div').on('click', function () {
        var html = ['The clicked div has the following styles:']

        var styleProps = $(this).css(['width', 'height', 'color', 'background-color'])
        console.log(styleProps)
        for (let item in styleProps) {
          html.push(item + ': ' + styleProps[item])
        }
        $('#result').html('<br>' + html + '</br>')
      })
    </script>
  </body>
</html>
```

`.css()` allows us to pass a function as the property value:

```javascript
$('div.example').css('width', function (index) {
  return index * 50
})
```

This example sets the widths of the matched elements to incrementally larger values.

Change the color of any paragraph to red on mouseover event.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      p {
        color: blue;
        width: 200px;
        font-size: 14px;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>Just roll the mouse over me.</p>

    <p>Or me to see a color change.</p>

    <script>
      $('p').on('mouseover', function () {
        $(this).css('color', 'red')
      })
    </script>
  </body>
</html>
```

Increase the width of #box by 200 pixels the first time it is clicked.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      #box {
        background: black;
        color: snow;
        width: 100px;
        padding: 10px;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <div id="box">Click me to grow</div>

    <script>
      $('#box').on('click', function () {
        $(this).css('width', '+=200')
      })
    </script>
  </body>
</html>
```

Highlight a clicked word in the paragraph.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      p {
        color: blue;
        font-weight: bold;
        cursor: pointer;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>Once upon a time there was a man who lived in a pizza parlor. This man just loved pizza and ate it all the time. He went on to be the happiest man in the world. The end.</p>

    <script>
      var words = $('p').text().split(/\s+/)
      var text = words.join('</span> <span>')
      $('p').html('<span>' + text + '</span>')
      $('span').on('click', function () {
        $(this).css('background-color', 'yellow')
      })
    </script>
  </body>
</html>
```

Change the font weight and background color on mouseenter and mouseleave.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      p {
        color: green;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>Move the mouse over a paragraph.</p>
    <p>Like this one or the one above.</p>

    <script>
      $('p')
        .on('mouseenter', function () {
          $(this).css({
            'background-color': 'yellow',
            'font-weight': 'bolder'
          })
        })
        .on('mouseleave', function () {
          var styles = {
            backgroundColor: '#ddd',
            fontWeight: ''
          }
          $(this).css(styles)
        })
    </script>
  </body>
</html>
```

Increase the size of a div when you click it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>css demo</title>
    <style>
      div {
        width: 60px;
        height: 45px;
        margin: 30px;
        background-color: #f33;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <div>click</div>
    <div>click</div>

    <script>
      $('div').on('click', function () {
        $(this).css({
          width: function (index, value) {
            return parseFloat(value) * 1.2
          },
          height: function (index, value) {
            return parseFloat(value) * 1.2
          }
        })
      })
    </script>
  </body>
</html>
```
