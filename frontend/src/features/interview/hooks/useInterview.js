import { useContext, useEffect } from "react"
import {generateInterviewReport, getInterviewReportById, getAllInterviewReport, generateResumePdf} from "../services/interview.api"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router";

export const useInterview = () => {

    const {interviewId} = useParams();
    const context = useContext(InterviewContext);
    const {loading, setLoading, report, setReport,reports, setReports} = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(response.interviewReport);
            return response.interviewReport;
        }
        finally{
            setLoading(false);
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        try{
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        }
        finally{
            setLoading(false);
        }
    }

    const getReports = async (interviewId) => {
        setLoading(true);
        try{
            const response = await getAllInterviewReport(interviewId);
            setReports(response.interviewReport);
            return response.interviewReport;
        }
        finally{
            setLoading(false);
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true);
        try{
            const response = await generateResumePdf(interviewReportId);
            const url = window.URL.createObjectURL(new Blob([response], {type: "application/pdf"}));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `resume_${interviewReportId}.pdf`);
            document.body.appendChild(link);
            link.click();
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        async function getReport(){
            if(interviewId){
                await getReportById(interviewId)
            }
            else{
                await getReports();
            }
        }
        getReport()
    }, [interviewId])

    return {loading, report, reports, generateReport, getReportById, getReports, getResumePdf};
}