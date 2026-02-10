/**
 * SERVICE API
 * 
 * Ce fichier contient toutes les fonctions pour communiquer avec le backend.
 * Chaque fonction fait une requête HTTP (GET, POST, etc.) vers l'API.
 */

import axios from 'axios';
import type { User, Space, Booking, LoginCredentials, LoginResponse } from '../types';

// URL de base de l'API (vient du fichier .env)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ========================================
// CONFIGURATION AXIOS
// ========================================
// Axios est une bibliothèque pour faire des requêtes HTTP

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur : ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========================================
// FONCTIONS D'AUTHENTIFICATION
// ========================================

/**
 * Se connecter avec email et mot de passe
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', credentials);
  
  // Si la connexion réussit, on sauvegarde le token
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

/**
 * Se déconnecter (supprimer le token)
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Récupérer l'utilisateur connecté depuis le localStorage
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Vérifier si l'utilisateur est connecté
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// ========================================
// FONCTIONS POUR LES ESPACES
// ========================================

/**
 * Récupérer tous les espaces disponibles
 */
export const getSpaces = async (): Promise<Space[]> => {
  const response = await api.get('/spaces');
  return response.data;
};

/**
 * Récupérer un espace par son ID
 */
export const getSpaceById = async (id: string): Promise<Space> => {
  const response = await api.get(`/spaces/${id}`);
  return response.data;
};

// ========================================
// FONCTIONS POUR LES RÉSERVATIONS
// ========================================

/**
 * Créer une nouvelle réservation
 */
export const createBooking = async (bookingData: {
  spaceId: string;
  date: string;
  startTime: string;
  endTime: string;
}): Promise<Booking> => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

/**
 * Récupérer toutes mes réservations
 */
export const getMyBookings = async (): Promise<Booking[]> => {
  const response = await api.get('/bookings/my');
  return response.data;
};

/**
 * Récupérer une réservation par son ID
 */
export const getBookingById = async (id: string): Promise<Booking> => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

/**
 * Annuler une réservation
 */
export const cancelBooking = async (id: string): Promise<void> => {
  await api.delete(`/bookings/${id}`);
};

// ========================================
// EXPORT PAR DÉFAUT
// ========================================
export default {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  getSpaces,
  getSpaceById,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};
