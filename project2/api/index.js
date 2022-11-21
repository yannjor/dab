const express = require("express");
const app = express();
require("dotenv").config();
const { getAll } = require("./services/exercises");
const port = 3001;

app.use(express.urlencoded({ extended: true }));

app.get("/api/exercises", async (request, response) => {
  const exercises = await getAll();
  response.json(exercises);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
