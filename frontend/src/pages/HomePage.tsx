import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <span className="text-white text-3xl font-bold">N</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
            Noura
          </span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          AI-powered health programs personalized to your unique needs — from diet & fitness to physical therapy recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-4">
        <Link
          to="/fitness"
          className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-brand-400 hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-brand-200 transition-colors">
            🏋️
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Diet & Fitness</h2>
          <p className="text-sm text-gray-500">
            Get a personalized nutrition plan and weekly workout schedule based on your goals and body stats.
          </p>
          <div className="mt-4 text-brand-600 text-sm font-medium group-hover:text-brand-700">
            Get started →
          </div>
        </Link>

        <Link
          to="/physical-therapy"
          className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-accent-400 hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-accent-200 transition-colors">
            🩺
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Physical Therapy</h2>
          <p className="text-sm text-gray-500">
            Receive a customized rehabilitation program with phase-based exercises matched to your recovery stage.
          </p>
          <div className="mt-4 text-accent-600 text-sm font-medium group-hover:text-accent-700">
            Get started →
          </div>
        </Link>
      </div>

      <p className="mt-10 text-xs text-gray-400 max-w-md">
        Noura uses Claude AI to generate personalized programs. Always consult a licensed healthcare professional before starting any new fitness or rehabilitation program.
      </p>
    </div>
  );
}
