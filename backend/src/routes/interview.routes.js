const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

interviewRouter.post("/", authMiddleware, upload.single("resume"), interviewController.generateInterviewReportController );

interviewRouter.get("/report/:interviewId", authMiddleware, interviewController.getInterviewReportByIdController);

interviewRouter.get("/", authMiddleware, interviewController.getAllInterviewReportController);

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware, interviewController.generateResumePdfController);

module.exports = interviewRouter;