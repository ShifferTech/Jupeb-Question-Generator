
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { QuestionCard } from './components/QuestionCard';
import { SkeletonLoader } from './components/SkeletonLoader';
import { Subject, Question } from './types';
import { JUPEB_CURRICULUM } from './constants';
import { generateJUPEBQuestions } from './services/geminiService';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.MATHEMATICS);
  const [selectedTopic, setSelectedTopic] = useState<string>(JUPEB_CURRICULUM[0].topics[0]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateJUPEBQuestions(selectedSubject, selectedTopic);
      setQuestions(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedSubject, selectedTopic]);

  // Initial load effect
  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubjectChange = (subject: Subject) => {
    const subjectData = JUPEB_CURRICULUM.find(s => s.name === subject);
    setSelectedSubject(subject);
    if (subjectData) {
      setSelectedTopic(subjectData.topics[0]);
    }
  };

  return (
    <Layout>
      <div className="bg-indigo-600 pb-32 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            JUPEB AI Question Bank
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Generate curriculum-standard past questions instantly. Practice with AI-generated problems designed to match the difficulty of actual JUPEB examinations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {JUPEB_CURRICULUM.map((s) => (
              <button
                key={s.name}
                onClick={() => handleSubjectChange(s.name)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                  selectedSubject === s.name
                    ? 'bg-white text-indigo-600 shadow-xl scale-105'
                    : 'bg-indigo-500 text-white hover:bg-indigo-400'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                Select Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-medium text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {JUPEB_CURRICULUM.find(s => s.name === selectedSubject)?.topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={fetchQuestions}
              disabled={loading}
              className="md:self-end bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-100"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Generate New Questions
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl mb-10 text-center">
              <p className="font-bold mb-1">Oops! Something went wrong.</p>
              <p className="text-sm">{error}</p>
              <button 
                onClick={fetchQuestions}
                className="mt-4 text-sm font-bold underline"
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-8">
              {questions.length > 0 ? (
                questions.map((q, idx) => (
                  <QuestionCard key={q.id} question={q} index={idx} />
                ))
              ) : !error && (
                <div className="text-center py-20 text-slate-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  <p className="text-lg">Select a topic and click generate to begin practicing.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
