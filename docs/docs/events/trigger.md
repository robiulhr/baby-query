# .trigger()

Execute all handlers and behaviors attached to the matched elements for the given event type.

## Method Details

| Method Call                                | Description                                                                                                                                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .trigger( eventType [, extraParameters ] ) | <b>eventType</b> <br>Type: String<br> A string containing a JavaScript event type, such as click or submit<br><hr><b>extraParameters</b> <br>Type: Array or PlainObject<br>Additional parameters to pass along to the event handler. |
| .trigger( event [, extraParameters ] )     | <b>event</b> <br>Type: Event<br> A Event object.<br><hr><b>extraParameters</b> <br>Type: Array or PlainObject<br>Additional parameters to pass along to the event handler.                                                           |

Any event handlers attached with `.on()` or one of its shortcut methods are triggered when the corresponding event occurs. They can be fired manually, however, with the `.trigger()` method. A call to `.trigger()` executes the handlers in the same order they would be if the event were triggered naturally by the user:

```javascript
$('#foo').on('click', function () {
  alert($(this).text())
})
$('#foo').trigger('click')
```

As of BabyQuery, `.trigger()`ed events bubble up the DOM tree; an event handler can stop the bubbling by returning `false` from the handler or calling the `.stopPropagation()` method on the event object passed into the event. Although `.trigger()` simulates an event activation, complete with a synthesized event object, it does not perfectly replicate a naturally-occurring event.

<!-- To trigger handlers bound via BabyQuery without also triggering the native event, use `.triggerHandler()` instead. -->

When we define event type using the `.on()` method, the second argument to `.trigger()` can become useful. For example, suppose we have bound a handler for the event to our element instead of the built-in click event as we did above:

```javascript
$('#foo').on('click', function (event, param1, param2) {
  alert(param1 + '\n' + param2)
})
$('#foo').trigger('click', ['Custom', 'Event'])
```

> it works same for the custom event.

The event object is always passed as the first parameter to an event handler. An array of arguments can also be passed to the `.trigger()` call, and these parameters will be passed along to the handler as well following the event object. As of BabyQuery, single string or numeric argument can be passed without being wrapped in an array.

> Note the difference between the extra parameters passed here and the eventData parameter to the `.on()` method. Both are mechanisms for passing information to an event handler, but the extraParameters argument to `.trigger()` allows information to be determined at the time the event is triggered, while the eventData argument to `.on()` requires the information to be already computed at the time the handler is bound.

The `.trigger()` method can be used on BabyQuery collections that wrap plain JavaScript objects similar to a pub/sub mechanism; any event handlers bound to the object will be called when the event is triggered.

<!-- > Note: For both plain objects and DOM objects other than window, if a triggered event name matches the name of a property on the object, jQuery will attempt to invoke the property as a method if no event handler calls event.preventDefault(). If this behavior is not desired, use .triggerHandler() instead. -->

<!-- > Note: As with .triggerHandler(), when calling .trigger() with an event name matches the name of a property on the object, prefixed by on (e.g. triggering click on window that has a non null onclick method), jQuery will attempt to invoke that property as a method. -->

<!-- > Note: When triggering with a plain object that is not array-like but still contains a length property, you should pass the object in an array (e.g. [ { length: 1 } ]). -->

## Examples:

Clicks to button #2 also trigger a click for button #1.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>trigger demo</title>
    <style>
      button {
        margin: 10px;
      }
      div {
        color: blue;
        font-weight: bold;
      }
      span {
        color: red;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
  </head>
  <body>
    <button>Button #1</button>
    <button>Button #2</button>
    <div><span>0</span> button #1 clicks.</div>
    <div><span>0</span> button #2 clicks.</div>

    <script>
      $('button')[0].("click",function () {
        update($('span')[0])
      })

      $('button')[1].("click",function () {
        $('button')[0].trigger('click')
        update($('span')[1])
      })

      function update(j) {
        var n = parseInt(j.text(), 10)
        j.text(n + 1)
      }
    </script>
  </body>
</html>
```

To submit the first form without using the submit() function, try:

```javascript
$('form').trigger('submit')
```

<!-- To submit the first form without using the submit() function, try:

```javascript
var event = new Event('submit')
$('form').trigger(event)
if (event.isDefaultPrevented()) {
  // Perform an action...
}
``` -->

To pass arbitrary data to an event:

```javascript
$('p')
  .on('click', function (event, a, b) {
    console.log(a, b)
    // When a normal click fires, a and b are undefined
    // for a trigger like below a refers to "foo" and b refers to "bar"
  })
  .trigger('click', ['foo', 'bar'])
```

To pass arbitrary data through an event object:

```javascript
var event = new Event('logged')
event.user = 'foo'
event.pass = 'bar'
$('body').trigger(event)
```

Alternative way to pass data through an event object:

```javascript
$('body').trigger({
  type: 'logged',
  user: 'foo',
  pass: 'bar'
})
```
