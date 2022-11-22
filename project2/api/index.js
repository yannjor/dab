const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { getAll, getById } = require("./services/exercises");

const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/exercises", async (request, response) => {
  const exercises = await getAll();
  response.json(exercises);
});

app.get("/api/exercises/:id", async (request, response) => {
  const exercise = await getById(request.params.id);
  response.json(exercise);
});

app.post("/api/submissions", async (request, response) => {
  console.log(request.body);
  console.log(request.headers.authorization);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
