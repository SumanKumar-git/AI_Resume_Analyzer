const pdfParse = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res){

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    if(!interviewReportByAi){
        return res.status(400).json({
            message: "AI failed to generate interview report"
        })
    }

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        jobDescription,
        selfDescription,
        ...interviewReportByAi,
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}

async function getInterviewReportByIdController(req, res){
    const {interviewId} = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id }).select("-resume -jobDescription -selfDescription");

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

async function getAllInterviewReportController(req, res){

    const interviewReport = await interviewReportModel.find(({user : req.user.id})).sort({createdAt: -1}).select("-resume -jobDescription -selfDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}

async function generateResumePdfController(req, res){
    const {interviewReportId} = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    const {resume, jobDescription, selfDescription} = interviewReport;

    const pdfBuffer = await generateResumePdf({resume, jobDescription, selfDescription});

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume${interviewReportId}.pdf`
    })

    res.send(pdfBuffer);
}


module.exports = {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController, generateResumePdfController}