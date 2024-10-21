import { test } from "node:test";
import { html } from "./html-esc.js";

test("html - example", (t) => {
  const message = "<strong>strong but will get escaped</strong>";
  t.assert.strictEqual(
    html`<div>I'm ${message}</div>`.valueOf(),
    `<div>I'm &lt;strong&gt;strong but will get escaped&lt;/strong&gt;</div>`,
  );
});
test("html - noop when no interpolations", (t) => {
  t.assert.strictEqual(
    html`<div><h2>Hello World</h2></div>`.valueOf(),
    `<div><h2>Hello World</h2></div>`,
  );
});
test("html - escapes interpolated strings", (t) => {
  t.assert.strictEqual(
    html`<div>${"<div>not html tagged</div>"}</div>`.valueOf(),
    `<div>&lt;div&gt;not html tagged&lt;/div&gt;</div>`,
  );
});
test("html - doesn't escape interpolated nested tagged literals with no interpolations", (t) => {
  t.assert.equal(
    html`<div>${html`<div>html-tagged</div>`}</div>`.valueOf(),
    `<div>${html`<div>html-tagged</div>`}</div>`,
  );
});
test("html - supports interpolation of lists of untagged items", (t) => {
  t.assert.strictEqual(
    html`<div>${["<i>hello</i>", "value"]}</div>`.valueOf(),
    "<div>&lt;i&gt;hello&lt;/i&gt;value</div>",
  );
});
test("html - supports interpolation of lists of tagged items", (t) => {
  t.assert.strictEqual(
    html`<ul>
      ${[html`<li><strong>hello</strong></li>`, html`<li>value</li>`]}
    </ul>`.valueOf(),
    `<ul>
      <li><strong>hello</strong></li><li>value</li>
    </ul>`,
  );
});
test("html - doesn't break on bad payloads", (t) => {
  const badPayload = `"><script>console.log('123')</script>`;

  t.assert.strictEqual(
    html`<div>${badPayload}</div>`.valueOf(),
    `<div>&quot;&gt;&lt;script&gt;console.log(&apos;123&apos;)&lt;/script&gt;</div>`,
  );
  t.assert.strictEqual(
    html`<div>${html`<strong>${badPayload}</strong>`}</div>`.valueOf(),
    `<div><strong>&quot;&gt;&lt;script&gt;console.log(&apos;123&apos;)&lt;/script&gt;</strong></div>`,
  );
});

// Following tests are from https://github.com/developit/vhtml/blob/96fe21e63a983d7a8f52d8c51a0c994490313abc/test/vhtml.js
test("html - sanitizes attribute interpolations", (t) => {
  t.assert.strictEqual(
    html`<div data-attr="${`&<>"'`}"></div>`.valueOf(),
    `<div data-attr="&amp;&lt;&gt;&quot;&apos;"></div>`,
  );
});
test("html - sanitizes dynamic children", (t) => {
  t.assert.strictEqual(
    html`${`<strong>blocked</strong>`}`.valueOf(),
    `&lt;strong&gt;blocked&lt;/strong&gt;`,
  );
  t.assert.strictEqual(html`<em>allowed</em>`.valueOf(), `<em>allowed</em>`);
});
