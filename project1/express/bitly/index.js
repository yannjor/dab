const express = require("express");
const app = express();
require("dotenv").config();

const { create, getAll, getOriginal } = require("./services/url");

app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  const html = `
    <h1>My URL shortener</h1>
    <form action="/api/urls" method="post">
        <input type="url" name="url">
        <button type="submit">Shorten</button>
    </form>
    `;
  response.send(html);
});

app.get("/random", async (request, response) => {
  const urls = await getAll();
  const random = urls[Math.floor(Math.random() * urls.length)];
  response.redirect(random.original);
});

app.get("/:id", async (request, response) => {
  const original = await getOriginal(request.params.id);
  response.redirect(original);
});

app.get("/api/urls", async (request, response) => {
  const urls = await getAll();
  response.json(urls);
});

app.post("/api/urls", async (request, response) => {
  const original = request.body.url;
  const shortened = await create(original);
  response.send(`
      <a href="${original}">${original}</a>
      is now at
      <a href="/${shortened}">/${shortened}</a>
      `);
});

app.listen(3000);
