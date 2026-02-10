/**
 * SERVEUR BACKEND - API SIMPLE
 *
 * Ce fichier contient TOUT le backend dans un seul fichier pour que ce soit simple.
 *
 * FONCTIONNALITÉS :
 * - Connexion (login)
 * - Récupérer les espaces disponibles
 * - Créer une réservation
 * - Voir mes réservations
 * - Générer un QR code
 */

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");

// ========================================
// CONFIGURATION
// ========================================

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "votre-secret-super-securise-changez-moi-en-production"; // À changer en production !

// Middleware
app.use(cors()); // Autoriser les requêtes depuis le frontend
app.use(express.json()); // Parser le JSON des requêtes

// ========================================
// DONNÉES EN MÉMOIRE (remplace une vraie BDD)
// ========================================

// Liste des utilisateurs
const USERS = [
  {
    id: "1",
    email: "demo@flexoffice.com",
    password: "demo123", // En production, il faut hasher le mot de passe !
    name: "Amal Benjouida",
    role: "employee",
  },
  {
    id: "2",
    email: "manager@flexoffice.com",
    password: "manager123",
    name: "Marie Martin",
    role: "manager",
  },
];

// Liste des espaces disponibles
const SPACES = [
  {
    id: "1",
    name: "Bureau 101",
    type: "Bureau individuel",
    capacity: 1,
    equipment: ['Écran 27"', "Wifi", "Prise USB"],
    available: true,
  },
  {
    id: "2",
    name: "Salle Réunion A",
    type: "Salle de réunion",
    capacity: 8,
    equipment: ["Écran TV", "Visioconférence", "Tableau blanc"],
    available: true,
  },
  {
    id: "3",
    name: "Bureau 205",
    type: "Bureau individuel",
    capacity: 1,
    equipment: ['Écran 24"', "Wifi"],
    available: true,
  },
  {
    id: "4",
    name: "Espace Coworking",
    type: "Open space",
    capacity: 20,
    equipment: ["Wifi", "Cuisine", "Café gratuit"],
    available: true,
  },
  {
    id: "5",
    name: "Salle Créative",
    type: "Salle de brainstorming",
    capacity: 6,
    equipment: ["Post-its", "Tableau blanc", "Feutres"],
    available: false, // Pas disponible
  },
];

// Liste des réservations (vide au départ)
let BOOKINGS = [];
let bookingIdCounter = 1;

// ========================================
// MIDDLEWARE D'AUTHENTIFICATION
// ========================================

/**
 * Vérifie que l'utilisateur est connecté (a un token valide)
 */
function authMiddleware(req, res, next) {
  // Récupérer le token depuis le header Authorization
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Stocker les infos de l'utilisateur
    next(); // Continuer
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
}

// ========================================
// ROUTES - AUTHENTIFICATION
// ========================================

/**
 * POST /api/auth/login
 * Se connecter avec email et mot de passe
 */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Chercher l'utilisateur dans notre liste
  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  // Créer un token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }, // Le token expire dans 24h
  );

  // Retourner le token et les infos de l'utilisateur
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
});

// ========================================
// ROUTES - ESPACES
// ========================================

/**
 * GET /api/spaces
 * Récupérer tous les espaces
 */
app.get("/api/spaces", authMiddleware, (req, res) => {
  res.json(SPACES);
});

/**
 * GET /api/spaces/:id
 * Récupérer un espace par son ID
 */
app.get("/api/spaces/:id", authMiddleware, (req, res) => {
  const space = SPACES.find((s) => s.id === req.params.id);

  if (!space) {
    return res.status(404).json({ message: "Espace non trouvé" });
  }

  res.json(space);
});

// ========================================
// ROUTES - RÉSERVATIONS
// ========================================

/**
 * POST /api/bookings
 * Créer une nouvelle réservation
 */
app.post("/api/bookings", authMiddleware, async (req, res) => {
  const { spaceId, date, startTime, endTime } = req.body;
  const userId = req.user.id;

  // Trouver l'espace
  const space = SPACES.find((s) => s.id === spaceId);
  if (!space) {
    return res.status(404).json({ message: "Espace non trouvé" });
  }

  // Vérifier que l'espace est disponible
  if (!space.available) {
    return res.status(400).json({ message: "Cet espace n'est pas disponible" });
  }

  // Trouver l'utilisateur
  const user = USERS.find((u) => u.id === userId);

  // Créer la réservation
  const booking = {
    id: String(bookingIdCounter++),
    spaceId,
    spaceName: space.name,
    userId,
    userName: user.name,
    date,
    startTime,
    endTime,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  // Générer le QR code
  try {
    // Le QR code contient toutes les infos de la réservation
    const qrData = JSON.stringify({
      bookingId: booking.id,
      spaceId: booking.spaceId,
      userId: booking.userId,
      date: booking.date,
      time: `${booking.startTime}-${booking.endTime}`,
    });

    // Générer le QR code en base64
    const qrCode = await QRCode.toDataURL(qrData);
    booking.qrCode = qrCode;
  } catch (error) {
    console.error("Erreur génération QR code:", error);
  }

  // Ajouter la réservation à la liste
  BOOKINGS.push(booking);

  res.status(201).json(booking);
});

/**
 * GET /api/bookings/my
 * Récupérer toutes mes réservations
 */
app.get("/api/bookings/my", authMiddleware, (req, res) => {
  const userId = req.user.id;

  // Filtrer les réservations de l'utilisateur connecté
  const myBookings = BOOKINGS.filter((b) => b.userId === userId);

  res.json(myBookings);
});

/**
 * GET /api/bookings/:id
 * Récupérer une réservation par son ID
 */
app.get("/api/bookings/:id", authMiddleware, (req, res) => {
  const booking = BOOKINGS.find((b) => b.id === req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Réservation non trouvée" });
  }

  // Vérifier que c'est bien la réservation de l'utilisateur
  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès refusé" });
  }

  res.json(booking);
});

/**
 * DELETE /api/bookings/:id
 * Annuler une réservation
 */
app.delete("/api/bookings/:id", authMiddleware, (req, res) => {
  const bookingIndex = BOOKINGS.findIndex((b) => b.id === req.params.id);

  if (bookingIndex === -1) {
    return res.status(404).json({ message: "Réservation non trouvée" });
  }

  const booking = BOOKINGS[bookingIndex];

  // Vérifier que c'est bien la réservation de l'utilisateur
  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès refusé" });
  }

  // Marquer comme annulée
  booking.status = "cancelled";

  res.json({ message: "Réservation annulée" });
});

// ========================================
// ROUTE DE TEST
// ========================================

/**
 * GET /api/health
 * Vérifier que le serveur fonctionne
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Le serveur fonctionne correctement" });
});

// ========================================
// ROUTE PAR DÉFAUT
// ========================================

app.get("*", (req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// ========================================
// DÉMARRAGE DU SERVEUR
// ========================================

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Testez l'API : http://localhost:${PORT}/api/health`);
  console.log(`\n👤 Compte de test:`);
  console.log(`   Email: demo@flexoffice.com`);
  console.log(`   Mot de passe: demo123`);
});
