import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slide-up">
      <div className="text-center py-12 md:py-16">
        <div className="inline-block mb-4">
          <span className="text-6xl">🎯</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Job Matching</span>
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
            Smart Job Search
          </span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 sm:text-xl md:text-2xl">
          Platform for finding jobs and talent using machine learning
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/vacancies/create"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="mr-2">💼</span>
            Post a Job
          </Link>
          <Link
            to="/profiles/create"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="mr-2">👤</span>
            Create Profile
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        <div className="card-hover p-8 bg-gradient-to-br from-primary-50 to-white border-primary-100">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-6 flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                For Employers
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Describe who you're looking for, and our ML model will automatically find suitable candidates with high accuracy
              </p>
              <Link
                to="/vacancies/create"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
              >
                Post a Job
                <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="card-hover p-8 bg-gradient-to-br from-green-50 to-white border-green-100">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="ml-6 flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                For Job Seekers
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Describe your skills, and we'll automatically match you with suitable job opportunities that fit your profile
              </p>
              <Link
                to="/profiles/create"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group"
              >
                Create Profile
                <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          to="/vacancies"
          className="card-hover p-6 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Browse Vacancies
              </h3>
              <p className="text-sm text-gray-600">
                Explore all available job openings with filtering by profession and location
              </p>
            </div>
            <svg className="h-6 w-6 text-gray-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

        <Link
          to="/profiles"
          className="card-hover p-6 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Browse Candidates
              </h3>
              <p className="text-sm text-gray-600">
                Find suitable candidates among all registered job seekers
              </p>
            </div>
            <svg className="h-6 w-6 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>
      </div>

      <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Start Your Search Today
        </h2>
        <p className="text-primary-100 text-lg mb-6 max-w-2xl mx-auto">
          Harness the power of machine learning for perfect candidate and job matching
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/vacancies"
            className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Find Jobs
          </Link>
          <Link
            to="/profiles"
            className="px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg font-semibold hover:bg-white/20 transition-all"
          >
            Find Talent
          </Link>
        </div>
      </div>
    </div>
  );
}
