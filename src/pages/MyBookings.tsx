/**
 * PAGE MES RÉSERVATIONS
 * 
 * Cette page affiche toutes les réservations de l'utilisateur connecté.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../services/api';
import type { Booking } from '../types';
import Button from '../components/Button';

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  
  // États
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Charger les réservations au montage du composant
   */
  useEffect(() => {
    loadBookings();
  }, []);

  /**
   * Récupérer toutes les réservations depuis l'API
   */
  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      setBookings(data);
    } catch (err: any) {
      setError('Impossible de charger vos réservations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Annuler une réservation
   */
  const handleCancelBooking = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      return;
    }

    try {
      await cancelBooking(id);
      // Recharger la liste après annulation
      loadBookings();
    } catch (err: any) {
      alert('Erreur lors de l\'annulation');
      console.error(err);
    }
  };

  /**
   * Afficher le QR code d'une réservation
   */
  const handleViewQRCode = (bookingId: string) => {
    navigate(`/qrcode/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 flex items-center mb-2"
          >
            ← Retour à l'accueil
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Mes Réservations
          </h1>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chargement */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Liste des réservations */}
        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {booking.spaceName}
                    </h3>
                    
                    <div className="space-y-1 text-gray-700">
                      <p>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(booking.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Horaires:</span>{' '}
                        {booking.startTime} - {booking.endTime}
                      </p>
                      <p>
                        <span className="font-medium">Statut:</span>{' '}
                        {booking.status === 'confirmed' && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Confirmée
                          </span>
                        )}
                        {booking.status === 'pending' && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                            En attente
                          </span>
                        )}
                        {booking.status === 'cancelled' && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                            Annulée
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {booking.status !== 'cancelled' && (
                      <>
                        <Button
                          onClick={() => handleViewQRCode(booking.id)}
                          variant="primary"
                        >
                          Voir QR Code
                        </Button>
                        <Button
                          onClick={() => handleCancelBooking(booking.id)}
                          variant="danger"
                        >
                          Annuler
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Aucune réservation */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Vous n'avez aucune réservation
            </p>
            <Button onClick={() => navigate('/')}>
              Réserver un espace
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
