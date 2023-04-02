---
prev:
  text: 'Introduction'
  link: '/docs/introduction'

next:
  text: 'Contribute'
  link: '/docs/contribute'
---

# Including Baby Query

Below are some of the most common ways to include Baby Query.

### Browser

Script tag

```html
<script src="https://cdn.jsdelivr.net/npm/baby-query@1.0.5/dist/babyQuery.js"></script>
```

or for the minified version:

```html
<script src="https://cdn.jsdelivr.net/npm/baby-query@1.0.5/dist/babyQuery.min.js"></script>
```

In the script, including Baby Query will usually look like this:

```javascript
import $ from 'baby-query'
```

If you need to use Baby Query in a file that's not an ECMAScript module, you can use the CommonJS syntax:

```javascript
var $ = require('baby-query')
```

### Node

To include Baby Query in Node, first install with npm.

```javascript
npm install baby-query
```

For Baby Query to work in Node, a window with a document is required. Since no such window exists natively in Node, one can be mocked by tools such as jsdom. This can be useful for testing purposes.

```javascript
const $ = require('baby-query')
const { JSDOM } = require('jsdom')
const { window, document } = new JSDOM(`<p>Hello world</p>`).window
global.window = window
global.document = document
console.log($('p').text())
```
