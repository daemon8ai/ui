import { createServer } from "node:http";
import server from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "3007");
const host = process.env.HOST || "0.0.0.0";

if (!process.env.SITE_URL) {
  console.error(
    "[daemon8] SITE_URL is unset. Set it to https://daemon8.ai (prod) or http://localhost:3000 (dev)."
  );
}

createServer(async (req, res) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const url = new URL(req.url, `${protocol}://${req.headers.host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }

  let body = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks);
  }

  try {
    const response = await server.fetch(
      new Request(url, {
        method: req.method,
        headers,
        body,
        duplex: "half",
      })
    );

    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("Error handling request:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
}).listen(port, host, () => {
  console.log(`daemon8-app listening on http://${host}:${port}`);
});
