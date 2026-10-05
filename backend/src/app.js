const express = require("express");
const cors = require("cors");
const authRouter = require("../src/routes/auth.routes");
const interviewRouter = require("../src/routes/interview.routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
   origin: process.env.ORIGIN,
   credentials: true
}));
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);


module.exports = app;