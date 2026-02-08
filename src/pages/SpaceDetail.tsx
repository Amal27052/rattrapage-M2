import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { spacesApi, bookingsApi } from '../services/api';
import { MapPin, Users, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export const SpaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  const { data: space, isLoading } = useQuery({
    queryKey: ['space', id],
    queryFn: () => spacesApi.getById(id!),
    enabled: !!id,
  });

  const createBooking = useMutation({
    mutationFn: bookingsApi.create,
    onSuccess: () => {
      toast.success('Réservation créée avec succès !');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate('/bookings');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    createBooking.mutate({
      spaceId: id,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    });
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

  if (!space) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Espace non trouvé</p>
        </div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Space details */}
          <div>
            {/* Image */}
            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-gray-500 font-semibold text-xl mb-6">
              {space.image ? (
                <img src={space.image} alt={space.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                '📸 Photo du bureau'
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{space.name}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={20} className="mr-2" />
              <span>Étage {space.floor}, {space.building}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <Users size={20} className="mr-2" />
              <span>Capacité: {space.capacity} {space.capacity > 1 ? 'personnes' : 'personne'}</span>
            </div>

            {space.description && (
              <p className="text-gray-700 mb-6">{space.description}</p>
            )}

            {/* Equipment */}
            {space.equipment && space.equipment.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Équipements</h3>
                <div className="flex flex-wrap gap-2">
                  {space.equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking form */}
          <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Réserver cet espace
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="time"
                  label="Heure de début"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <Input
                  type="time"
                  label="Heure de fin"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Résumé :</strong> Réservation du {date} de {startTime} à {endTime}
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={createBooking.isPending}
              >
                {createBooking.isPending ? 'Réservation...' : 'Confirmer la réservation'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
