/**
 * TYPES TYPESCRIPT
 * 
 * Ici on définit la structure de nos données.
 * Ça aide TypeScript à vérifier qu'on utilise bien les bonnes données.
 */

// ========================================
// TYPE UTILISATEUR
// ========================================
export interface User {
  id: string;           // Identifiant unique
  email: string;        // Email de l'utilisateur
  name: string;         // Nom complet
  role: 'employee' | 'manager' | 'admin';  // Rôle dans l'entreprise
}

// ========================================
// TYPE ESPACE (Bureau, Salle, etc.)
// ========================================
export interface Space {
  id: string;           // Identifiant unique
  name: string;         // Nom de l'espace (ex: "Bureau 101")
  type: string;         // Type (bureau, salle réunion, etc.)
  capacity: number;     // Nombre de personnes max
  equipment: string[];  // Équipements (ex: ["Écran", "Wifi"])
  available: boolean;   // Disponible ou non
  imageUrl?: string;    // URL de l'image (optionnel)
}

// ========================================
// TYPE RÉSERVATION
// ========================================
export interface Booking {
  id: string;           // Identifiant unique
  spaceId: string;      // ID de l'espace réservé
  spaceName: string;    // Nom de l'espace
  userId: string;       // ID de l'utilisateur qui réserve
  userName: string;     // Nom de l'utilisateur
  date: string;         // Date de réservation (format ISO)
  startTime: string;    // Heure de début (ex: "09:00")
  endTime: string;      // Heure de fin (ex: "17:00")
  qrCode?: string;      // QR code d'accès (généré après réservation)
  status: 'active' | 'completed' | 'cancelled' | 'pending' | 'confirmed';  // Statut
  createdAt?: string;   // Date de création
}

// ========================================
// TYPE RÉPONSE DE L'API
// ========================================
export interface ApiResponse<T> {
  success: boolean;     // True si tout s'est bien passé
  data?: T;             // Les données retournées
  message?: string;     // Message d'erreur ou de succès
  error?: string;       // Détails de l'erreur
}

// ========================================
// TYPE POUR LA CONNEXION
// ========================================
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;        // Token JWT pour l'authentification
  user: User;           // Informations de l'utilisateur
}
