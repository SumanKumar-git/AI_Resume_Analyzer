
import { useState } from 'react';
import { useInterview } from '../hooks/useInterview';
import Loader from '../../auth/components/Loader';
import { useParams } from 'react-router';

const Interview = () => {

    const {report, getResumePdf, loading} = useInterview();
    const [activeSection, setActiveSection] = useState('technical');
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const {interviewId} = useParams();

    const toggleQuestion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
      }));
    };

    if(!report){
      return(
        <main><Loader/></main>
      )
    }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-900 border-red-700 text-red-100';
      case 'Medium': return 'bg-yellow-900 border-yellow-700 text-yellow-100';
      case 'Low': return 'bg-green-900 border-green-700 text-green-100';
      default: return 'bg-gray-700 border-gray-600 text-gray-200';
    }
  };

  const currentQuestions = activeSection === 'technical'
    ? report.technicalQuestions
    : report.behavioralQuestions;

  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-green-400 border-green-400';
    if (score >= 60) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  const getMatchScoreText = (score) => {
    if (score >= 80) return 'Strong match for this role';
    if (score >= 60) return 'Good fit with some gaps';
    return 'Needs more preparation';
  };

  return (
    <main className="w-full min-h-screen bg-gray-900 text-white p-6">
      {
        loading && <Loader/>
      }
      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR - NAVIGATION */}
        <div className="col-span-2 bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg p-6 h-fit sticky top-6">
            <h3 className="text-xs font-bold text-pink-300 mb-6 uppercase tracking-widest" style={{textShadow: '0 0 10px rgba(236, 72, 153, 0.6)'}}>Sections</h3>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('technical')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                activeSection === 'technical'
                  ? 'bg-pink-500 bg-opacity-20 border-l-4 border-pink-500'
                  : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'
              }`}
              style={activeSection === 'technical' ? {textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'} : {}}
            >
              <span className="text-lg shrink-0">{'</>'}</span>
              <span className={`font-semibold text-sm transition-colors ${activeSection === 'technical' ? 'text-pink-200' : 'text-gray-100'}`} style={activeSection === 'technical' ? {textShadow: '0 0 15px rgba(236, 72, 153, 0.8)'} : {}}>Technical Questions</span>
            </button>
            <button
              onClick={() => setActiveSection('behavioral')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                activeSection === 'behavioral'
                  ? 'bg-pink-500 bg-opacity-20 border-l-4 border-pink-500'
                  : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'
              }`}
              style={activeSection === 'behavioral' ? {textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'} : {}}
            >
              <span className="text-lg shrink-0">💬</span>
              <span className={`font-semibold text-sm transition-colors ${activeSection === 'behavioral' ? 'text-pink-200' : 'text-gray-100'}`} style={activeSection === 'behavioral' ? {textShadow: '0 0 15px rgba(236, 72, 153, 0.8)'} : {}}>Behavioral Questions</span>
            </button>
            <button
              onClick={() => setActiveSection('roadmap')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                activeSection === 'roadmap'
                  ? 'bg-pink-500 bg-opacity-20 border-l-4 border-pink-500'
                  : 'bg-gray-700 bg-opacity-30 hover:bg-opacity-50'
              }`}
              style={activeSection === 'roadmap' ? {textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'} : {}}
            >
              <span className="text-lg shrink-0">🗺️</span>
              <span className={`font-semibold text-sm transition-colors ${activeSection === 'roadmap' ? 'text-pink-200' : 'text-gray-100'}`} style={activeSection === 'roadmap' ? {textShadow: '0 0 15px rgba(236, 72, 153, 0.8)'} : {}}>Road Map</span>
            </button>
          </nav>
          <button onClick={() => {getResumePdf(interviewId)}} className='cursor-pointer w-full text-center mt-2 px-2 py-2 rounded-lg bg-linear-to-bl from-pink-500 to-blue-600'>Download Resume</button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="col-span-7 bg-gray-800 border border-gray-700 rounded-lg p-6">
          {activeSection !== 'roadmap' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {activeSection === 'technical' ? 'Technical Questions' : 'Behavioral Questions'}
                </h2>
                <p className="text-gray-400 text-sm">{currentQuestions.length} questions</p>
              </div>

              <div className="space-y-3">
                {currentQuestions.map((q, idx) => (
                  <div key={q.id} className="border border-gray-700 rounded-lg overflow-hidden bg-gray-700 bg-opacity-50">
                    <button
                      onClick={() => toggleQuestion(q.id)}
                  className="w-full px-4 py-4 flex items-start gap-4 hover:bg-gray-600 hover:bg-opacity-50 transition-colors text-left"
                    >
                      <span className="text-pink-500 font-bold text-lg min-w-fit">Q{idx + 1}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">{q.question}</p>
                      </div>
                      <span className={`text-gray-400 text-xl transition-transform ${expandedQuestions[q.id] ? 'rotate-180' : ''}`}>
                        ⌄
                      </span>
                    </button>

                    {expandedQuestions[q.id] && (
                      <div className="px-4 py-4 border-t border-gray-600 bg-gray-700 bg-opacity-20">
                        <div className="mb-4">
                          <p className="text-xs font-bold text-purple-400 uppercase tracking-wide mb-1">Intention</p>
                          <p className="text-gray-300 text-sm">{q.intention}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-400 uppercase tracking-wide mb-1">Model Answer</p>
                          <p className="text-gray-300 text-sm">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Preparation Road Map</h2>
                <p className="text-gray-400 text-sm">7-day plan</p>
              </div>

              <div className="space-y-6">
                {report.preparationPlan.map((day, idx) => (
                  <div key={idx} className="flex gap-4">
                    {/* Timeline dot and line */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-pink-500 border-2 border-gray-800 z-10"></div>
                      {idx < report.preparationPlan.length - 1 && (
                        <div className="w-0.5 h-24 bg-linear-to-b from-pink-500 to-purple-500 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6 w-full">
                      <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded">Day {day.day}</span>
                          <h3 className="font-bold text-white">{day.focus}</h3>
                        </div>
                        <ul className="space-y-2">
                          {day.tasks.map((task, taskIdx) => (
                            <li key={taskIdx} className="flex gap-2 text-sm text-gray-300">
                              <span className="text-pink-500 mt-1">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - SCORE & GAPS */}
        <div className="col-span-3 space-y-6">
          {/* MATCH SCORE */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Match Score</h3>
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-3 ${getMatchScoreColor(report.matchScore)}`}>
              <span className="text-4xl font-bold">{report.matchScore}</span>
            </div>
            <p className={`text-sm font-medium ${getMatchScoreColor(report.matchScore).split(' ')[0]}`}>
              {getMatchScoreText(report.matchScore)}
            </p>
          </div>

          {/* SKILL GAPS */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Skill Gaps</h3>
            <div className="space-y-3">
              {report.skillGaps.map((gap, idx) => (
                <div key={idx} className={`border rounded-lg p-3 ${getSeverityColor(gap.severity)}`}>
                  <p className="text-sm font-medium">{gap.skill}</p>
                  <p className="text-xs mt-1 opacity-75">{gap.severity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interview;

export const MsgSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" /></svg>
    )
}