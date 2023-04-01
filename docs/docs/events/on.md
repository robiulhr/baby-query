# .on()

Attach an event handler function for one or more events to the selected elements.

## Method Details

| Method Call | Description |
| --- | --- |
| .on( events [, selector ] [, data ], handler )| <b>events</b> <br>Type: String<br> One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".<br><hr><b>selector</b> <br>Type: String<br>A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.<br><hr><b>data</b> <br>Type: Anything <br>Data to be passed to the handler in event.data when an event is triggered.<br><hr><b>handler</b><br>Type: Function( Event eventObject [, Anything extraParameter ] [, ... ] )<br>A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false. |
|.on( events [, selector ] [, data ] )| <b>events</b> <br>Type: PlainObject<br> An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).<br><hr><b>selector</b> <br>Type: String<br>A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.<br><hr><b>data</b> <br>Type: Anything <br>Data to be passed to the handler in event.data when an event occurs. |

The .on() method attaches event handlers to the currently selected set of elements in the BabyQuery object. The .on() method provides all functionality required for attaching event handlers.

## Event names and namespaces

Any event names can be used for the events argument. BabyQuery will pass through the browser's standard JavaScript event types, calling the handler function when the browser generates events due to user actions such as click. In addition, the `.trigger()` method can trigger both standard browser event names and custom event names to call attached handlers. Event names should only contain alphanumerics, underscore, and colon characters.

An event name can be qualified by event namespaces that simplify removing or triggering the event. For example, `"click.myPlugin.simple"` defines both the myPlugin and simple namespaces for this particular click event.

<!-- A click event handler attached via that string could be removed with .off("click.myPlugin") or .off("click.simple") without disturbing other click handlers attached to the elements. Namespaces are similar to CSS classes in that they are not hierarchical; only one name needs to match. Namespaces should contain upper/lowercase letters and digits only. -->

In the second form of `.on()`, the events argument is a plain object. The keys are strings in the same form as the events argument with space-separated event type names and optional namespaces. The value for each key is a function (or false value) that is used as the handler instead of the final argument to the method. In other respects, the two forms are identical in their behavior as described below.

## Direct and delegated event handlers

The majority of browser events bubble, or propagate, from the deepest, innermost element (the event target) in the document where they occur all the way up to the body and the document element.

<!-- In Internet Explorer 8 and lower, a few events such as change and submit do not natively bubble but BabyQuery patches these to bubble and create consistent cross-browser behavior. -->

If selector is omitted or is null, the event handler is referred to as direct or directly-bound. The handler is called every time an event occurs on the selected elements, whether it occurs directly on the element or bubbles from a descendant (inner) element.

When a selector is provided, the event handler is referred to as delegated. The handler is not called when the event occurs directly on the bound element, but only for descendants (inner elements) that match the selector. BabyQuery bubbles the event from the event target up to the element where the handler is attached (i.e., innermost to outermost element) and runs the handler for any elements along that path matching the selector.

<b>Event handlers are bound only to the currently selected elements; they must exist at the time your code makes the call to `.on()`.</b> To ensure the elements are present and can be selected, place scripts after the elements in the HTML markup or perform event binding inside a document ready handler. Alternatively, use delegated event handlers to attach event handlers.

<b>Delegated event handlers</b> have the advantage that they can process events from descendant elements that are added to the document at a later time. By picking an element that is guaranteed to be present at the time the delegated event handler is attached, you can use delegated event handlers to avoid the need to frequently attach and remove event handlers. This element could be the container element of a view in a Model-View-Controller design, for example, or document if the event handler wants to monitor all bubbling events in the document. The document element is available in the head of the document before loading any other HTML, so it is safe to attach events there without waiting for the document to be ready.

In addition to their ability to handle events on descendant elements not yet created, another advantage of delegated event handlers is their potential for much lower overhead when many elements must be monitored. On a data table with 1,000 rows in its tbody, this example attaches a handler to 1,000 elements:

```javascript
$('#dataTable tbody tr').on('click', function () {
  console.log($(this).text())
})
```

An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody):

```javascript
$('#dataTable tbody').on('click', 'tr', function () {
  console.log($(this).text())
})
```

<!-- > Note: Delegated event handlers do not work for SVG. -->

## The event handler and its environment

The handler argument is a function (or the value false, see below), and is required unless you pass an object for the events argument. You can provide an anonymous handler function at the point of the `.on()` call, as the examples have done above, or declare a named function and pass its name:

```javascript
function notify() {
  alert('clicked')
}
$('button').on('click', notify)
```

When the browser triggers an event or other JavaScript calls BabyQuery's `.trigger()` method, BabyQuery passes the handler an Event object it can use to analyze and change the status of the event. This object is a normalized subset of data provided by the browser; the browser's unmodified native event object is available in event.originalEvent. For example, event.type contains the event name (e.g., "resize") and event.target indicates the deepest (innermost) element where the event occurred.

By default, most events bubble up from the original event target to the document element. At each element along the way, BabyQuery calls any matching event handlers that have been attached. A handler can prevent the event from bubbling further up the document tree (and thus prevent handlers on those elements from running) by calling `event.stopPropagation()`.

 <!-- Any other handlers attached on the current element will run however. To prevent that, call `event.stopImmediatePropagation()`. (Event handlers bound to an element are called in the same order that they were bound.) -->

Similarly, a handler can call `event.preventDefault()` to cancel any default action that the browser may have for this event; for example, the default action on a click event is to follow the link. Not all browser events have default actions, and not all default actions can be canceled. See the W3C Events Specification for details.

Returning false from an event handler will automatically call `event.stopPropagation()` and `event.preventDefault()`. A false value can also be passed for the handler as a shorthand for `function(){ return false; }`. So, `$( "a.disabled" ).on( "click", false );` attaches an event handler to all links with class "disabled" that prevents them from being followed when they are clicked and also stops the event from bubbling.

When BabyQuery calls a handler, the this keyword is a reference to the element where the event is being delivered; for directly bound events this is the element where the event was attached and for delegated events this is an element matching selector. (Note that this may not be equal to event.target if the event has bubbled from a descendant element.) To create a BabyQuery object from the element so that it can be used with BabyQuery methods, use `$( this )`.

## Passing data to the handler

If a data argument is provided to `.on()` and is not null or undefined, it is passed to the handler in the event.data property each time an event is triggered. The data argument can be any type, but if a string is used the selector must either be provided or explicitly passed as null so that the data is not mistaken for a selector. Best practice is to use a plain object so that multiple values can be passed as properties.

As of BabyQuery, the same event handler can be bound to an element multiple times. This is especially useful when the event.data feature is being used, or when other unique data resides in a closure around the event handler function. For example:

```javascript
function greet(event) {
  alert('Hello ' + event.data.name)
}
$('button').on(
  'click',
  {
    name: 'Karl'
  },
  greet
)
$('button').on(
  'click',
  {
    name: 'Addy'
  },
  greet
)
```

The above code will generate two different alerts when the button is clicked.

As an alternative or in addition to the data argument provided to the `.on()` method, you can also pass data to an event handler using a second argument to `.trigger()`. Data provided this way is passed to the event handler as further parameters after the Event object. If an array was passed to the second argument of `.trigger()`, each element in the array will be presented to the event handler as an individual parameter.

<!-- ### Event performance

In most cases, an event such as click occurs infrequently and performance is not a significant concern. However, high frequency events such as mousemove or scroll can fire dozens of times per second, and in those cases it becomes more important to use events judiciously. Performance can be increased by reducing the amount of work done in the handler itself, caching information needed by the handler rather than recalculating it, or by rate-limiting the number of actual page updates using setTimeout.

Attaching many delegated event handlers near the top of the document tree can degrade performance. Each time the event occurs, BabyQuery must compare all selectors of all attached events of that type to every element in the path from the event target up to the top of the document. For best performance, attach delegated events at a document location as close as possible to the target elements. Avoid excessive use of document or document.body for delegated events on large documents.

BabyQuery can process simple selectors of the form tag#id.class very quickly when they are used to filter delegated events. So, "#myForm", "a.external", and "button" are all fast selectors. Delegated events that use more complex selectors, particularly hierarchical ones, can be several times slower--although they are still fast enough for most applications. Hierarchical selectors can often be avoided simply by attaching the handler to a more appropriate point in the document. For example, instead of $( "body" ).on( "click", "#commentForm .addNew", addComment ) use $( "#commentForm" ).on( "click", ".addNew", addComment ).

 -->

<!-- ### Additional notes

There are shorthand methods for some events such as .click() that can be used to attach or trigger event handlers. For a complete list of shorthand methods, see the events category.

Deprecated in BabyQuery 1.8, removed in 1.9: The name "hover" used as a shorthand for the string "mouseenter mouseleave". It attaches a single event handler for those two events, and the handler must examine event.type to determine whether the event is mouseenter or mouseleave. Do not confuse the "hover" pseudo-event-name with the .hover() method, which accepts one or two functions.

BabyQuery's event system requires that a DOM element allow attaching data via a property on the element, so that events can be tracked and delivered. The object, embed, and applet elements cannot attach data, and therefore cannot have BabyQuery events bound to them.

The focus and blur events are specified by the W3C to not bubble, but BabyQuery defines cross-browser focusin and focusout events that do bubble. When focus and blur are used to attach delegated event handlers, BabyQuery maps the names and delivers them as focusin and focusout respectively. For consistency and clarity, use the bubbling event type names.

In all browsers, the load, scroll, and error events (e.g., on an <img> element) do not bubble. In Internet Explorer 8 and lower, the paste and reset events do not bubble. Such events are not supported for use with delegation, but they can be used when the event handler is directly attached to the element generating the event.

The error event on the window object uses nonstandard arguments and return value conventions, so it is not supported by BabyQuery. Instead, assign a handler function directly to the window.onerror property. -->

<!-- The handler list for an element is set when the event is first delivered. Adding or removing event handlers on the current element won't take effect until the next time the event is handled.  -->
<!-- To prevent any further event handlers from executing on an element within an event handler, call event.stopImmediatePropagation().  -->
<!-- This behavior goes against the W3C events specification. To better understand this case, consider the following code:

```javascript
var $test = $( "#test" );

function handler1() {
  console.log( "handler1" );
  $test.off( "click", handler2 );
}

function handler2() {
  console.log( "handler2" );
}

$test.on( "click", handler1 );
$test.on( "click", handler2 );
```

In the code above, handler2 will be executed anyway the first time even if it's removed using .off(). However, the handler will not be executed the following times the click event is triggered.

Examples: -->

Display a paragraph's text in an alert when it is clicked:

```javascript
$('p').on('click', function () {
  alert($(this).text())
})
```

Pass data to the event handler, which is specified here by name:

```javascript
function myHandler(event) {
  alert(event.data.foo)
}
$('p').on('click', { foo: 'bar' }, myHandler)
```

Cancel a form submit action and prevent the event from bubbling up by returning false:

```javascript
$('form').on('submit', false)
```

Cancel only the default action by using .preventDefault().

```javascript
$('form').on('submit', function (event) {
  event.preventDefault()
})
```

Stop submit events from bubbling without preventing form submit, using .stopPropagation().

```javascript
$('form').on('submit', function (event) {
  event.stopPropagation()
})
```

Pass data to the event handler using the second argument to `.trigger()`

```javascript
$('div').on('click', function (event, person) {
  alert('Hello, ' + person.name)
})
$('div').trigger('click', { name: 'Jim' })
```

Use the the second argument of `.trigger()` to pass an array of data to the event handler

```javascript
$('div').on('click', function (event, salutation, name) {
  alert(salutation + ', ' + name)
})
$('div').trigger('click', ['Goodbye', 'Jim'])
```

Attach and trigger custom (non-browser) events.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>on demo</title>
    <style>
      .test {
        color: #000;
        padding: 0.5em;
        border: 1px solid #444;
      }
      .active {
        color: #900;
      }
      .inside {
        background-color: aqua;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>Has an attached custom event.</p>
    <button>Trigger custom event</button>
    <span style="display:none;"></span>
    <script>
      $('p').on('myCustomEvent', function (event, myName) {
        $(this).text(myName + ', hi there!')
        $('span')
          .css('opacity', 1)
          .text('myName = ' + myName)
      })
      $('button').click(function () {
        $('p').trigger('myCustomEvent', ['John'])
      })
    </script>
  </body>
</html>
```

Attach multiple event handlers simultaneously using a plain object.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>on demo</title>
    <style>
      .test {
        color: #000;
        padding: 0.5em;
        border: 1px solid #444;
      }
      .active {
        color: #900;
      }
      .inside {
        background-color: aqua;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <div class="test">test div</div>

    <script>
      $('div.test').on({
        click: function () {
          $(this).text('clicked event')
        },
        mouseenter: function () {
          $(this).text('mouseleave event')
        },
        mouseleave: function () {
          $(this).text('mouseleave event')
        }
      })
    </script>
  </body>
</html>
```

Click any paragraph to add another after it. Note that .on() allows a click event on any paragraph--even new ones--since the event is handled by the ever-present body element after it bubbles to there.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>on demo</title>
    <style>
      p {
        background: yellow;
        font-weight: bold;
        cursor: pointer;
        padding: 5px;
      }
      p.over {
        background: #ccc;
      }
      span {
        color: red;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <p>Click me!</p>
    <span></span>

    <script>
      var count = 0
      $('body').on('click', 'p', function () {
        $(this).after('<p>Another paragraph! ' + ++count + '</p>')
      })
    </script>
  </body>
</html>
```

Display each paragraph's text in an alert box whenever it is clicked:

```javascript
$('body').on('click', 'p', function () {
  alert($(this).text())
})
```

Cancel a link's default action using the .preventDefault() method:

```javascript
$('body').on('click', 'a', function (event) {
  event.preventDefault()
})
```

Attach multiple events—one on mouseenter and one on mouseleave to the same element:

```javascript
$('#cart').on('mouseenter mouseleave', function (event) {
  $(this).text(event.type + ' event')
})
```
