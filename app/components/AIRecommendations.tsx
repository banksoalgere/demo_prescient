'use client';

import { useState } from 'react';
import { AutomationRecommendation } from '../data/accounts-payable';

interface AIRecommendationsProps {
  recommendations: AutomationRecommendation[];
}

const impactColors = {
  high: 'bg-red-50 text-red-800 border-red-200',
  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  low: 'bg-green-50 text-green-800 border-green-200',
};

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowRecommendations(true);
    }, 2000);
  };

  if (!showRecommendations) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              AI-Powered Automation Insights
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Our AI analyzes your process data to identify bottlenecks, inefficiencies,
              and high-impact automation opportunities tailored to your workflow.
            </p>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`
                px-8 py-3 rounded-xl font-medium text-white text-base transition-colors
                ${isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }
              `}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing Process...
                </span>
              ) : (
                'Generate AI Recommendations'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            AI Recommendations
          </h2>
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
            {recommendations.length} Opportunities Found
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          Based on your process analysis, here are the top automation opportunities
          ranked by potential impact.
        </p>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-gray-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className="p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-gray-900">
                          {rec.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {rec.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${impactColors[rec.impact]}`}>
                        {rec.impact.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {rec.timesSaved}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {expandedIndex === index && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        Affected Activities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.affectedActivities.map((activity, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm border border-gray-200"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        Implementation Approach
                      </h4>
                      <p className="text-gray-700 text-sm bg-white p-3 rounded-lg border border-gray-200">
                        {rec.implementation}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Start Implementation
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> Implementing these recommendations could save your team
            significant time each week and reduce process errors by up to 80%.
          </p>
        </div>
      </div>
    </div>
  );
}
