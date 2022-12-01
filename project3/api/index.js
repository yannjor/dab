const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const messageService = require("./services/messages");

const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/messages", async (request, response) => {
  const messages = await messageService.getAll();
  response.json(messages);
});

app.get("/api/messages/:id", async (request, response) => {
  const message = await messageService.getById(request.params.id);
  response.json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
