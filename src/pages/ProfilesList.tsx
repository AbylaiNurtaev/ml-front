import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfiles } from '../api/client';
import type { Profile } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function ProfilesList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    profession: '',
    location: '',
  });

  useEffect(() => {
    loadProfiles();
  }, [filters]);

  const loadProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfiles({
        profession: filters.profession || undefined,
        location: filters.location || undefined,
        limit: 50,
      });
      setProfiles(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при загрузке профилей');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slide-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Соискатели</h1>
          <p className="text-gray-600">
            {profiles.length > 0 && !loading ? `${profiles.length} соискателей найдено` : 'Найдите подходящего кандидата'}
          </p>
        </div>
        <Link
          to="/profiles/create"
          className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 whitespace-nowrap"
        >
          <span className="mr-2">➕</span>
          Создать профиль
        </Link>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Фильтр по профессии
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={filters.profession}
              onChange={handleFilterChange}
              placeholder="Software Engineer, Developer..."
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              📍 Фильтр по местоположению
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Москва, Санкт-Петербург..."
              className="input-field"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {!loading && !error && profiles.length === 0 && (
        <EmptyState
          title="Профили не найдены"
          description="Попробуйте изменить фильтры или создайте новый профиль"
          icon="👥"
          action={{
            label: 'Создать профиль',
            href: '/profiles/create'
          }}
        />
      )}

      {!loading && !error && profiles.length > 0 && (
        <div className="grid gap-6">
          {profiles.map((profile, index) => (
            <Link
              key={profile.id}
              to={`/profiles/${profile.id}`}
              className="card-hover p-6 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {profile.name}
                    </h3>
                    <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                      {Math.round(profile.confidence * 100)}% уверенность
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{profile.skills}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg font-medium">
                      💼 {profile.predicted_profession}
                    </span>
                    {profile.location && (
                      <span className="inline-flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </span>
                    )}
                    {profile.expected_salary && (
                      <span className="inline-flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {profile.expected_salary.toLocaleString()} ₽
                      </span>
                    )}
                    <span className="inline-flex items-center text-gray-500">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(profile.created_at)}
                    </span>
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
  );
}
