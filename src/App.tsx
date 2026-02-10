/**
 * COMPOSANT APP - ROUTER PRINCIPAL
 * 
 * Ce fichier gère la navigation de l'application.
 * Il définit toutes les routes (URLs) et les pages correspondantes.
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/api';

// Import des pages
import Login from './pages/Login';
import Home from './pages/Home';
import Booking from './pages/Booking';
import QRCodePage from './pages/QRCodePage';
import MyBookings from './pages/MyBookings';

/**
 * Composant ProtectedRoute
 * 
 * Ce composant protège les routes qui nécessitent une authentification.
 * Si l'utilisateur n'est pas connecté, il est redirigé vers /login
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Vérifier si l'utilisateur est connecté
  if (!isAuthenticated()) {
    // Si non connecté, rediriger vers la page de connexion
    return <Navigate to="/login" replace />;
  }
  
  // Si connecté, afficher la page demandée
  return <>{children}</>;
};

/**
 * Composant App principal
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PAGE DE CONNEXION */}
        <Route path="/login" element={<Login />} />

        {/* PAGES PROTÉGÉES (nécessitent d'être connecté) */}
        
        {/* Page d'accueil - Liste des espaces */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* Page de réservation d'un espace */}
        <Route 
          path="/booking/:spaceId" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />

        {/* Page d'affichage du QR code */}
        <Route 
          path="/qrcode/:bookingId" 
          element={
            <ProtectedRoute>
              <QRCodePage />
            </ProtectedRoute>
          } 
        />

        {/* Page de mes réservations */}
        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } 
        />

        {/* ROUTE PAR DÉFAUT */}
        {/* Si l'URL ne correspond à rien, rediriger vers / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
