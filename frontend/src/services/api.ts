import axios from 'axios';
import { 
  User, 
  GovernmentProgram, 
  EligibilityInput, 
  EligibilityResponse, 
  EligibilityCheck,
  ApplicationStatus,
  UserDocument,
  AuthResponse 
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout/');
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile/update/', userData);
    return response.data;
  },
};

// Eligibility API
export const eligibilityAPI = {
  getPrograms: async (): Promise<GovernmentProgram[]> => {
    const response = await api.get('/eligibility/programs/');
    return response.data;
  },

  checkEligibility: async (data: EligibilityInput): Promise<EligibilityResponse> => {
    const response = await api.post('/eligibility/check/', data);
    return response.data;
  },

  getEligibilityHistory: async (): Promise<EligibilityCheck[]> => {
    const response = await api.get('/eligibility/history/');
    return response.data;
  },

  getApplications: async (): Promise<ApplicationStatus[]> => {
    const response = await api.get('/eligibility/applications/');
    return response.data;
  },

  createApplication: async (data: { program_id: number; status: string; notes?: string }): Promise<ApplicationStatus> => {
    const response = await api.post('/eligibility/applications/', data);
    return response.data;
  },

  updateApplication: async (id: number, data: Partial<ApplicationStatus>): Promise<ApplicationStatus> => {
    const response = await api.put(`/eligibility/applications/${id}/`, data);
    return response.data;
  },

  getStatistics: async (): Promise<{
    total_programs: number;
    total_eligibility_checks: number;
    total_applications: number;
    program_type_distribution: Record<string, number>;
  }> => {
    const response = await api.get('/eligibility/statistics/');
    return response.data;
  },
};

// Documents API
export const documentsAPI = {
  getDocuments: async (): Promise<UserDocument[]> => {
    const response = await api.get('/auth/documents/');
    return response.data;
  },

  uploadDocument: async (file: File, documentType: string): Promise<UserDocument> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);

    const response = await api.post('/auth/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;