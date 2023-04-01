# .text()

Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

## Method Details

| Method Call       | Description                                                                                                                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .text()           | This method does not accept any arguments.                                                                                                                                                                            |
| .text( text )     | <b>text</b><br>Type: String or Number or Boolean<br>The text to set as the content of each matched element. When Number or Boolean is supplied, it will be converted to a String representation.                      |
| .text( function ) | <b>function</b><br>Type: Function( Integer index, String text ) => String<br>A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments. |

<!-- Unlike the `.html()` method, `.text()` can be used in both XML and HTML documents.  -->

The result of the `.text()` method is a string containing the combined text of all matched elements. (Due to variations in the HTML parsers in different browsers, the text returned may vary in newlines and other white space.) Consider the following HTML:

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
  <ul>
    <li>list item 1</li>
    <li>list <strong>item</strong> 2</li>
  </ul>
</div>
```

The code `$( "div.demo-container" ).text()` would produce the following result:

```
'\n      Demonstration Box\n      \n        list item 1\n        list item 2\n      \n    '
```

<!-- The `.text()` method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the .val() method. To get the value of a script element, use the .html() method. -->

<!-- As of jQuery 1.4, the .text() method returns the value of text and CDATA nodes as well as element nodes. -->

We need to be aware that this method escapes the string provided as necessary so that it will render correctly in HTML. To do so, it calls the DOM method `.createTextNode()`, does not interpret the string as HTML. Consider the following HTML:

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
  <ul>
    <li>list item 1</li>
    <li>list <strong>item</strong> 2</li>
  </ul>
</div>
```

The code `$( "div.demo-container" ).text( "<p>This is a test.</p>" )`; will produce the following DOM output:

```html
<div class="demo-container">&lt;p&gt;This is a test.&lt;/p&gt;</div>
```

It will appear on a rendered page as though the tags were exposed, like this:

```
<p>This is a test</p>
```

<!-- The `.text()` method cannot be used on input elements. For input field text, use the .val() method. -->

As of BabyQuery, the .text() method allows us to set the text content by passing in a function.

```javascript
$('ul li').text(function (index) {
  return 'item number ' + (index + 1)
})
```

Given an unordered list with three `<li>` elements, this example will produce the following DOM output:

```html
<ul>
  <li>item number 1</li>
  <li>item number 2</li>
  <li>item number 3</li>
</ul>
```

## Example:

Find the text in the first paragraph (stripping out the html), then set the html of the last paragraph to show it is just text (the red bold is gone).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>text demo</title>
    <style>
      p {
        color: blue;
        margin: 8px;
      }
      b {
        color: red;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p><b>Test</b> Paragraph.</p>
    <p></p>

    <script>
      var str = $('p').text()
      $('p').text(str + 'customized')
    </script>
  </body>
</html>
```

Add text to the paragraph (notice the bold tag is escaped).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>text demo</title>
    <style>
      p {
        color: blue;
        margin: 8px;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>Test Paragraph.</p>

    <script>
      $('p').text('<b>Some</b> new text.')
    </script>
  </body>
</html>
```
