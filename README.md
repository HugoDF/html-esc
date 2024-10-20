# `html-esc`

![minzip size badge](https://badgen.net/bundlephobia/minzip/html-esc)

JavaScript Template Literal Tag that converts to HTML-escaped content. Eg. `` html`<div>${myVar}</div>` ``.

Barebones (and tiny, [<50 lines of code](./html-esc.js)) alternative to [`lit-html`](https://www.npmjs.com/package/lit-html) and [`htl`](https://github.com/observablehq/htl), ideal for use in web components or to template in Vanilla/no build JavaScript.

It's ready for use straight in the browser via CDN (or copy-pasting into your project).

```html
<script type="importmap">
  { "imports": { "html-esc": "https://esm.sh/html-esc" } }
</script>
<script type="module">
  import { html } from "html-esc";
  const message = "<strong>strong but will get escaped</strong>";
  document.body.innerHTML = html`<div>I'm ${message}</div>`;
</script>
```

Or via npm (assuming you want to use a bundler).

```sh
npm i html-esc
```

## Why is this necessary?

`htl` has a great section on this: [htl - why not concatenate?](https://www.npmjs.com/package/htl#why-not-concatenate).

In short: values containing certain characters are not safe to be interpolated for cross-site scripting ("XSS") reasons and content display reasons (eg. `&` having special meaning in HTML).

## Credit

Credit to [developit/vhtml](https://github.com/developit/vhtml) and [dodoas/stringjsx](https://github.com/dodoas/stringjsx) for:

- HTML entity escape function
- the approach to tracking "already seen sanitized strings", this allows for avoiding "double escaping" ie. this renders as expected: ``html`<div>${html`<div>html-tagged</div>`}` ``

<!-- HTML sanitization initially inspired by https://news.ycombinator.com/item?id=41724867, but since regex-based replacement is necessary for attribute delimiters `"` and `'`, all escaping is done via the regex. -->

## Requirements

- Node 20
- npm v8+

## Setup

1. Clone the repository
2. Run `npm install` installs all required dependencies.

## npm scripts

- `npm test` will run tests using the [Node.js test runner](https://nodejs.org/api/test.html#running-tests-from-the-command-line) and the `node:test` module.
- `npm run format` will run prettier on all the examples files (and tests).

## LICENSE

Code is licensed under the [MIT License](./LICENSE).
