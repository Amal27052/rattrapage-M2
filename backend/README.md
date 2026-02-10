# 🖥️ FlexOffice Backend - API Simple

API REST ultra-simple pour la gestion de réservations d'espaces de travail flexibles.

## 📋 Ce que fait ce backend

- ✅ Authentification avec JWT
- ✅ Gestion des espaces disponibles
- ✅ Création de réservations
- ✅ Génération de QR codes d'accès
- ✅ Liste des réservations utilisateur

**IMPORTANT** : Ce backend utilise des données EN MÉMOIRE (pas de vraie base de données). C'est parfait pour un POC, mais en production il faudrait ajouter PostgreSQL.

## 🚀 Installation et démarrage

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Lancer le serveur

**Mode développement** (avec redémarrage automatique) :
```bash
npm run dev
```

**Mode production** :
```bash
npm start
```

Le serveur démarre sur **http://localhost:3000**

## 🧪 Tester que ça marche

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000/api/health
```

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "Le serveur fonctionne correctement"
}
```

## 🔐 Comptes de test

Le backend contient 2 comptes de test :

**Employé :**
- Email: `demo@flexoffice.com`
- Mot de passe: `demo123`

**Manager :**
- Email: `manager@flexoffice.com`
- Mot de passe: `manager123`

## 📡 API Endpoints

### Authentification

**POST** `/api/auth/login`
```json
{
  "email": "demo@flexoffice.com",
  "password": "demo123"
}
```

Retourne un token JWT à utiliser dans les autres requêtes.

### Espaces

**GET** `/api/spaces` - Liste tous les espaces
- Nécessite authentification

**GET** `/api/spaces/:id` - Détails d'un espace
- Nécessite authentification

### Réservations

**POST** `/api/bookings` - Créer une réservation
```json
{
  "spaceId": "1",
  "date": "2026-02-15",
  "startTime": "09:00",
  "endTime": "17:00"
}
```
- Nécessite authentification
- Génère automatiquement un QR code

**GET** `/api/bookings/my` - Mes réservations
- Nécessite authentification

**GET** `/api/bookings/:id` - Détails d'une réservation
- Nécessite authentification

**DELETE** `/api/bookings/:id` - Annuler une réservation
- Nécessite authentification

## 🔧 Variables d'environnement

Créer un fichier `.env` :

```env
PORT=3000
JWT_SECRET=votre-secret-super-securise
```

**⚠️ IMPORTANT** : En production, changez absolument le `JWT_SECRET` !

## 📝 Structure du code

Tout est dans **un seul fichier** `server.js` pour que ce soit simple :

- Lignes 1-50 : Configuration et données
- Lignes 51-80 : Middleware d'authentification
- Lignes 81-120 : Routes d'authentification
- Lignes 121-160 : Routes des espaces
- Lignes 161-250 : Routes des réservations

## 🚢 Déploiement

### Railway (recommandé)

1. Créer un compte sur [Railway.app](https://railway.app)
2. Connecter votre repo GitHub
3. Railway détectera automatiquement Node.js
4. Ajouter les variables d'environnement
5. Déployer !

### Render

1. Créer un compte sur [Render.com](https://render.com)
2. New Web Service
3. Connecter GitHub
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Déployer !

## ⚠️ Limitations (à améliorer en production)

- ❌ Pas de vraie base de données (données perdues au redémarrage)
- ❌ Mots de passe non hashés (utiliser bcrypt en prod)
- ❌ JWT_SECRET en dur dans le code
- ❌ Pas de validation des données d'entrée
- ❌ Pas de rate limiting
- ❌ Pas de logs structurés

**Mais c'est OK pour un POC de 3 semaines !** 😊

## 🧪 Tests

Pour tester l'API avec curl :

```bash
# 1. Se connecter
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@flexoffice.com","password":"demo123"}'

# Vous obtenez un token, copiez-le

# 2. Voir les espaces
curl http://localhost:3000/api/spaces \
  -H "Authorization: Bearer VOTRE_TOKEN"

# 3. Créer une réservation
curl -X POST http://localhost:3000/api/bookings \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"spaceId":"1","date":"2026-02-15","startTime":"09:00","endTime":"17:00"}'
```

## 💡 Questions pour le jury

**"Comment gérez-vous l'authentification ?"**
→ JWT stocké côté client, vérifié à chaque requête

**"Où sont stockées les données ?"**
→ En mémoire pour le POC, mais en production j'utiliserais PostgreSQL

**"Comment générez-vous les QR codes ?"**
→ Bibliothèque `qrcode` qui encode les infos de réservation

**"C'est sécurisé ?"**
→ Pour un POC oui, mais en prod il faut : hasher les mots de passe, HTTPS, rate limiting, etc.

## 📄 Licence

MIT - Projet HETIC MT5 Rattrapage
