const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const urlsRouter = require("./controllers/urls");

app.use(bodyParser.json());
app.use(cors());
app.use("/api/urls", urlsRouter);

app.listen(3001);
