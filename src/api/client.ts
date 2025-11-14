import axios from 'axios';
import type { 
  Vacancy, 
  Profile, 
  VacancyCreate, 
  ProfileCreate, 
  PredictionResponse,
  VacancyFilters,
  ProfileFilters
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Predict API
export const predictProfession = async (text: string): Promise<PredictionResponse> => {
  const response = await apiClient.post<PredictionResponse>('/api/predict', { text });
  return response.data;
};

// Vacancies API
export const createVacancy = async (vacancy: VacancyCreate): Promise<Vacancy> => {
  const response = await apiClient.post<Vacancy>('/api/vacancies', vacancy);
  return response.data;
};

export const getVacancies = async (filters?: VacancyFilters): Promise<Vacancy[]> => {
  const response = await apiClient.get<Vacancy[]>('/api/vacancies', { params: filters });
  return response.data;
};

export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const response = await apiClient.get<Vacancy>(`/api/vacancies/${id}`);
  return response.data;
};

export const getVacancyMatches = async (vacancyId: string, limit: number = 10): Promise<Profile[]> => {
  const response = await apiClient.get<Profile[]>(`/api/vacancies/${vacancyId}/matches`, {
    params: { limit },
  });
  return response.data;
};

// Profiles API
export const createProfile = async (profile: ProfileCreate): Promise<Profile> => {
  const response = await apiClient.post<Profile>('/api/profiles', profile);
  return response.data;
};

export const getProfiles = async (filters?: ProfileFilters): Promise<Profile[]> => {
  const response = await apiClient.get<Profile[]>('/api/profiles', { params: filters });
  return response.data;
};

export const getProfileById = async (id: string): Promise<Profile> => {
  const response = await apiClient.get<Profile>(`/api/profiles/${id}`);
  return response.data;
};

export const getProfileMatches = async (profileId: string, limit: number = 10): Promise<Vacancy[]> => {
  const response = await apiClient.get<Vacancy[]>(`/api/profiles/${profileId}/matches`, {
    params: { limit },
  });
  return response.data;
};

