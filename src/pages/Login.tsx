/**
 * PAGE DE CONNEXION
 * 
 * Cette page permet à l'utilisateur de se connecter avec son email et mot de passe.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Button from '../components/Button';

const Login: React.FC = () => {
  // Navigation pour rediriger après connexion
  const navigate = useNavigate();
  
  // États pour stocker l'email et le mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Fonction appelée quand on soumet le formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(''); // Réinitialise les erreurs
    setLoading(true); // Active le mode chargement

    try {
      // Appel à l'API pour se connecter
      await login({ email, password });
      
      // Si ça marche, on redirige vers la page d'accueil
      navigate('/');
    } catch (err: any) {
      // Si ça ne marche pas, on affiche l'erreur
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false); // Désactive le mode chargement
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            FlexOffice
          </h1>
          <p className="text-gray-600">
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          {/* Champ Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="votre@email.com"
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Message d'erreur (si il y en a) */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Bouton de connexion */}
          <Button
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        {/* Informations de test */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Compte de test:</strong>
          </p>
          <p className="text-sm text-gray-600">
            Email: demo@flexoffice.com
          </p>
          <p className="text-sm text-gray-600">
            Mot de passe: demo123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
