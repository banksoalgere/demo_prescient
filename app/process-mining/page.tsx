'use client';

import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ProcessMap from '../components/ProcessMap';
import AIRecommendations from '../components/AIRecommendations';
import {
  ACCOUNTS_PAYABLE_CSV,
  parseCSV,
  generateProcessMap,
  generateRecommendations,
  ProcessNode,
  ProcessFlow,
  AutomationRecommendation
} from '../data/accounts-payable';

export default function ProcessMiningPage() {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [processData, setProcessData] = useState<{
    nodes: ProcessNode[];
    flows: ProcessFlow[];
    recommendations: AutomationRecommendation[];
  } | null>(null);

  const handleFileLoaded = () => {
    // Use hardcoded CSV data
    const events = parseCSV(ACCOUNTS_PAYABLE_CSV);
    const { nodes, flows } = generateProcessMap(events);
    const recommendations = generateRecommendations(events);

    setProcessData({ nodes, flows, recommendations });
    setFileLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">
            Process Mining & Automation Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your process data to visualize workflows, identify bottlenecks,
            and discover AI-powered automation opportunities
          </p>
        </div>

        {/* File Upload Section */}
        {!fileLoaded && (
          <div className="mb-12">
            <FileUpload onFileLoaded={handleFileLoaded} />
          </div>
        )}

        {/* Process Visualization */}
        {fileLoaded && processData && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-600">
                    Total Cases
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">
                  {new Set(parseCSV(ACCOUNTS_PAYABLE_CSV).map(e => e.caseId)).size.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  +12% from last month
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-600">
                    Process Steps
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">
                  {processData.nodes.length}
                </div>
                <div className="text-sm text-gray-600">
                  Distinct activities
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-600">
                    Total Events
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">
                  {parseCSV(ACCOUNTS_PAYABLE_CSV).length.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Process executions
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-600">
                    AI Insights
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">
                  {processData.recommendations.length}
                </div>
                <div className="text-sm text-gray-600">
                  Automation opportunities
                </div>
              </div>
            </div>

            {/* Process Map */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Process Flow Visualization
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Top-down process map with intelligent bottleneck detection
                  </p>
                </div>
                <button
                  onClick={() => setFileLoaded(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Upload New File
                </button>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500"></div>
                  <span className="text-sm text-gray-700 font-medium">Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-green-500"></div>
                  <span className="text-sm text-gray-700 font-medium">Completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-500"></div>
                  <span className="text-sm text-gray-700 font-medium">Manual Task</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-purple-500"></div>
                  <span className="text-sm text-gray-700 font-medium">Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-red-500"></div>
                  <span className="text-sm text-gray-700 font-medium">Rejection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-500"></div>
                  <span className="text-sm text-gray-700 font-medium">System Task</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-6 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700 font-medium">Normal Flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-6 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700 font-medium">Bottleneck</span>
                </div>
              </div>

              {/* Process Map */}
              <ProcessMap nodes={processData.nodes} flows={processData.flows} />

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Hover over nodes and flows for detailed metrics. Use zoom controls to navigate.
                </p>
              </div>
            </div>

            {/* AI Recommendations */}
            <AIRecommendations recommendations={processData.recommendations} />

            {/* Key Insights */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Key Process Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-2">Bottlenecks Detected</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Manual Data Entry appears {processData.nodes.find(n => n.name === 'Manual Data Entry')?.count.toLocaleString() || 0} times</li>
                    <li>• Rejection and rework cycles identified</li>
                    <li>• Average approval time could be reduced</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Success Patterns</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• {processData.nodes.find(n => n.name === 'Payment Processed')?.count.toLocaleString() || 0} invoices successfully processed</li>
                    <li>• Automated payment scheduling working well</li>
                    <li>• Clear approval workflows established</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-2">Rework & Waste</h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• {parseCSV(ACCOUNTS_PAYABLE_CSV).filter(e => e.activity.includes('Rejected')).length.toLocaleString()} rejection events</li>
                    <li>• Duplicate invoice checks needed</li>
                    <li>• PO validation causing delays</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Automation Potential</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 70-80% of manual tasks can be automated</li>
                    <li>• AI can handle data extraction and validation</li>
                    <li>• Smart routing can reduce approval time by 50%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            This is a demo using hardcoded accounts payable data.
            In production, your actual CSV data would be analyzed.
          </p>
        </div>
      </div>
    </div>
  );
}
