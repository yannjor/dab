const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { Kafka } = require("kafkajs");

const exerciseService = require("./services/exercises");
const submissionService = require("./services/submissions");
const { grade, buildGraderImage } = require("./services/grader");
const { tokenExtractor } = require("./utils/middleware");

const port = 3001;

let nSubmissions = 0;

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

const kafka = new Kafka({
  clientId: "api",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer();
producer.connect().then(() => console.log("Producer connected"));

const consumer = kafka.consumer({ groupId: "test-group" });

consumer.connect().then(() => console.log("Consumer connected"));
consumer
  .subscribe({ topic: "submissions", fromBeginning: true })
  .then(() => console.log("Consumer subscribed"));

consumer
  .run({
    eachMessage: async ({ topic, partition, message }) => {
      const { user_id, code, exercise_id } = JSON.parse(message.value);
      const gradingResult = await grade(code);
      const passed = gradingResult === "PASS";
      await submissionService.create(user_id, exercise_id, passed);
      nSubmissions += 1;
    },
  })
  .then(() => console.log("Consumer running"));

buildGraderImage().then(() => console.log("Built grader image"));

app.get("/api/exercises", async (request, response) => {
  const all = await exerciseService.getAll();
  const completed = await exerciseService.getUserCompleted(request.token);
  response.json({ all, completed });
});

app.get("/api/exercises/:id", async (request, response) => {
  const exercise = await exerciseService.getById(request.params.id);
  response.json(exercise);
});

app.get("/api/submissions", async (request, response) => {
  const submissions = await submissionService.getAll();
  response.json(submissions);
});

app.get("/api/submissionstatus/:id", async (request, response) => {
  const submission = await submissionService.getById(request.params.id);
  if (submission.length) {
    const passed = submission[0].completed;
    const res = passed ? "PASS" : "FAIL";
    response.send(res);
  } else {
    response.send("GRADING");
  }
});

app.post("/api/submissions", async (request, response) => {
  const { code, exercise_id } = request.body;
  const user_id = request.token;

  await producer.send({
    topic: "submissions",
    messages: [
      {
        key: "submission",
        value: JSON.stringify({ user_id, exercise_id, code }),
      },
    ],
  });
  response.send((nSubmissions + 1).toString());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
