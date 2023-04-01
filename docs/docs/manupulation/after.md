# .after()

Insert content, specified by the parameter, after each element in the set of matched elements.

## Method Details

| Method Call               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .after(content,[content]) | <b>content</b> <br>Type: htmlString or Element or Text or Array or BabyQuery.<br>HTML string, DOM element, text node, array of elements and text nodes, or BabyQuery object to insert after each element in the set of matched elements.<hr><b>content</b><br>Type: htmlString or Element or Text or Array or BabyQuery <br>One or more additional DOM elements, text nodes, arrays of elements and text nodes, HTML strings, or BabyQuery objects to insert after each element in the set of matched elements. |
| .after(function)          | <b>function</b><br>Type: Function( Integer index ) => htmlString or Element or Text or BabyQuery<br>A function that returns an HTML string, DOM element(s), text node(s), or BabyQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.                                                                                                                |
| .after(function-html)     | <b>function-html</b><br>Type: Function( Integer index, String html ) => htmlString or Element or Text or BabyQuery<br>A function that returns an HTML string, DOM element(s), text node(s), or BabyQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.                                                          |

Using the following HTML:

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

Content can be created and then inserted after several elements at once:

```javascript
$('.inner').after('<p>Test</p>')
```

Each inner `<div>` element gets this new content:

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <p>Test</p>
  <div class="inner">Goodbye</div>
  <p>Test</p>
</div>
```

An element in the DOM can also be selected and inserted after another element:

```javascript
$('.container').after($('h2'))  
```

If an element selected this way is inserted into a single location elsewhere in the DOM, it will be moved rather than cloned:

```html
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
<h2>Greetings</h2>
```

> Important: If there is more than one target element, however, cloned copies of the inserted element will be created for each target except for the last one.

## Passing a Function

As of BabyQuery `.after()` supports passing a function that returns the elements to insert.

```javascript
$('p').after(function () {
  return '<div>' + this.className + '</div>'
})
```

This example inserts a `<div>` after each paragraph, with each new `<div>` containing the class name(s) of its preceding paragraph.

## Additional Arguments

Similar to other content-adding methods such as `.prepend()`, `.after()` also supports passing in multiple arguments as input. Supported input includes DOM elements, BabyQuery objects, HTML strings, and arrays of DOM elements.

For example, the following will insert two new `<div>`s and an existing `<div>` after the first paragraph:

```javascript
var $newdiv1 = $("<div id='object1'></div>"),
  newdiv2 = document.createElement('div'),
  existingdiv1 = document.getElementById('foo')

$('p').after($newdiv1, [newdiv2, existingdiv1])
```

Since `.after()` can accept any number of additional arguments, the same result can be achieved by passing in the three `<div>`s as three separate arguments, like so: `$( "p" ).first().after( $newdiv1, newdiv2, existingdiv1 )`. The type and number of arguments will largely depend on the elements that are collected in the code.

<!-- Additional Notes:
Prior to BabyQuery 1.9, .after() would attempt to add or change nodes in the current BabyQuery set if the first node in the set was not connected to a document, and in those cases return a new BabyQuery set rather than the original set. The method might or might not have returned a new result depending on the number or connectedness of its arguments! As of BabyQuery 1.9, .after(), .before(), and .replaceWith() always return the original unmodified set. Attempting to use these methods on a node without a parent has no effect—that is, neither the set nor the nodes it contains are changed.
By design, any BabyQuery constructor or method that accepts an HTML string — BabyQuery(), .append(), .after(), etc. — can potentially execute code. This can occur by injection of script tags or use of HTML attributes that execute code (for example, <img onload="">). Do not use these methods to insert strings obtained from untrusted sources such as URL query parameters, cookies, or form inputs. Doing so can introduce cross-site-scripting (XSS) vulnerabilities. Remove or escape any user input before adding content to the document. -->

## Examples:

Inserts a DOM element after all paragraphs.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>after demo</title>
    <style>
      p {
        background: yellow;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>I would like to say:</p>

    <script>
      $('p').after('<b>Hello</b>')
    </script>
  </body>
</html>
```

Inserts a BabyQuery object (similar to an Array of DOM Elements) after all paragraphs.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>after demo</title>
    <style>
      p {
        background: yellow;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <b>Hello</b>
    <p>I would like to say:</p>

    <script>
      $('p').after($('b'))
    </script>
  </body>
</html>
```
