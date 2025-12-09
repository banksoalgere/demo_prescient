import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-20 px-6">
        <div className="text-center space-y-12 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">
            Enterprise-Grade Process Mining
          </div>

          {/* Hero Title */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-semibold text-gray-900 leading-tight tracking-tight">
              Transform Your
              <span className="block">Business Processes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Visualize workflows, identify bottlenecks, and discover AI-powered automation opportunities in minutes
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/process-mining"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Launch Demo
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Process Visualization</h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive D3.js charts with top-down flow layouts and real-time performance insights
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart automation suggestions powered by advanced analytics and machine learning
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Instant Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload CSV and get immediate, actionable insights without any backend configuration
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-16 flex flex-wrap justify-center gap-16 text-gray-900">
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">10k+</div>
              <div className="text-gray-600 text-sm">Processes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">85%</div>
              <div className="text-gray-600 text-sm">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">$2M+</div>
              <div className="text-gray-600 text-sm">Cost Reduction</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
