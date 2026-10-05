# AI Resume Analyzer

An AI-powered full-stack application for analyzing resumes against job descriptions, generating interview-ready reports, and creating tailored candidate resumes as PDFs.

## Features

- User authentication with JWT and cookie-based session handling
- Resume upload and PDF text extraction
- Job description + self-description analysis
- AI-generated interview assessment report using Gemini
- Match score and skill-gap analysis
- Day-wise preparation plan
- Reusable interview report history per user
- AI-generated resume PDF tailored to the job description

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- PDF parsing
- Google GenAI (Gemini)
- Puppeteer for PDF generation

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

## Project Structure

```text
AI_Resume_Analyzer/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or newer recommended)
- MongoDB running locally or a MongoDB Atlas connection string
- A Google Gemini API key

## Environment Variables

Create a `.env` file in the `backend` directory with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
ORIGIN=http://localhost:5173
```

## Installation

1. Clone the repository
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## API Overview

### Auth Routes
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/get-me` - Get current authenticated user

### Interview Routes
- `POST /api/interview` - Upload a resume PDF and generate an interview report
- `GET /api/interview` - Get all interview reports for the logged-in user
- `GET /api/interview/report/:interviewId` - Get one interview report by ID
- `POST /api/interview/resume/pdf/:interviewReportId` - Generate a tailored resume PDF

## Workflow

1. User registers or logs in.
2. User uploads a resume PDF.
3. User provides a job description and self-description.
4. Backend extracts resume content and sends it to Gemini.
5. AI returns:
   - match score
   - technical and behavioral interview questions
   - skill gaps
   - preparation plan
6. The application stores the generated interview report.
7. User can generate a PDF resume based on the stored report data.

## Notes

- The project currently uses an environment-based MongoDB connection and cookie auth.
- The backend must be started before using the frontend app.
- Ensure your Google Gemini API key has access to the required model usage.

## Future Improvements

- Add password reset flow
- Add resume upload validation and better file handling
- Improve frontend dashboard UX
- Add export to DOCX or HTML resume formats
- Add test coverage for backend APIs

## License

This project is currently unlicensed unless otherwise specified.
