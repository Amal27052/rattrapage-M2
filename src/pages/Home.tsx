/**
 * PAGE D'ACCUEIL
 * 
 * Cette page affiche tous les espaces disponibles à la réservation.
 * L'utilisateur peut cliquer sur un espace pour le réserver.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpaces, getCurrentUser, logout } from '../services/api';
import type { Space } from '../types';
import SpaceCard from '../components/SpaceCard';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // États pour stocker les données
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Récupérer l'utilisateur connecté
  const user = getCurrentUser();

  /**
   * Au chargement de la page, on récupère les espaces disponibles
   */
  useEffect(() => {
    loadSpaces();
  }, []);

  /**
   * Fonction pour charger les espaces depuis l'API
   */
  const loadSpaces = async () => {
    try {
      setLoading(true);
      const data = await getSpaces();
      setSpaces(data);
    } catch (err: any) {
      setError('Impossible de charger les espaces');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Quand l'utilisateur clique sur "Réserver"
   */
  const handleSelectSpace = (space: Space) => {
    // On navigue vers la page de réservation en passant l'ID de l'espace
    navigate(`/booking/${space.id}`, { state: { space } });
  };

  /**
   * Se déconnecter
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                FlexOffice
              </h1>
              <p className="text-gray-600">
                Bienvenue, {user?.name || 'Utilisateur'}
              </p>
            </div>
            
            <div className="flex gap-4">
              {/* Bouton Mes Réservations */}
              <Button
                onClick={() => navigate('/bookings')}
                variant="secondary"
              >
                Mes Réservations
              </Button>
              
              {/* Bouton Déconnexion */}
              <Button
                onClick={handleLogout}
                variant="danger"
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Espaces disponibles
          </h2>
          <p className="text-gray-600">
            Choisissez un espace à réserver pour votre journée de travail
          </p>
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Chargement des espaces...</p>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Grille d'espaces */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onSelect={handleSelectSpace}
              />
            ))}
          </div>
        )}

        {/* Si aucun espace */}
        {!loading && !error && spaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucun espace disponible pour le moment
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
