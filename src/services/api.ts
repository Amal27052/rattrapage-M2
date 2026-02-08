import axios from 'axios';
import type {
  User,
  Space,
  Booking,
  DashboardStats,
  LoginCredentials,
  AuthResponse,
  BookingCreateData,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Instance Axios configurée
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// === AUTH ===
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

// === SPACES ===
export const spacesApi = {
  getAll: async (): Promise<Space[]> => {
    const { data } = await api.get('/spaces');
    return data;
  },

  getById: async (id: string): Promise<Space> => {
    const { data } = await api.get(`/spaces/${id}`);
    return data;
  },

  checkAvailability: async (
    spaceId: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> => {
    const { data } = await api.post(`/spaces/${spaceId}/check-availability`, {
      startTime,
      endTime,
    });
    return data.available;
  },
};

// === BOOKINGS ===
export const bookingsApi = {
  getMyBookings: async (): Promise<Booking[]> => {
    const { data } = await api.get('/bookings/my');
    return data;
  },

  getById: async (id: string): Promise<Booking> => {
    const { data } = await api.get(`/bookings/${id}`);
    return data;
  },

  create: async (bookingData: BookingCreateData): Promise<Booking> => {
    const { data } = await api.post('/bookings', bookingData);
    return data;
  },

  cancel: async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  },

  getQRCode: async (id: string): Promise<string> => {
    const { data } = await api.get(`/bookings/${id}/qr-code`);
    return data.qrCode;
  },
};

// === DASHBOARD ===
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get('/dashboard/stats');
    return data;
  },
};

export default api;
