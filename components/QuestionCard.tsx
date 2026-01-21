
import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const isCorrect = selectedOption === question.correctOption;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Question {index + 1} • {question.topic}
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              question.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
            }`}>
              {question.difficulty}
            </span>
          </div>
        </div>
      </div>

      <p className="text-lg text-slate-800 font-medium mb-8 leading-relaxed">
        {question.questionText}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              if (!selectedOption) setSelectedOption(key);
            }}
            disabled={!!selectedOption}
            className={`flex items-center p-4 rounded-xl border-2 text-left transition-all ${
              selectedOption === key
                ? key === question.correctOption
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : selectedOption && key === question.correctOption
                ? 'border-green-500 bg-green-50'
                : 'border-slate-100 bg-slate-50 hover:border-indigo-200'
            }`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-4 ${
               selectedOption === key
                ? key === question.correctOption
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : selectedOption && key === question.correctOption
                ? 'bg-green-500 text-white'
                : 'bg-white text-slate-500 shadow-sm'
            }`}>
              {key}
            </span>
            <span className="text-slate-700 font-medium">{value}</span>
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <div className="font-bold flex items-center gap-2">
              {isCorrect ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Correct Answer!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  Incorrect. The correct option is {question.correctOption}.
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-indigo-600 text-sm font-semibold hover:underline flex items-center gap-1 mb-4"
          >
            {showExplanation ? 'Hide Explanation' : 'View Detailed Explanation'}
            <svg className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>

          {showExplanation && (
            <div className="p-6 bg-indigo-50 rounded-xl text-indigo-900 border border-indigo-100 text-sm leading-relaxed whitespace-pre-wrap">
              <h4 className="font-bold mb-2">Step-by-step Solution:</h4>
              {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
