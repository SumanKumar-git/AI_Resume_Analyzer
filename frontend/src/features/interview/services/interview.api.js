import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    try{
        const response = await api.post("/api/interview/", formData , {
        headers : {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data;
    }
    catch(error){
        throw new Error(error.response?.data?.message || "Interview report generation failed")
    }
}

export const getInterviewReportById = async (interviewId) => {
    try{
        const response = await api.get(`/api/interview/report/${interviewId}`);

    return response.data;
    }
    catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch interview report")
    }
}

export const getAllInterviewReport = async () => {
    try{
        const response = await api.get("/api/interview/")
        return response.data;
    }
    catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch all interview reports")
    }
}

export const generateResumePdf = async (interviewReportId) => {
    try{
        const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`,{}, {
        responseType: "blob"
    })
    return response.data;
    }
    catch(error){
        throw new Error(error.response?.data?.message || "Failed to generate resume PDF")
    }
}