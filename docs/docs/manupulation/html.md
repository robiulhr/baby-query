# .html()

Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.

## Method Details

| Method Call         | Description                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .html()             | This method does not accept any arguments.                                                                                                                                                                                                                                                                                                                                                                                  |
| .html( htmlString ) | <b>htmlString</b><br>Type: htmlString<br>A string of HTML to set as the content of each matched element.                                                                                                                                                                                                                                                                                                                    |
| .html( function )   | <b>function</b><br>Type: Function( Integer index, htmlString oldhtml ) => htmlString<br>A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. BabyQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set. |

<!-- > This method is not available on XML documents. -->

In an HTML document, `.html()` can be used to get the contents of any element. If the selector expression matches more than one element, only the first match will have its HTML content returned. Consider this code:

```javascript
$('div.demo-container').html()
```

In order for the following `<div>`'s content to be retrieved, it would have to be the first one with `class="demo-container"` in the document:

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
</div>
```

The result would look like this:

```html
<div class="demo-box">Demonstration Box</div>
```

This method uses the browser's innerHTML property. Some browsers may not return HTML that exactly replicates the HTML source in an original document. For example, Internet Explorer sometimes leaves off the quotes around attribute values if they contain only alphanumeric characters.

<!-- ## Additional Notes:

By design, any BabyQuery constructor or method that accepts an HTML string — BabyQuery(), .append(), .after(), etc. — can potentially execute code. This can occur by injection of script tags or use of HTML attributes that execute code (for example, <img onload="">). Do not use these methods to insert strings obtained from untrusted sources such as URL query parameters, cookies, or form inputs. Doing so can introduce cross-site-scripting (XSS) vulnerabilities. Remove or escape any user input before adding content to the document. -->

## Examples:

Click a paragraph to convert it from html to text.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>html demo</title>
    <style>
      p {
        margin: 8px;
        font-size: 20px;
        color: blue;
        cursor: pointer;
      }
      b {
        text-decoration: underline;
      }
      button {
        cursor: pointer;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p><b>Click</b> to change the <span id="tag">html</span></p>
    <p>to a <span id="text">text</span> node.</p>
    <p>This <button name="nada">button</button> does nothing.</p>

    <script>
      $('p').on('click', function () {
        var htmlString = $(this).html()
        $(this).text(htmlString)
      })
    </script>
  </body>
</html>
```

When `.html()` is used to set an element's content, any content that was in that element is completely replaced by the new content. Additionally, BabyQuery removes other constructs such as data and event handlers from child elements before replacing those elements with the new content.

Consider the following HTML:

```html
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
</div>
```

The content of `<div class="demo-container">` can be set like this:

```javascript
$('div.demo-container').html('<p>All new content. <em>You bet!</em></p>')
```

That line of code will replace everything inside `<div class="demo-container">`:

```html
<div class="demo-container">
  <p>All new content. <em>You bet!</em></p>
</div>
```

As of BabyQuery, the `.html()` method allows the HTML content to be set by passing in a function.

```javascript
$('div.demo-container').html(function () {
  var emphasis = '<em>' + $('p').length + ' paragraphs!</em>'
  return '<p>All new content for ' + emphasis + '</p>'
})
```

Given a document with six paragraphs, this example will set the HTML of `<div class="demo-container"> to <p>All new content for <em>6 paragraphs!</em></p>`.

This method uses the browser's innerHTML property. Some browsers may not generate a DOM that exactly replicates the HTML source provided. For example, Internet Explorer prior to version 8 will convert all href properties on links to absolute URLs, and Internet Explorer prior to version 9 will not correctly handle HTML5 elements without the addition of a separate compatibility layer.

To set the content of a `<script>` element, which does not contain HTML, use the `.text()` method and not `.html()`.

<!-- Note: In Internet Explorer up to and including version 9, setting the text content of an HTML element may corrupt the text nodes of its children that are being removed from the document as a result of the operation. If you are keeping references to these DOM elements and need them to be unchanged, use .empty().html( string ) instead of .html(string) so that the elements are removed from the document before the new string is assigned to the element. -->

Add some html to each div.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>html demo</title>
    <style>
      .red {
        color: red;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <span>Hello</span>
    <div></div>
    <div></div>
    <div></div>

    <script>
      $('div').html("<span class='red'>Hello <b>Again</b></span>")
    </script>
  </body>
</html>
```

Add some html to each div then immediately do further manipulations to the inserted html.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>html demo</title>
    <style>
      div {
        color: blue;
        font-size: 18px;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <div></div>
    <div></div>
    <div></div>

    <script>
      $('div').html('<b>Wow!</b> Such excitement...')
      $('div b').append('<div>child element</div>').css('color', 'red')
    </script>
  </body>
</html>
```
