require("dotenv").config();

const express = require("express");
const cors = require("cors");
const detectRouter = require("./route/detect");
const commentsRouter = require("./route/comments");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/detect", detectRouter);
app.use("/api/comments", commentsRouter);

app.get("/", (req: any, res: any) => {
    res.json({ message: "Judol Detector API is running" });
});

module.exports = app;