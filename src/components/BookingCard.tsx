import React from 'react';
import { Link } from 'react-router-dom';
import type { Booking } from '../types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from './Button';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);

  const statusConfig = {
    active: { label: 'En cours', color: 'bg-green-100 text-green-800' },
    completed: { label: 'Terminé', color: 'bg-gray-100 text-gray-600' },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' },
  };

  const status = statusConfig[booking.status];

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-primary transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            {booking.space?.name || 'Espace inconnu'}
          </h4>
          
          {booking.space && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin size={16} className="mr-1" />
              <span>Étage {booking.space.floor} • {booking.space.building}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar size={16} className="mr-1" />
            <span>{format(startDate, 'dd MMMM yyyy', { locale: fr })}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>
              {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
            </span>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Actions */}
      {booking.status === 'active' && (
        <div className="flex gap-3">
          <Link to={`/bookings/${booking.id}/qr`} className="flex-1">
            <Button variant="primary" size="sm" fullWidth>
              Voir QR Code
            </Button>
          </Link>
          {onCancel && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancel(booking.id)}
            >
              Annuler
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
