// Dev server with no dependencies
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname as _extname } from "path";

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = import.meta.dirname;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  // map more types if necessary
};

createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Default to index.html if no file is specified
  let filePath = join(PUBLIC_DIR, req.url === "/" ? "html-esc.html" : req.url);
  const extname = _extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || "application/octet-stream";

  try {
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf-8");
  } catch (error) {
    console.error("Encountered error", error);
    if (error.code === "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Page not found", "utf-8");
    } else {
      res.writeHead(500);
      res.end(`Sorry, there was an error: ${error.code}`);
    }
  }
}).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
