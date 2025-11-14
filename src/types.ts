export interface Vacancy {
  id: string;
  employer_name: string;
  description: string;
  predicted_profession: string;
  confidence: number;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  contact_email?: string;
  contact_phone?: string;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string;
  skills: string;
  predicted_profession: string;
  confidence: number;
  location?: string;
  expected_salary?: number;
  contact_email?: string;
  contact_phone?: string;
  created_at: string;
}

export interface VacancyCreate {
  employer_name: string;
  description: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  contact_email?: string;
  contact_phone?: string;
}

export interface ProfileCreate {
  name: string;
  skills: string;
  location?: string;
  expected_salary?: number;
  contact_email?: string;
  contact_phone?: string;
}

export interface PredictionResponse {
  predicted_title: string;
  confidence: number;
  top_predictions: Array<{
    title: string;
    probability: number;
  }>;
}

export interface VacancyFilters {
  profession?: string;
  location?: string;
  limit?: number;
  skip?: number;
}

export interface ProfileFilters {
  profession?: string;
  location?: string;
  limit?: number;
  skip?: number;
}

