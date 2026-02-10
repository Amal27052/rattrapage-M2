/**
 * COMPOSANT CARTE D'ESPACE
 * 
 * Affiche les informations d'un espace (bureau, salle, etc.)
 * sous forme de carte cliquable.
 */

import React from 'react';
import type { Space } from '../types';
import Button from './Button';

interface SpaceCardProps {
  space: Space;
  onSelect: (space: Space) => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Nom de l'espace */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {space.name}
      </h3>
      
      {/* Type d'espace */}
      <p className="text-gray-600 mb-2">
        Type: <span className="font-medium">{space.type}</span>
      </p>
      
      {/* Capacité */}
      <p className="text-gray-600 mb-2">
        Capacité: <span className="font-medium">{space.capacity} personnes</span>
      </p>
      
      {/* Équipements */}
      {space.equipment && space.equipment.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-600 mb-1">Équipements:</p>
          <div className="flex flex-wrap gap-2">
            {space.equipment.map((item, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Badge de disponibilité */}
      <div className="mb-4">
        {space.available ? (
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            ✓ Disponible
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
            ✗ Non disponible
          </span>
        )}
      </div>
      
      {/* Bouton de réservation */}
      <Button
        onClick={() => onSelect(space)}
        disabled={!space.available}
        fullWidth
      >
        {space.available ? 'Réserver cet espace' : 'Indisponible'}
      </Button>
    </div>
  );
};

export default SpaceCard;
