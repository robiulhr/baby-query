# .append()

Insert content, specified by the parameter, to the end of each element in the set of matched elements.

## Method Details

| Method Call                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .append( content [, content ] ) | <b>content</b> <br>Type: htmlString or Element or Text or Array or BabyQuery<br>DOM element, text node, array of elements and text nodes, HTML string, or BabyQuery object to insert at the end of each element in the set of matched elements.<hr><b>content</b> <br>Type: htmlString or Element or Text or Array or BabyQuery<br>One or more additional DOM elements, text nodes, arrays of elements and text nodes, HTML strings, or BabyQuery objects to insert at the end of each element in the set of matched elements. |
| .append( function )             | <b>function</b><br>Type: Function( Integer index, String html ) => htmlString or Element or Text or BabyQuery<br>A function that returns an HTML string, DOM element(s), text node(s), or BabyQuery object to insert at the end of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.                                                                  |

The `.append()` method inserts the specified content as the last child of each element in the BabyQuery collection (To insert it as the first child, use `.prepend()`).

<!-- The .append() and .appendTo() methods perform the same task. The major difference is in the syntax-specifically, in the placement of the content and target. With .append(), the selector expression preceding the method is the container into which the content is inserted. With .appendTo(), on the other hand, the content precedes the method, either as a selector expression or as markup created on the fly, and it is inserted into the target container. -->

Consider the following HTML:

```html
<h2>Greetings</h2>
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

You can create content and insert it into several elements at once:

```javascript
$('.inner').append('<p>Test</p>')
```

Each inner `<div>` element gets this new content:

```html
<h2>Greetings</h2>
<div class="container">
  <div class="inner">
    Hello
    <p>Test</p>
  </div>
  <div class="inner">
    Goodbye
    <p>Test</p>
  </div>
</div>
```

You can also select an element on the page and insert it into another:

```javascript
$('.container').append($('h2'))
```

If an element selected this way is inserted into a single location elsewhere in the DOM, it will be moved into the target (not cloned):

```html
<div class="container">
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
  <h2>Greetings</h2>
</div>
```

> Important: If there is more than one target element, however, cloned copies of the inserted element will be created for each target except for the last one.

## Additional Arguments

Similar to other content-adding methods such as `.prepend()` `.append()` also supports passing in multiple arguments as input. Supported input includes DOM elements, BabyQuery objects, HTML strings, and arrays of DOM elements.

For example, the following will insert two new `<div>`s and an existing `<div>` as the last three child nodes of the body:

```javascript
var $newdiv1 = $("<div id='object1'></div>"),
  newdiv2 = document.createElement('div'),
  existingdiv1 = document.getElementById('foo')

$('body').append($newdiv1, [newdiv2, existingdiv1])
```

Since `.append()` can accept any number of additional arguments, the same result can be achieved by passing in the three `<div>`s as three separate arguments, like so: `$('body').append( $newdiv1, newdiv2, existingdiv1 )`. The type and number of arguments will largely depend on how you collect the elements in your code.

<!-- Additional Notes:
By design, any jQuery constructor or method that accepts an HTML string — jQuery(), .append(), .after(), etc. — can potentially execute code. This can occur by injection of script tags or use of HTML attributes that execute code (for example, <img onload="">). Do not use these methods to insert strings obtained from untrusted sources such as URL query parameters, cookies, or form inputs. Doing so can introduce cross-site-scripting (XSS) vulnerabilities. Remove or escape any user input before adding content to the document.
jQuery doesn't officially support SVG. Using jQuery methods on SVG documents, unless explicitly documented for that method, might cause unexpected behaviors. Examples of methods that support SVG as of jQuery 3.0 are addClass and removeClass. -->

## Examples:

Appends some HTML to all paragraphs.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>append demo</title>
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
      $('p').append('<strong>Hello</strong>')
    </script>
  </body>
</html>
```

<!--
Appends an Element to all paragraphs.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>append demo</title>
  <style>
  p {
    background: yellow;
  }
  </style>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>
<body>

<p>I would like to say: </p>

<script>
$( "p" ).append( document.createTextNode( "Hello" ) );
</script>

</body>
</html>
``` -->

Appends a jQuery object (similar to an Array of DOM Elements) to all paragraphs.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>append demo</title>
    <style>
      p {
        background: yellow;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <strong>Hello world!!!</strong>
    <p>I would like to say:</p>

    <script>
      $('p').append($('strong'))
    </script>
  </body>
</html>
```
