require("dotenv").config();

const express = require("express");
const cors = require("cors");
const detectRouter = require("./route/detect");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/detect", detectRouter);

module.exports = app;