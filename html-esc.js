// html-esc
// JavaScript Template Literal Tag to output HTML-escaped content. Eg. `` html`<div>${myVar}</div>` ``
// Barebones alternative to `lit-html` and `htl`.

// Credit to developit/vhtml, initially used `createElement().textContent` sanitization but needed regex for attr delimiters.
const map = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" };
const esc = (str) => str.replace(/[&<>"']/g, (s) => `&${map[s]};`);

// Sanitized string marking inspired by dodoas/stringjsx
const markSafe = (str) =>
  Object.assign(new String(str), { __html_sanitized: true });

function htmlSanitize(rawText = "") {
  if (rawText?.__html_sanitized) return rawText;
  return markSafe(esc(rawText));
}

export function html(strings, ...values) {
  return markSafe(
    strings.reduce((acc, curr, i) => acc + curr + htmlSanitize(values[i]), ""),
  );
}
