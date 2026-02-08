import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { BookingCard } from '../components/BookingCard';
import { dashboardApi, bookingsApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Calendar, Grid3x3, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardApi.getStats,
  });

  const { data: upcomingBookings } = useQuery({
    queryKey: ['upcomingBookings'],
    queryFn: async () => {
      const bookings = await bookingsApi.getMyBookings();
      return bookings.filter(b => b.status === 'active').slice(0, 3);
    },
  });

  const statCards = [
    {
      title: 'Bureaux disponibles',
      value: stats?.availableSpaces || 0,
      icon: Grid3x3,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Réservations actives',
      value: stats?.activeBookings || 0,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
    },
    {
      title: "Taux d'occupation",
      value: `${stats?.occupancyRate || 0}%`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bonjour, {user?.name?.split(' ')[0] || 'Utilisateur'} 👋
        </h1>
        <p className="text-gray-600 mb-8">Bienvenue sur votre tableau de bord FlexOffice</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={32} className="opacity-80" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-white/90">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Upcoming Bookings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Réservations à venir
          </h2>
          
          {upcomingBookings && upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucune réservation à venir</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
