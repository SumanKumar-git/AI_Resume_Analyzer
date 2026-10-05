const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});

/*
ZOD VALIDATION SCHEMA
*/

const interviewReportSchema = z.object({
    title: z.string(),
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(
    z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["Low", "Medium", "High"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
});

/*
GEMINI RESPONSE SCHEMA
 */

const geminiSchema = {
    type: Type.OBJECT,
    properties: {
    title: {
        type: Type.STRING
    },
    matchScore: {
        type: Type.NUMBER
    },

    technicalQuestions: {
        type: Type.ARRAY,
        items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING },
            intention: { type: Type.STRING },
            answer: { type: Type.STRING }
        },
        required: ["question", "intention", "answer"]
        }
    },

    behavioralQuestions: {
        type: Type.ARRAY,
        items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING },
            intention: { type: Type.STRING },
            answer: { type: Type.STRING }
        },
        required: ["question", "intention", "answer"]
        }
    },

    skillGaps: {
        type: Type.ARRAY,
        items: {
        type: Type.OBJECT,
        properties: {
            skill: { type: Type.STRING },
            severity: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"]
            }
        },
        required: ["skill", "severity"]
        }
    },

    preparationPlan: {
        type: Type.ARRAY,
        items: {
        type: Type.OBJECT,
        properties: {
            day: { type: Type.NUMBER },
            focus: { type: Type.STRING },
            tasks: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
            }
        },
        required: ["day", "focus", "tasks"]
        }
        }
    },

    required: [
    "title",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan"
    ]
};

/*
MAIN FUNCTION
*/

async function generateInterviewReport({resume,jobDescription,selfDescription}) {
    const prompt = `
Generate a complete interview report for this candidate.

Resume:
${resume}

Job Description:
${jobDescription}

Self Description:
${selfDescription}

Rules:
- title of the job for which the interview report is generated.
- matchScore must be between 0 and 100 based on candidate-job fit.
- technicalQuestions should focus on MERN stack practical interview questions.
- intention should explain why interviewer asks it.
- answer should be concise and professional.
- skillGaps should reflect missing job-required skills.
- preparationPlan should be realistic and day-wise.

Return ONLY valid JSON.
`;

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema
    }
    });

    const rawData = JSON.parse(response.text);

  // Final backend validation
    const validatedData = interviewReportSchema.parse(rawData);

    return validatedData;
}

async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, {
    waitUntil: "networkidle0"
    });
    const pdfBuffer = await page.pdf({format: "A4" ,margin: {
    top: "10mm",
    bottom: "10mm",
    left: "10mm",
    right: "10mm"
  }})

    await browser.close();
    return pdfBuffer;
}

async function generateResumePdf({resume,jobDescription,selfDescription}){
    const resumeSchema = {
        type: Type.OBJECT,
        properties: {
            html: {
                type: Type.STRING
            }
        },
        required: ["html"]
    }

    const prompt = `Generate a resume for the candidate with the following details:
    resume : ${resume}
    Job Description : ${jobDescription}
    Self Description : ${selfDescription}
    the response should be a JSON object with a single field "html" which contains the html content of the resume which can be converted to PDF using library puppeteer.
    You are an expert executive resume writer and hiring manager with 15+ years of experience creating resumes that get shortlisted.

Your task is to create a modern, industry-standard, ATS-optimized professional resume based on the candidate information I provide.

IMPORTANT REQUIREMENTS:

1. The resume must feel naturally written by an experienced human resume writer.
2. Avoid robotic, generic, repetitive, or obviously AI-generated language.
3. Use concise, impactful, achievement-driven bullet points.
4. Every bullet should sound realistic, measurable, and role-relevant.
5. Use strong action verbs and professional tone.
6. Focus on business impact, ownership, and outcomes.
7. Keep wording clean, sharp, and credible.
8. No exaggerated claims or fake achievements.
9. Tailor the resume for current hiring standards in 2026.
10. Make it ATS-friendly with relevant keywords.
11. Use proper formatting and professional section order.
12. Avoid overuse of buzzwords like “hardworking”, “team player”, “motivated”.
13. Do not mention that AI generated this content.
14. Keep the language natural and human-like.
15. Use modern resume writing style used by top recruiters.

OUTPUT FORMAT:

Generate resume in clean HTML with inline CSS.
Use A4 layout optimized for PDF export.
Use readable typography that are commonly used in resume, proper spacing, professional design. Don't use any new or odd fonts.
Keep it elegant, minimal, and corporate.
Make links such as github and linkedin clickable so that it can open.

SECTIONS TO INCLUDE (when data available):
- Full Name
- Contact Information
- Professional Summary
- Core Skills
- Work Experience
- Projects
- Education
- Certifications
- Tools / Technologies (each seperated by comma)
- Achievements (if relevant)

WORK EXPERIENCE RULES:
- Use bullet points only
- 3 to 6 bullets per role
- Show results, ownership, scale, impact
- Mention tools/tech where natural (seperated by comma ;)
- Make each bullet unique

SUMMARY RULES:
- 3 to 4 lines maximum
- Strong professional identity
- Years of experience
- Core strengths
- Industry/domain fit

DESIGN RULES:
- Layout: Use a single-column format rather than multi-column to ensure the scanner reads in the correct order. Header should be centered aligned.
- Fonts: Use standard, web-safe fonts like Arial, Calibri, Times New Roman, or Georgia.
- Modern professional resume
- ATS readable
- No tables
- No icons
- No unnecessary graphics
- Strong hierarchy

Now generate the best possible resume from this candidate data

    `

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema
    }
    });

    const jsonContent = JSON.parse(response.text);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
}

module.exports = {generateInterviewReport, generateResumePdf};