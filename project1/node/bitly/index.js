const express = require("express");
const app = express();
require("dotenv").config();

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

app.post("/api/urls", async (request, response) => {
    console.log(request.body);
    response.send("hi");
});

app.listen(3001);
