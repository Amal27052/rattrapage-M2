/**
 * COMPOSANT BOUTON
 * 
 * Un bouton réutilisable avec différents styles.
 * On peut l'utiliser partout dans l'application.
 */

import React from 'react';

// Props = propriétés qu'on peut passer au composant
interface ButtonProps {
  children: React.ReactNode;  // Le texte ou contenu du bouton
  onClick?: () => void;        // Fonction appelée au clic (optionnel)
  type?: 'button' | 'submit' | 'reset';  // Type HTML du bouton
  variant?: 'primary' | 'secondary' | 'danger';  // Style du bouton
  disabled?: boolean;          // Bouton désactivé ou non
  fullWidth?: boolean;         // Prend toute la largeur ou non
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  // Classes CSS selon le variant choisi
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // Classes de base du bouton
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Classe pour la largeur
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combiner toutes les classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${widthClass}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
