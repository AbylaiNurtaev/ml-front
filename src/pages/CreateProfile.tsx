import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProfile } from '../api/client';
import type { ProfileCreate } from '../types';

export default function CreateProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileCreate>({
    name: '',
    skills: '',
    location: '',
    expected_salary: undefined,
    contact_email: '',
    contact_phone: '',
  });

  const skillsLength = formData.skills.length;
  const minLength = 20;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'expected_salary' 
        ? (value === '' ? undefined : Number(value))
        : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.skills.length < minLength) {
        setError(`Описание навыков должно содержать минимум ${minLength} символов`);
        setLoading(false);
        return;
      }

      const profile = await createProfile(formData);
      navigate(`/profiles/${profile.id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при создании профиля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slide-up">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Создать профиль соискателя
          </h1>
          <p className="text-gray-600">
            Заполните форму ниже, и наша ML-модель автоматически определит подходящую профессию
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Имя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
              Навыки и опыт <span className="text-red-500">*</span>
            </label>
            <textarea
              id="skills"
              name="skills"
              required
              rows={8}
              minLength={minLength}
              value={formData.skills}
              onChange={handleChange}
              placeholder="Опишите свои навыки и опыт. Например: Опыт работы с Python 5 лет, Django, PostgreSQL, Docker, REST API, Git. Разрабатывал микросервисы, работал с CI/CD..."
              className="input-field resize-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                ML-модель автоматически определит подходящую профессию
              </p>
              <span className={`text-sm font-medium ${
                skillsLength < minLength 
                  ? 'text-red-500' 
                  : skillsLength < minLength * 2
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}>
                {skillsLength} / {minLength}+
              </span>
            </div>
            {skillsLength > 0 && skillsLength < minLength && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(skillsLength / minLength) * 100}%` }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">📍</span>Местоположение
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Москва"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="expected_salary" className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">💰</span>Ожидаемая зарплата
              </label>
              <input
                type="number"
                id="expected_salary"
                name="expected_salary"
                value={formData.expected_salary || ''}
                onChange={handleChange}
                placeholder="200000"
                min="0"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact_email" className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">✉️</span>Email для связи
              </label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="ivan@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="contact_phone" className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">📞</span>Телефон для связи
              </label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="+7 (999) 765-43-21"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary order-2 sm:order-1"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading || skillsLength < minLength}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 min-w-[140px]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Создание...
                </span>
              ) : (
                'Создать профиль'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
