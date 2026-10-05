const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        require: [true, "Intention is required"]
    },
    answer: {
        type: String,
        require: [true, "Answer is required"]
    }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Behavioral question is required"]
    },
    intention: {
        type: String,
        require: [true, "Intention is required"]
    },
    answer: {
        type: String,
        require: [true, "Answer is required"]
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        require: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["Low", "Medium", "High"],
        require: [true, "Severity is required"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        require: [true, "Day is required"]
    },
    focus: {
        type: String,
        require: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        require: [true, "Task is required"]
    }]
}, { _id: false });


const interviewReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"]
    },
    jobDescription: {
        type: String,
        required: [true, "Job Description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    title: {
        type: String,
        required: [true, "Title is required"]
    }
}, { timestamps: true });

const interviewReportModel = mongoose.model("interviewreport", interviewReportSchema);

module.exports = interviewReportModel;