# 🏢 FlexOffice - Frontend

Application React TypeScript pour la gestion de réservation d'espaces de travail flexibles.

## 🚀 Technologies utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utility-first
- **React Query** - Gestion des états serveur
- **React Router** - Routing
- **Axios** - Client HTTP
- **QRCode.react** - Génération de QR codes
- **Date-fns** - Manipulation des dates
- **React Hot Toast** - Notifications

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd flexoffice-frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Créer un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Lancer en mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Build production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## 🐳 Docker

### Build l'image

```bash
docker build -t flexoffice-frontend .
```

### Lancer le conteneur

```bash
docker run -p 80:80 flexoffice-frontend
```

## 🧪 Tests

### Lancer les tests

```bash
npm run test
```

### Tests avec UI

```bash
npm run test:ui
```

### Coverage

```bash
npm run test:coverage
```

## 📁 Structure du projet

```
src/
├── components/       # Composants réutilisables
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Header.tsx
│   ├── SpaceCard.tsx
│   ├── BookingCard.tsx
│   └── QRCodeDisplay.tsx
│
├── pages/           # Pages de l'application
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── SpacesList.tsx
│   ├── SpaceDetail.tsx
│   ├── Bookings.tsx
│   ├── QRCode.tsx
│   └── Profile.tsx
│
├── services/        # API calls
│   └── api.ts
│
├── types/           # TypeScript types
│   └── index.ts
│
├── hooks/           # Custom hooks
│   └── useAuth.ts
│
├── App.tsx          # Router principal
├── main.tsx         # Entry point
└── index.css        # Styles globaux
```

## 🎨 Pages disponibles

| Route | Description |
|-------|-------------|
| `/login` | Authentification |
| `/` | Dashboard avec statistiques |
| `/spaces` | Liste des espaces disponibles |
| `/spaces/:id` | Détail et réservation d'un espace |
| `/bookings` | Mes réservations |
| `/bookings/:id/qr` | QR Code d'accès |
| `/profile` | Profil utilisateur |

## 🔐 Authentification

L'application utilise JWT stocké dans `localStorage`. Le token est automatiquement ajouté aux requêtes API via un intercepteur Axios.

## 📦 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer en mode dev |
| `npm run build` | Build production |
| `npm run preview` | Preview du build |
| `npm run test` | Lancer les tests |
| `npm run lint` | Vérifier le code |

## 🌐 Déploiement

### Vercel (recommandé pour frontend)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload le dossier dist/
```

### Railway

```bash
# L'app détectera automatiquement le Dockerfile
railway up
```

## 🔧 Configuration avancée

### Variables d'environnement

- `VITE_API_URL` : URL de l'API backend (obligatoire)

### Personnalisation Tailwind

Modifier `tailwind.config.js` pour changer les couleurs, fonts, etc.

## 📝 Données de test

**Email:** demo@flexoffice.com  
**Password:** demo123

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT

## 👤 Auteur

Kertyss - Projet HETIC MT5 Rattrapage

## 🐛 Rapporter un bug

Ouvrir une issue sur GitHub avec :
- Description du problème
- Steps to reproduce
- Screenshots si applicable
