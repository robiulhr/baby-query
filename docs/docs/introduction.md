---
next:
  text: 'Installation'
  link: '/docs/installation'
---

# Get started with Baby Query

Baby Query is the custom implementation of the popular JavaScript library jQuery.

## Quick start 

Get started by including Baby Query’s production-ready CSS and JavaScript via CDN without the need for any build steps. See it in practice with this Baby Query CodePen demo.

1. Create a new `index.html` file in your project root.

```html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>

```

2. Include Baby Query’s `JS`. Place the `<script>` tag for our JavaScript bundle before the closing `</body>`. Learn more about our [CDN links](./installation).


```javascript
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <script src="Babyquery link here"></script>
  </body>
</html>
```
3. `Hello, world!` Open the page in your browser of choice to see your Baby Queried page. Now you can start building with Baby Query by creating your own things.



## A Brief Look

### DOM Traversal and Manipulation

Get the `<button>` element with the class `continue` and change its HTML to `Next Step...`

```javascript
$('button.continue').html('Next Step...')
```

### Event Handling

Show the `#banner-message` element that is hidden with `display:none` in its CSS when any button in `#button-container` is clicked.

```javascript
var hiddenBox = $('#banner-message')
$('#button-container button').on('click', function (event) {
  hiddenBox.show()
})
```

### Ajax

Call a local script on the server /api/getWeather with the query parameter zipcode=97201 and replace the element #weather-temp's html with the returned text.

```javascript
$.ajax({
  url: '/api/getWeather',
  data: {
    zipcode: 97201
  },
  success: function (result) {
    $('#weather-temp').html('<strong>' + result + '</strong> degrees')
  }
})
```
