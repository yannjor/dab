const urlsRouter = require("express").Router();

urlsRouter.get("/", (request, response) => {
  response.send("Hello World");
});

urlsRouter.post("/", (request, response) => {
  console.log(request.body);
  response.send("hi");
});

module.exports = urlsRouter;
