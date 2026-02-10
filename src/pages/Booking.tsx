/**
 * PAGE DE RÉSERVATION
 * 
 * Cette page permet de réserver un espace en choisissant :
 * - La date
 * - L'heure de début
 * - L'heure de fin
 */

import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createBooking } from '../services/api';
import type { Space } from '../types';
import Button from '../components/Button';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams<{ spaceId: string }>();
  const location = useLocation();
  
  // Récupérer l'espace depuis la navigation (passé depuis la page Home)
  const space = location.state?.space as Space;

  // États pour le formulaire
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Soumettre la réservation
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Appel API pour créer la réservation
      const booking = await createBooking({
        spaceId: spaceId!,
        date,
        startTime,
        endTime,
      });

      // Rediriger vers la page QR code avec l'ID de la réservation
      navigate(`/qrcode/${booking.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la réservation');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Annuler et retourner à l'accueil
   */
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Bouton retour */}
        <button
          onClick={handleCancel}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Retour aux espaces
        </button>

        {/* Carte de réservation */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Réserver un espace
          </h1>
          <p className="text-gray-600 mb-6">
            Complétez les informations ci-dessous pour finaliser votre réservation
          </p>

          {/* Informations de l'espace */}
          {space && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {space.name}
              </h3>
              <p className="text-gray-700">
                Type: {space.type} | Capacité: {space.capacity} personnes
              </p>
              {space.equipment && space.equipment.length > 0 && (
                <div className="mt-2">
                  <span className="text-gray-700">Équipements: </span>
                  <span className="text-gray-600">{space.equipment.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Champ Date */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Date de réservation *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Pas de dates passées
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Heure de début */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Heure de début *
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Champ Heure de fin */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Heure de fin *
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Boutons */}
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleCancel}
                variant="secondary"
                fullWidth
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Réservation...' : 'Confirmer la réservation'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
