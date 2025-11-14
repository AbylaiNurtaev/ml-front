import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVacancyById, getVacancyMatches } from '../api/client';
import type { Vacancy, Profile } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function VacancyDetail() {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadVacancy();
      loadMatches();
    }
  }, [id]);

  const loadVacancy = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVacancyById(id!);
      setVacancy(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error loading vacancy');
    } finally {
      setLoading(false);
    }
  };

  const loadMatches = async () => {
    if (!id) return;
    setLoadingMatches(true);
    try {
      const data = await getVacancyMatches(id, 20);
      setMatches(data);
    } catch (err: any) {
      console.error('Error loading matches:', err);
    } finally {
      setLoadingMatches(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `from $${min.toLocaleString()}`;
    if (max) return `up to $${max.toLocaleString()}`;
    return 'Not specified';
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !vacancy) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error || 'Vacancy not found'}
          </div>
        </div>
        <Link to="/vacancies" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Vacancies
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slide-up">
      <Link
        to="/vacancies"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 group"
      >
        <svg className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Вернуться к списку вакансий
      </Link>

      <div className="card p-6 md:p-8 mb-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{vacancy.employer_name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold text-sm">
                  💼 {vacancy.predicted_profession}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                  {Math.round(vacancy.confidence * 100)}% confidence
                </span>
                <span className="text-sm text-gray-500">
                  📅 {formatDate(vacancy.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📝</span>
            Job Requirements
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{vacancy.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
          {vacancy.location && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Location</p>
                <p className="text-gray-900 font-medium">{vacancy.location}</p>
              </div>
            </div>
          )}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Salary</p>
              <p className="text-gray-900 font-medium">{formatSalary(vacancy.salary_min, vacancy.salary_max)}</p>
            </div>
          </div>
          {vacancy.contact_email && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
                <a href={`mailto:${vacancy.contact_email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                  {vacancy.contact_email}
                </a>
              </div>
            </div>
          )}
          {vacancy.contact_phone && (
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Phone</p>
                <a href={`tel:${vacancy.contact_phone}`} className="text-primary-600 hover:text-primary-700 font-medium">
                  {vacancy.contact_phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Matching Candidates
            </h2>
            <p className="text-gray-600">
              {matches.length > 0 ? `${matches.length} matching candidates found` : 'Searching for matching candidates...'}
            </p>
          </div>
        </div>

        {loadingMatches && (
          <div className="grid gap-4">
            {[...Array(2)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        )}

        {!loadingMatches && matches.length === 0 && (
          <EmptyState
            title="No Matching Candidates Found"
            description="Try changing the job description or check back later"
            icon="👤"
          />
        )}

        {!loadingMatches && matches.length > 0 && (
          <div className="grid gap-4">
            {matches.map((profile, index) => (
              <Link
                key={profile.id}
                to={`/profiles/${profile.id}`}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {profile.name}
                      </h3>
                      <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {Math.round(profile.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{profile.skills}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg font-medium">
                        💼 {profile.predicted_profession}
                      </span>
                      {profile.location && (
                        <span className="inline-flex items-center text-gray-600">
                          📍 {profile.location}
                        </span>
                      )}
                      {profile.expected_salary && (
                        <span className="inline-flex items-center text-gray-600">
                          💰 ${profile.expected_salary.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <svg className="h-6 w-6 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all ml-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
