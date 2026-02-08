import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { SpaceCard } from '../components/SpaceCard';
import { spacesApi } from '../services/api';
import { Grid3x3 } from 'lucide-react';

export const SpacesList: React.FC = () => {
  const { data: spaces, isLoading } = useQuery({
    queryKey: ['spaces'],
    queryFn: spacesApi.getAll,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Espaces disponibles
        </h1>
        <p className="text-gray-600 mb-8">
          Sélectionnez un bureau ou une salle de réunion
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : spaces && spaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center">
            <Grid3x3 size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun espace disponible
            </h3>
            <p className="text-gray-600">
              Tous les espaces sont actuellement réservés
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
