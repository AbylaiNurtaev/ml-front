import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVacancy } from '../api/client';
import type { VacancyCreate } from '../types';

export default function CreateVacancy() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<VacancyCreate>({
    employer_name: '',
    description: '',
    location: '',
    salary_min: undefined,
    salary_max: undefined,
    contact_email: '',
    contact_phone: '',
  });

  const descriptionLength = formData.description.length;
  const minLength = 20;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary_min' || name === 'salary_max' 
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
      if (formData.description.length < minLength) {
        setError(`Описание должно содержать минимум ${minLength} символов`);
        setLoading(false);
        return;
      }

      const vacancy = await createVacancy(formData);
      navigate(`/vacancies/${vacancy.id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при создании вакансии');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slide-up">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Создать вакансию
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
            <label htmlFor="employer_name" className="block text-sm font-semibold text-gray-700 mb-2">
              Название компании <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="employer_name"
              name="employer_name"
              required
              value={formData.employer_name}
              onChange={handleChange}
              placeholder="Tech Company Inc."
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Описание требований <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={8}
              minLength={minLength}
              value={formData.description}
              onChange={handleChange}
              placeholder="Опишите, кого вы ищете. Например: Ищем опытного разработчика Python с опытом работы с Django, PostgreSQL, Docker. Требуется знание REST API, Git, Linux..."
              className="input-field resize-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                ML-модель автоматически определит подходящую профессию
              </p>
              <span className={`text-sm font-medium ${
                descriptionLength < minLength 
                  ? 'text-red-500' 
                  : descriptionLength < minLength * 2
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}>
                {descriptionLength} / {minLength}+
              </span>
            </div>
            {descriptionLength > 0 && descriptionLength < minLength && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(descriptionLength / minLength) * 100}%` }}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="salary_min" className="block text-sm font-semibold text-gray-700 mb-2">
                  Зарплата от
                </label>
                <input
                  type="number"
                  id="salary_min"
                  name="salary_min"
                  value={formData.salary_min || ''}
                  onChange={handleChange}
                  placeholder="150000"
                  min="0"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="salary_max" className="block text-sm font-semibold text-gray-700 mb-2">
                  Зарплата до
                </label>
                <input
                  type="number"
                  id="salary_max"
                  name="salary_max"
                  value={formData.salary_max || ''}
                  onChange={handleChange}
                  placeholder="250000"
                  min="0"
                  className="input-field"
                />
              </div>
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
                placeholder="hr@company.com"
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
                placeholder="+7 (999) 123-45-67"
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
              disabled={loading || descriptionLength < minLength}
              className="btn-primary order-1 sm:order-2 min-w-[140px]"
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
                'Создать вакансию'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
