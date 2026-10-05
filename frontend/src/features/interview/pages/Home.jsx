import { useNavigate } from 'react-router';
import Loader from '../../auth/components/Loader';
import { useInterview } from '../hooks/useInterview';
import { useRef, useState } from 'react';

const Home = () => {

    const { loading, generateReport, reports } = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const resumeInputRef = useRef();
    const navigate = useNavigate();


    // const [charCount, setCharCount] = useState(0);

    const MAX_CHARS = 5000;

    // const handleJobDescriptionChange = (e) => {
    // const text = e.target.value;
    // if (text.length <= MAX_CHARS) {
    //     setJobDescription(text);
    //     setCharCount(text.length);
    //     }
    // };

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];

        try{
            const data = await generateReport({resumeFile, jobDescription, selfDescription});
            navigate(`/interview/${data._id}`)
        }
        catch(error){
            console.log(error.message)
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
    <main className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 py-8">
        {
            loading && <Loader/>
        }
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Create Your AI <span className="bg-linear-to-r from-pink-600 to-blue-500 bg-clip-text text-transparent">Interview Plan</span>
          </h1>
          <p className="text-gray-400 text-base">
            Let our AI analyze the job requirements and your unique profile to build a winning strategy.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN: Target Job Description */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <JobDescriptionSvg />
                <h2 className="text-xl font-bold text-white">Target Job Description</h2>
                <span className="ml-2 px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded">Required</span>
              </div>
              
              <textarea
                onChange={(e) => {setJobDescription(e.target.value)}}
                value={jobDescription}
                className="w-full h-full bg-gray-700 border-2 border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none resize-none"
                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              />
              
              {/* <div className="text-right text-sm text-gray-500">
                {charCount} / {MAX_CHARS} chars
              </div> */}
            </div>

            {/* RIGHT COLUMN: Your Profile */}
            <div className="flex flex-col gap-6">
              {/* Profile Header */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-sm">●</span>
                </div>
                <h2 className="text-xl font-bold text-white">Your Profile</h2>
              </div>

              {/* Resume Upload Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-white font-medium">Upload Resume</label>
                  <span className="text-pink-500 text-sm font-bold">Best Result</span>
                </div>
                
                <label className="bg-gray-700 border-2 border-dashed border-gray-600 hover:border-pink-500 rounded-lg p-6 cursor-pointer transition-colors flex flex-col items-center justify-center gap-3">
                  <div className="text-pink-500 text-3xl">⬆</div>
                  <div className="text-center">
                    <p className="text-white font-medium">Click to upload or drag & drop</p>
                    <p className="text-gray-400 text-sm">PDF (Max 4MB)</p>
                  </div>
                  <input ref={resumeInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                  />
                </label>
                
                {/* {resumeFile && (
                  <p className="text-sm text-green-400">✓ {resumeFile.name} uploaded</p>
                )} */}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <div className="flex-1 border-t border-gray-600"></div>
                <span>OR</span>
                <div className="flex-1 border-t border-gray-600"></div>
              </div>

              {/* Quick Self-Description */}
              <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Quick Self-Description</label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => {setSelfDescription(e.target.value)}}
                  className="w-full h-32 bg-gray-700 border-2 border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none resize-none"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 text-sm text-blue-100">
                <p>
                  <span className="font-bold">Either a Resume or a Self Description</span> is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </form>

          {/* Footer Section */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
              disabled={loading}
                onClick={handleGenerateReport}
                className="bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <StarSvg/>
                Generate My Interview Report
              </button>
            </div>

            {/* Footer Info */}
            <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
              <span>⚡ AI-Powered Strategy Generation • Approx 30s</span>
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Recent Reports <span className="bg-linear-to-r from-pink-600 to-blue-500 bg-clip-text text-transparent">Generated</span>
            </h2>
            <p className="text-gray-400 text-base">Your interview preparation plans from recent session</p>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              reports.length > 0 ? (
                reports.map((report) => (
                  <div onClick={() => navigate(`/interview/${report._id}`)} className="bg-linear-to-bl from-gray-700 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-pink-500 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <DocumentSvg />
                </div>
                <p className="text-base text-gray-400">Match Score : {report.matchScore}</p>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">{report.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarSvg />
                <span>Created on {new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
                ))
              ) :
              <div className=' text-gray-400 border border-gray-700 bg-gray-800 w-fit p-3 rounded-md'>Interview report generated : 0</div>
            }
          </div>
        </div>
      </div>
    </main>
  );
}

const JobDescriptionSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /></svg>
  );
};

export default Home;

const StarSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 19a1 1 0 0 1 0 -2a1 1 0 0 0 1 -1c0 -1.333 2 -1.333 2 0a1 1 0 0 0 1 1c1.333 0 1.333 2 0 2a1 1 0 0 0 -1 1c0 1.333 -2 1.333 -2 0a1 1 0 0 0 -1 -1" /><path d="M3 11a5 5 0 0 0 5 -5c0 -1.333 2 -1.333 2 0a5 5 0 0 0 5 5c1.333 0 1.333 2 0 2a5 5 0 0 0 -5 5a1 1 0 0 1 -2 0a5 5 0 0 0 -5 -5c-1.333 0 -1.333 -2 0 -2" /><path d="M16 7a1 1 0 0 1 0 -2a1 1 0 0 0 1 -1c0 -1.333 2 -1.333 2 0a1 1 0 0 0 1 1c1.333 0 1.333 2 0 2a1 1 0 0 0 -1 1c0 1.333 -2 1.333 -2 0a1 1 0 0 0 -1 -1" /></svg>
    )
}

const DocumentSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
    )
}

const CalendarSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    )
}