# .ready()

Specify a function to execute when the DOM is fully loaded.

## Method Details

| Method Call       | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| .ready( handler ) | <b>propertyName</b> <br>Type: Function()<br>A function to execute after the DOM is ready. |
|                   |

The `.ready()` method offers a way to run JavaScript code as soon as the page's Document Object Model (DOM) becomes safe to manipulate. This will often be a good time to perform tasks that are needed before the user views or interacts with the page, for example to add event handlers and initialize plugins. When multiple functions are added via successive calls to this method, they run when the DOM is ready in the order in which they are added.

<!-- As of BabyQuery 3.0, BabyQuery ensures that an exception occuring in one handler does not prevent subsequently added handlers from executing. -->

Most browsers provide similar functionality in the form of a DOMContentLoaded event. However, BabyQuery's `.ready()` method differs in an important and useful way: If the DOM becomes ready and the browser fires `DOMContentLoaded` before the code calls `.ready( handler )`, the function handler will still be executed. In contrast, a `DOMContentLoaded` event listener added after the event fires is never executed.

Browsers also provide the load event on the `window` object. When this event fires it indicates that all assets on the page have loaded, including images. This event can be watched in BabyQuery using `$( window ).on( "load", handler )`. In cases where code relies on loaded assets (for example, if the dimensions of an image are required), the code should be placed in a handler for the load event instead.

<!-- Note that although the DOM always becomes ready before the page is fully loaded, it is usually not safe to attach a load event listener in code executed during a `.ready()` handler. For example, scripts can be loaded dynamically long after the page has loaded using methods such as $.getScript(). Although handlers added by .ready() will always be executed in a dynamically loaded script, the window's load event has already occurred and those listeners will never run. -->

BabyQuery offers several ways to attach a function that will run when the DOM is ready. All of the following syntaxes are equivalent:

- `$( handler )`

- `$( document ).ready( handler ) $( "document" ).ready( handler )`

- `$( "img" ).ready( handler ) $().ready( handler )` As of BabyQuery, only the first syntax is recommended; the other syntaxes still work but not recomended.

<!-- This is because the selection has no bearing on the behavior of the .ready() method, which is inefficient and can lead to incorrect assumptions about the method's behavior. For example, the third syntax works with "document" which selects nothing. The fourth syntax waits for the document to be ready but implies (incorrectly) that it waits for images to become ready. -->

There is also `$(document).on( "ready", handler )`, deprecated as of BabyQuery and removed in BabyQuery. Note that if the DOM becomes ready before this event is attached, the handler will not be executed.

The `.ready()` method is typically used with an anonymous function:

`$( document ).ready(function() { // Handler for .ready() called. });`

Which is equivalent to the recommended way of calling:

```javascript
$(function() { // Handler for .ready() called. });
```

<!-- Aliasing the BabyQuery Object When $.noConflict() is used to avoid namespace conflicts, the $ shortcut is no longer available. However, the .ready() handler is passed a reference to the BabyQuery object that called the method. This allows the handler to use a BabyQuery object, for example as $, without knowing its aliased name:

```javascript
jq2 = BabyQuery.noConflict()
jq2(function ($) {
  // Code using $ as usual goes here; the actual BabyQuery object is jq2
})
``` -->

## Example:

Display a message when the DOM is loaded.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>ready demo</title>
    <style>
      p {
        color: red;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
    <script>
      $(function () {
        console.log('hello world from BabyQuery')
        $('p').text('The DOM is now loaded and can be manipulated.')
      })
      console.log('hello world')
    </script>
  </head>
  <body>
    <p>Not loaded yet.</p>
  </body>
</html>
```
