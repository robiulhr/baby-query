# .after()

Insert content, specified by the parameter, after each element in the set of matched elements.

## Method Details

| Method Call                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [.after(content,[content])](#Code-Examples) | <b>content</b> <br>Type: htmlString or Element or Text or Array or BabyQuery.<br>HTML string, DOM element, text node, array of elements and text nodes, or BabyQuery object to insert after each element in the set of matched elements.<br><b>content</b><br>Type: htmlString or Element or Text or Array or BabyQuery <br>One or more additional DOM elements, text nodes, arrays of elements and text nodes, HTML strings, or BabyQuery objects to insert after each element in the set of matched elements. |
| [.after(function)](#Code-Examples)          | <b>function</b><br>Type: Function( Integer index ) => htmlString or Element or Text or BabyQuery<br>A function that returns an HTML string, DOM element(s), text node(s), or BabyQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.                                                                                                            |
| [.after(function-html)](#Code-Examples)     | <b>function-html</b><br>Type: Function( Integer index, String html ) => htmlString or Element or Text or BabyQuery<br>A function that returns an HTML string, DOM element(s), text node(s), or BabyQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.                                                      |

## Code Examples

Few Example for `.after()` method

### .after(content)

Html code

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <div class="inner">Goodbye</div>
</div>
```

```javascript
$('.inner').after('<p>Test</p>')
```

```html
<div class="container">
  <h2>Greetings</h2>
  <div class="inner">Hello</div>
  <p>Test</p>
  <div class="inner">Goodbye</div>
  <p>Test</p>
</div>
```

# My Code Example

<CodePreview>
  <template v-slot:code>
    <pre>
      <code class="language-html">
        <h1>Hello World</h1>
        <p>This is some sample HTML</p>
      </code>
    </pre>
  </template>

  <template v-slot:result>
    <h1>Hello World</h1>
    <p>This is some sample HTML</p>
  </template>
</CodePreview>