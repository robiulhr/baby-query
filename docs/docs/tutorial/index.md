## Adding Baby Query

To begin, make an HTML file and save it as `index.html`.

copy the started markup below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Baby Query Demo</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body></body>
</html>
```

Link to the Baby Query CDN right before the closing `</body>` tag.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Baby Query Demo</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/baby-query@1.0.5/dist/babyQuery.js"></script>
    <script src="js/scripts.js"></script>
  </body>
</html>
```

> Note: Your JavaScript file (scripts.js) must be included below the Baby Query library in the document or it will not work.

At this point, the Baby Query library is now being loaded into your site, and you have full access to the Baby Query API.

## Using Baby Query

By comparing a simple `“Hello, World!”` program in both JavaScript and Baby Query, you can see the difference of how they’re both written.

```javascript
// JavaScript
document.getElementById('demo').innerHTML = 'Hello, World!'
```

```javascript
// Baby Query
$('#demo').html('Hello, World!')
```

This example shows how Baby Query can achieve the same result as plain JavaScript in a simpler way.

Create the file `scripts.js` in your `js/` directory, and type the following Baby Query code:

```javascript
$(document).ready(function () {
  // all custom Baby Query will go here
})
```

All Baby Query code you write will be wrapped in the above code. Baby Query will detect this state of readiness so that code included inside this function will only run once the DOM is ready for JavaScript code to execute. Even if in some cases JavaScript won’t be loaded until elements are rendered, including this block is recomended to use on your code.

In the introduction of this article, you saw a simple “Hello, World!” script. To initiate this script and print text to the browser with Baby Query, first you’ll create an empty block-level paragraph element with the ID demo applied to it:

```html
<body>
  <p id="demo"></p>
</body>
```

Baby Query is called with and represented by the dollar sign `($)`. You access the DOM with Baby Query using mostly CSS syntax, and apply an action with a method. A basic Baby Query example follows this format:

```javascript
$('selector').method()
```

Since an ID is represented by a hash symbol `(#)` in CSS, you will access the demo ID with the selector `#demo`. html() is a method that changes the HTML within an element.

You’re now going to put your custom `“Hello, World!”` program inside the Baby Query `ready()` wrapper. Add this line to your `scripts.js` file within the existing function:

```javascript
$(document).ready(function () {
  $('#demo').html('Hello, World!')
})
```

Once you’ve saved the file, you can open your `index.html` file in your browser. If everything works properly, you will see the output `Hello, World!`.

## Selectors

Selectors are how you tell Baby Query which elements you want to work on. Most Baby Query selectors are the same as what you’re familiar with in CSS, with a few Baby Query-specific additions.

To access a selector, use the Baby Query symbol `$`, followed by parentheses `()`:

```
$("selector")
```

Below is a brief overview of some of the selectors.

- `$("*")` Wildcard: This selects every element on the page.

- `$(this)` Current: This selects the current element being operated on within a function.

- `$("p")` Tag: This selects every instance of the `<p>` tag.

- `$(".example")` Class: This selects every element that has the example class applied to it.

- `$("#example")` Id: This selects a single instance of the unique example id.

- `$("[type='text']")` Attribute: This selects any element with text applied to the type attribute.

- `$("p:first-of-type")` Pseudo Element: This selects the first `<p>`.

Generally, classes and ids are what you will encounter the most — classes when you want to select multiple elements, and ids when you want to select only one.

### Baby Query Events

In the `“Hello, World!”` example, the code ran as soon as the page loaded and the document was ready, and therefore required no user interaction. In this case, you could have written the text directly into the HTML without bothering with Baby Query. However, you will need to utilize Baby Query if you want to make text appear on the page with the click of a button.

Return to your `index.html` file and add a `<button>` element. You will use this button to listen for your click event:

```html
<body>
  <button id="trigger">Click me</button>
  <p id="demo"></p>
</body>
```

You will use the `on("click")` method to call a function containing your `“Hello, World!”` code:

```javascript
$(document).ready(function () {
  $('#trigger').on('click')
})
```

Your `<button>` element has an ID called trigger, which you select with `$("#trigger")`. By adding `on("click")`, you’re telling it to listen for a click event, but you’re not done yet. Now you’ll invoke a function that contains your code, inside the `on("click")` method:

```javascript
function() {
    $("#demo").html("Hello, World!");
}
```

Here’s the final code:

```javascript
$(document).ready(function () {
  $('#trigger').on('click', function () {
    $('#demo').html('Hello, World!')
  })
})
```

Save the `scripts.js` file, and refresh `index.html` in the browser. Now when you click the button, the `“Hello, World!”` text will appear.

An event is any time the user interacts with the browser. Usually this is done with the mouse or keyboard. The example you just created used a click event. Using `on()` you can create any kind method just passing the name of the event as the first argument of `on()` method.

- on("click",function(){}) Click: This executes on a single mouse click.

- hover("hover",function(){}): This executes when the mouse is hovered over an element.

- on("mouseenter",function(){}) and mouseleave() apply only to the mouse entering or leaving an element, respectively.

- submit("submit",funciton(){}) Submit: This executes when a form is submitted.

- scroll("scroll",function(){}) Scroll: This executes when the screen is scrolled.

- keydown("keydown",funciton(){}) Keydown: This executes when you press down on a key on the keyboard.

Understanding events is essential to creating dynamic website content with Baby Query.
