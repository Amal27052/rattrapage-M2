import React from 'react';
import { Link } from 'react-router-dom';
import type { Space } from '../types';
import { MapPin, Users, Wifi, Monitor } from 'lucide-react';

interface SpaceCardProps {
  space: Space;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const equipmentIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi size={16} />,
    'Écran': <Monitor size={16} />,
  };

  return (
    <Link
      to={`/spaces/${space.id}`}
      className="block bg-white rounded-xl border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg overflow-hidden"
    >
      {/* Image */}
      <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-semibold">
        {space.image ? (
          <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
        ) : (
          '📍 IMAGE'
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{space.name}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span>Étage {space.floor} • {space.building}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Users size={16} className="mr-1" />
          <span>Capacité: {space.capacity} {space.capacity > 1 ? 'personnes' : 'personne'}</span>
        </div>

        {/* Equipment tags */}
        {space.equipment && space.equipment.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {space.equipment.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold"
              >
                {equipmentIcons[item]}
                <span>{item}</span>
              </span>
            ))}
          </div>
        )}

        {/* Availability badge */}
        <span
          className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
            space.available
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}
        >
          {space.available ? 'Disponible' : 'Réservé'}
        </span>
      </div>
    </Link>
  );
};
