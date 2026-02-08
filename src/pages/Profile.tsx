import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { bookingsApi } from '../services/api';
import { Mail, Phone, Building, User as UserIcon } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const { data: bookings } = useQuery({
    queryKey: ['userBookings'],
    queryFn: bookingsApi.getMyBookings,
  });

  const totalBookings = bookings?.length || 0;
  const thisMonthBookings = bookings?.filter(b => {
    const bookingDate = new Date(b.startTime);
    const now = new Date();
    return bookingDate.getMonth() === now.getMonth() &&
           bookingDate.getFullYear() === now.getFullYear();
  }).length || 0;

  const roleLabels: Record<string, string> = {
    employee: 'Employé standard',
    manager: 'Manager',
    admin: 'Administrateur',
    visitor: 'Visiteur',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Mon profil
        </h1>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* User Avatar & Name */}
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user?.name}
            </h2>
            <p className="text-gray-600">
              {roleLabels[user?.role || 'employee']}
            </p>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Informations personnelles
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail size={20} className="mr-3 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              {user?.phone && (
                <div className="flex items-center text-gray-700">
                  <Phone size={20} className="mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center text-gray-700">
                <UserIcon size={20} className="mr-3 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Rôle</p>
                  <p className="font-medium">{roleLabels[user?.role || 'employee']}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <Building size={20} className="mr-3 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Entreprise</p>
                  <p className="font-medium">{user?.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Statistiques
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-4xl font-bold text-primary mb-2">
                  {totalBookings}
                </h4>
                <p className="text-gray-600">Réservations totales</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="text-4xl font-bold text-green-600 mb-2">
                  {thisMonthBookings}
                </h4>
                <p className="text-gray-600">Ce mois-ci</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={logout}
          >
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};
