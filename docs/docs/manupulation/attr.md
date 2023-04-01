# .attr()

Get the value of an attribute for the first element in the set of matched elements also, Set one or more attributes for the set of matched elements.


## Method Details

| Method Call                      | Description                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .attr( attributeName )           | <b>attributeName</b> <br>Type: String<br>The name of the attribute to get.                                                                                                                                                                                                                                                             |
| .attr( attributeName, value )    | <b>attributeName</b><br>Type: String<br>The name of the attribute to set.<hr><b>value</b><br>Type: String or Number or Null<br>A value to set for the attribute. If null, the specified attribute will be removed.                                                                                                                     |
| .attr( attributes )              | <b>attributes</b><br>Type: PlainObject<br>An object of attribute-value pairs to set.                                                                                                                                                                                                                                                   |
| .attr( attributeName, function ) | <b>attributeName</b><br>Type: String<br>The name of the attribute to set<hr><b>function</b><br>Type: Function( Integer index, String attr ) => String or Number<br>A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old attribute value as arguments. |

The .attr() method gets the attribute value for only the first element in the matched set.

<!--  To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.

Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.
Note: Attribute values are strings with the exception of a few attributes such as value and tabindex.

As of jQuery 1.6, the .attr() method returns undefined for attributes that have not been set. To retrieve and change DOM properties such as the checked, selected, or disabled state of form elements, use the .prop() method.

Attributes vs. Properties
The difference between attributes and properties can be important in specific situations. Before jQuery 1.6, the .attr() method sometimes took property values into account when retrieving some attributes, which could cause inconsistent behavior. As of jQuery 1.6, the .prop() method provides a way to explicitly retrieve property values, while .attr() retrieves attributes.

For example, selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, and defaultSelected should be retrieved and set with the .prop() method. Prior to jQuery 1.6, these properties were retrievable with the .attr() method, but this was not within the scope of attr. These do not have corresponding attributes and are only properties.

Concerning boolean attributes, consider a DOM element defined by the HTML markup <input type="checkbox" checked="checked" />, and assume it is in a JavaScript variable named elem:

elem.checked	true (Boolean) Will change with checkbox state
$( elem ).prop( "checked" )	true (Boolean) Will change with checkbox state
elem.getAttribute( "checked" )	"checked" (String) Initial state of the checkbox; does not change
$( elem ).attr( "checked" ) (1.6+)	"checked" (String) Initial state of the checkbox; does not change
$( elem ).attr( "checked" ) (pre-1.6)	true (Boolean) Changed with checkbox state

According to the W3C forms specification, the checked attribute is a boolean attribute, which means the corresponding property is true if the attribute is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false". This is true of all boolean attributes.

Nevertheless, the most important concept to remember about the checked attribute is that it does not correspond to the checked property. The attribute actually corresponds to the defaultChecked property and should be used only to set the initial value of the checkbox. The checked attribute value does not change with the state of the checkbox, while the checked property does. Therefore, the cross-browser-compatible way to determine if a checkbox is checked is to use the property:

if ( elem.checked )
if ( $( elem ).prop( "checked" ) )
if ( $( elem ).is( ":checked" ) )
The same is true for other dynamic attributes, such as selected and value.

Additional Notes:
In Internet Explorer prior to version 9, using .prop() to set a DOM element property to anything other than a simple primitive value (number, string, or boolean) can cause memory leaks if the property is not removed (using .removeProp()) before the DOM element is removed from the document. To safely set values on DOM objects without memory leaks, use .data().
Examples:
Display the checked attribute and property of a checkbox as it changes.

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>attr demo</title>
  <style>
  p {
    margin: 20px 0 0;
  }
  b {
    color: blue;
  }
  </style>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>
<body>

<input id="check1" type="checkbox" checked="checked">
<label for="check1">Check me</label>
<p></p>

<script>
$( "input" )
  .change(function() {
    var $input = $( this );
    $( "p" ).html( ".attr( 'checked' ): <b>" + $input.attr( "checked" ) + "</b><br>" +
      ".prop( 'checked' ): <b>" + $input.prop( "checked" ) + "</b><br>" +
      ".is( ':checked' ): <b>" + $input.is( ":checked" ) + "</b>" );
  })
  .change();
</script>

</body>
</html> -->



Find the title attribute of the first `<em>` in the page.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>attr demo</title>
  <style>
  em {
    color: blue;
    font-weight: bold;
  }
  div {
    color: red;
  }
  </style>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>
<body>
 
<p>Once there was a <em title="huge, gigantic">large</em> dinosaur...</p>
 
The title of the emphasis is:<div></div>
 
<script>
var title = $( "em" ).attr( "title" );
$( "div" ).text( title );
</script>
 
</body>
</html>
```



The `.attr()` method is a convenient way to set the value of attributes—especially when setting multiple attributes or using values returned by a function. Consider the following image:

```html
<img id="greatphoto" src="brush-seller.jpg" alt="brush seller">
```

## Setting a simple attribute

To change the alt attribute, simply pass the name of the attribute and its new value to the `.attr()` method:

```javascript
$( "#greatphoto" ).attr( "alt", "Beijing Brush Seller" );
```

Add an attribute the same way:

```javascript
$( "#greatphoto" ).attr( "title", "Photo by Kelly Clark" );
```

## Setting several attributes at once

To change the alt attribute and add the title attribute at the same time, pass both sets of names and values into the method at once using a plain JavaScript object. Each key-value pair in the object adds or modifies an attribute:

```javascript
$( "#greatphoto" ).attr({
  alt: "Beijing Brush Seller",
  title: "photo by Kelly Clark"
});
```

When setting multiple attributes, the quotes around attribute names are optional.

<!-- > WARNING: When setting the 'class' attribute, you must always use quotes! -->

<!-- Note: Attempting to change the type attribute on an input or button element created via document.createElement() will throw an exception on Internet Explorer 8 or older. -->


## Computed attribute values

By using a function to set attributes, you can compute the value based on other properties of the element. For example, to concatenate a new value with an existing value:

```javascript
$( "#greatphoto" ).attr( "title", function( i, val ) {
  return val + " - photo by Kelly Clark";
});
```

This use of a function to compute attribute values can be particularly useful when modifying the attributes of multiple elements at once.

<!-- Note: If nothing is returned in the setter function (ie. function(index, attr){}), or if undefined is returned, the current value is not changed. This is useful for selectively setting values only when certain criteria are met. -->



```html

Examples:
Set some attributes for all <img>s in the page.

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>attr demo</title>
  <style>
  img {
    padding: 10px;
  }
  div {
    color: red;
    font-size: 24px;
  }
  </style>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>
<body>
 
<img>
<img>
<img>
 
<div><b>Attribute of Ajax</b></div>
 
<script>
$( "img" ).attr({
  src: "/resources/hat.gif",
  title: "jQuery",
  alt: "jQuery Logo"
});
$( "div" ).text( $( "img" ).attr( "alt" ) );
</script>
 
</body>
</html>

```


<!-- Set the id for divs based on the position in the page.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>attr demo</title>
  <style>
  div {
    color: blue;
  }
  span {
    color: red;
  }
  b {
    font-weight: bolder;
  }
  </style>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>
<body>
 
<div>Zero-th <span></span></div>
<div>First <span></span></div>
<div>Second <span></span></div>
 
<script>
$( "div" )
  .attr( "id", function( arr ) {
    return "div-id" + arr;
  })
  .each(function() {
    $( "span", this ).html( "(id = '<b>" + this.id + "</b>')" );
});
</script>
 
</body>
</html>
``` -->


Set the src attribute from title attribute on the image.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>attr demo</title>
  <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
</head>
<body>
 
<img title="hat.gif">
 
<script>
$( "img" ).attr( "src", function() {
  return "/resources/" + this.title;
});
</script>
 
</body>
</html>
```
