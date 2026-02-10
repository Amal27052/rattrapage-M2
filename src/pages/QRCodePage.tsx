/**
 * PAGE QR CODE
 * 
 * Cette page affiche le QR code d'accès après une réservation réussie.
 * Le QR code contient toutes les informations de la réservation.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { getBookingById } from '../services/api';
import type { Booking } from '../types';
import Button from '../components/Button';

const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  
  // États
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Charger les détails de la réservation
   */
  useEffect(() => {
    if (bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  /**
   * Récupérer la réservation depuis l'API
   */
  const loadBooking = async () => {
    try {
      setLoading(true);
      const data = await getBookingById(bookingId!);
      setBooking(data);
    } catch (err: any) {
      setError('Impossible de charger la réservation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Télécharger le QR code en PNG
   */
  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    // Convertir le SVG en PNG (logique simplifiée)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode-${bookingId}.png`;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <p className="text-red-600 mb-4">{error || 'Réservation introuvable'}</p>
          <Button onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Retour à l'accueil
        </button>

        {/* Carte de succès */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Icône de succès */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✓</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Réservation confirmée !
          </h1>
          <p className="text-gray-600 mb-8">
            Votre espace a été réservé avec succès
          </p>

          {/* Détails de la réservation */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Détails de votre réservation
            </h3>
            
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Espace:</span> {booking.spaceName}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Horaires:</span> {booking.startTime} - {booking.endTime}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Statut:</span>{' '}
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {booking.status === 'confirmed' ? 'Confirmée' : booking.status}
                </span>
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="mb-8">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Votre QR Code d'accès
            </h3>
            <p className="text-gray-600 mb-4">
              Présentez ce QR code à l'entrée de l'espace
            </p>
            
            <div className="flex justify-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
              <QRCodeSVG
                id="qr-code"
                value={booking.qrCode || `booking-${booking.id}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <Button
              onClick={handleDownload}
              variant="secondary"
              fullWidth
            >
              Télécharger le QR Code
            </Button>
            <Button
              onClick={() => navigate('/bookings')}
              fullWidth
            >
              Voir mes réservations
            </Button>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            💡 Informations importantes
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Le QR code est valide uniquement pour la date et les horaires réservés</li>
            <li>• Vous recevrez également ce QR code par email</li>
            <li>• En cas de problème, contactez la réception</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
