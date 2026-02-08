import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, Grid3x3, Calendar, User, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/spaces', label: 'Espaces', icon: Grid3x3 },
    { path: '/bookings', label: 'Réservations', icon: Calendar },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
              F
            </div>
            <span className="text-xl font-bold hidden md:block">FlexOffice</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive(path)
                    ? 'bg-white/30 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:block">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-sm">
              {user?.name || 'Utilisateur'}
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
              title="Se déconnecter"
            >
              <LogOut size={18} />
              <span className="hidden md:block text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
