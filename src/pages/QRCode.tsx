import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { Button } from '../components/Button';
import { bookingsApi } from '../services/api';
import { Calendar, Clock, MapPin, ArrowLeft, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

export const QRCodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingsApi.getById(id!),
    enabled: !!id,
  });

  const handleShare = () => {
    if (booking && booking.qrCode) {
      const subject = `QR Code d'accès - ${booking.space?.name}`;
      const body = `Voici votre QR Code d'accès pour ${booking.space?.name}\n\nDate: ${format(new Date(booking.startTime), 'dd MMMM yyyy', { locale: fr })}\nHeure: ${format(new Date(booking.startTime), 'HH:mm')} - ${format(new Date(booking.endTime), 'HH:mm')}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast.success('Email ouvert');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!booking || !booking.qrCode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">QR Code non disponible</p>
        </div>
      </div>
    );
  }

  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Votre QR Code d'accès
            </h1>
            <p className="text-gray-600">
              Scannez ce code à l'entrée de l'espace
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <QRCodeDisplay
              value={booking.qrCode}
              size={300}
            />
          </div>

          {/* Booking Details */}
          <div className="bg-gray-100 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {booking.space?.name}
            </h2>

            <div className="space-y-3">
              {booking.space && (
                <div className="flex items-center text-gray-700">
                  <MapPin size={20} className="mr-3 text-primary" />
                  <span>Étage {booking.space.floor} • {booking.space.building}</span>
                </div>
              )}

              <div className="flex items-center text-gray-700">
                <Calendar size={20} className="mr-3 text-primary" />
                <span>{format(startDate, 'dd MMMM yyyy', { locale: fr })}</span>
              </div>

              <div className="flex items-center text-gray-700">
                <Clock size={20} className="mr-3 text-primary" />
                <span>
                  {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-green-600 font-semibold flex items-center">
                <span className="mr-2">✓</span>
                Accès valide
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleShare}
            >
              <Mail size={20} className="mr-2" />
              Partager par email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
