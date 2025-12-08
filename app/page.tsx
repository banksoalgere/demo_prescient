import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center py-20 px-6">
        <div className="text-center space-y-10 max-w-5xl mx-auto animate-in fade-in duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Enterprise-Grade Process Mining
          </div>

          {/* Hero Title */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Business Processes
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Visualize workflows, identify bottlenecks, and discover AI-powered automation opportunities in minutes
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/process-mining"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50"
            >
              <svg
                className="w-6 h-6 transition-transform group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Launch Demo
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Process Visualization</h3>
              <p className="text-blue-100 leading-relaxed">
                Interactive D3.js charts with top-down flow layouts and real-time performance insights
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Recommendations</h3>
              <p className="text-blue-100 leading-relaxed">
                Smart automation suggestions powered by advanced analytics and machine learning
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Analysis</h3>
              <p className="text-blue-100 leading-relaxed">
                Upload CSV and get immediate, actionable insights without any backend configuration
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-12 flex flex-wrap justify-center gap-12 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Processes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Cost Reduction</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
