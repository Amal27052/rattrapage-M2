# 🚀 GUIDE DE DÉPLOIEMENT COMPLET

Ce guide vous explique **ÉTAPE PAR ÉTAPE** comment déployer votre projet FlexOffice.

---

## 📋 VUE D'ENSEMBLE

Vous allez déployer **2 parties** :

1. **Frontend** (React) → Sur **Vercel** (gratuit, facile)
2. **Backend** (Node.js API) → Sur **Railway** ou **Render** (gratuit aussi)

**Temps total : 1-2 heures**

---

## 🎯 PRÉREQUIS

✅ Avoir un compte GitHub (vous l'avez déjà)
✅ Le code doit être sur GitHub (vous allez le faire)
✅ Avoir un email pour créer les comptes Vercel/Railway

---

## PARTIE 1 : POUSSER LE CODE SUR GITHUB

### 1.1 Copier les fichiers dans votre projet

1. **Décompressez** le ZIP que je vous ai donné
2. **Copiez** le dossier `src/` dans votre projet `rattrapage-M2/`
3. **Copiez** le dossier `backend/` à la racine de votre projet

Votre structure devrait ressembler à ça :
```
rattrapage-M2/
├── src/              ← Nouveau (frontend)
├── backend/          ← Nouveau (API)
├── package.json
├── index.html
└── ... (autres fichiers)
```

### 1.2 Créer le fichier .env

Dans le dossier `rattrapage-M2/`, créez un fichier `.env` :

```
VITE_API_URL=http://localhost:3000/api
```

**Note** : Vous changerez cette URL après avoir déployé le backend.

### 1.3 Tester localement (optionnel mais recommandé)

**Terminal 1 - Backend** :
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend** :
```bash
cd ..  # Retourner à la racine
npm install
npm run dev
```

Ouvrez http://localhost:5173 et testez la connexion !

### 1.4 Pousser sur GitHub

```bash
# Dans le dossier rattrapage-M2/
git add .
git commit -m "Ajout du code frontend et backend complet"
git push origin main
```

✅ **CHECKPOINT** : Votre code est maintenant sur GitHub !

---

## PARTIE 2 : DÉPLOYER LE BACKEND (Railway)

### 2.1 Créer un compte Railway

1. Allez sur **https://railway.app**
2. Cliquez sur **"Start a New Project"**
3. Connectez-vous avec **GitHub**
4. Autorisez Railway à accéder à vos repos

### 2.2 Déployer le backend

1. Cliquez sur **"New Project"**
2. Choisissez **"Deploy from GitHub repo"**
3. Sélectionnez votre repo **`rattrapage-M2`**
4. Railway va détecter automatiquement Node.js

### 2.3 Configurer le projet

1. Railway va créer un service
2. Cliquez sur le service → **Settings**
3. Dans **"Root Directory"**, mettez : `backend`
4. Dans **"Start Command"**, mettez : `npm start`

### 2.4 Ajouter les variables d'environnement

1. Allez dans l'onglet **"Variables"**
2. Ajoutez :
   - `PORT` = `3000`
   - `JWT_SECRET` = `votre-secret-securise-random-12345`

### 2.5 Déployer !

1. Railway va déployer automatiquement
2. Attendez 2-3 minutes
3. Une fois déployé, cliquez sur **"Settings"** → **"Generate Domain"**
4. Notez l'URL (exemple : `https://votre-app.up.railway.app`)

### 2.6 Tester le backend

Ouvrez dans votre navigateur :
```
https://votre-app.up.railway.app/api/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Le serveur fonctionne correctement"}
```

✅ **CHECKPOINT** : Votre backend est en ligne !

---

## PARTIE 3 : DÉPLOYER LE FRONTEND (Vercel)

### 3.1 Créer un compte Vercel

1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec **GitHub**

### 3.2 Importer le projet

1. Cliquez sur **"Add New"** → **"Project"**
2. Sélectionnez votre repo **`rattrapage-M2`**
3. Cliquez sur **"Import"**

### 3.3 Configurer le projet

Vercel va détecter automatiquement Vite/React.

**IMPORTANT** : Ajoutez la variable d'environnement :

1. Dans **"Environment Variables"**, ajoutez :
   - Name : `VITE_API_URL`
   - Value : `https://votre-app.up.railway.app/api`
     (Remplacez par votre URL Railway du PARTIE 2)

2. Cliquez sur **"Deploy"**

### 3.4 Attendre le déploiement

Vercel va :
1. Installer les dépendances
2. Build votre app
3. Déployer

Ça prend 2-3 minutes.

### 3.5 Tester le frontend

1. Une fois déployé, Vercel vous donne une URL (ex: `https://rattrapage-m2.vercel.app`)
2. Cliquez dessus
3. Vous devriez voir la page de login !

### 3.6 Se connecter

Utilisez :
- Email : `demo@flexoffice.com`
- Mot de passe : `demo123`

✅ **CHECKPOINT** : Votre application complète est en ligne ! 🎉

---

## PARTIE 4 : VÉRIFICATION FINALE

### Tests à faire :

1. ✅ Page de login fonctionne
2. ✅ Connexion réussie
3. ✅ Voir la liste des espaces
4. ✅ Créer une réservation
5. ✅ Voir le QR code
6. ✅ Voir mes réservations

### Si quelque chose ne marche pas :

**Problème : "Network Error" ou "Cannot connect to API"**
→ Solution : Vérifiez que `VITE_API_URL` dans Vercel pointe bien vers Railway

**Problème : "Unauthorized" après login**
→ Solution : Vérifiez que le JWT_SECRET est bien configuré dans Railway

**Problème : Page blanche**
→ Solution : Regardez la console (F12) pour voir les erreurs

---

## PARTIE 5 : PRÉPARER LE RENDU (pour le 12/02)

### 5.1 URLs à noter

Notez ces 3 URLs dans un fichier texte :

1. **GitHub** : https://github.com/Amal27052/rattrapage-M2
2. **Frontend (Vercel)** : https://rattrapage-m2.vercel.app
3. **Backend (Railway)** : https://votre-app.up.railway.app

### 5.2 Mettre à jour le README sur GitHub

Éditez le `README.md` à la racine de votre projet et ajoutez :

```markdown
# FlexOffice - Système de Réservation d'Espaces

## 🌐 Démo en ligne

- **Application** : https://rattrapage-m2.vercel.app
- **API** : https://votre-app.up.railway.app

## 🔐 Compte de test

- Email: demo@flexoffice.com
- Mot de passe: demo123

## 📦 Technologies

- **Frontend** : React + TypeScript + Tailwind CSS
- **Backend** : Node.js + Express + JWT
- **Déploiement** : Vercel + Railway
```

Poussez sur GitHub :
```bash
git add README.md
git commit -m "Ajout des liens de démo"
git push
```

### 5.3 Documents à déposer sur le Drive

Le 12 février, déposez :

1. ✅ `Analyse_Projet_MT5_Rattrapage.docx` (je vous l'ai donné)
2. ✅ `Presentation_MT5_Rattrapage.pptx` (convertie en PDF)
3. ✅ Un fichier texte avec vos URLs :
   ```
   GitHub : https://github.com/Amal27052/rattrapage-M2
   Démo : https://rattrapage-m2.vercel.app
   API : https://votre-app.up.railway.app
   ```

---

## 🎤 PRÉPARER LA SOUTENANCE (semaine du 16/02)

### Ce que vous devez pouvoir expliquer :

1. **L'architecture** :
   - "J'ai un frontend React et un backend Node.js"
   - "Le frontend appelle l'API backend pour récupérer les données"

2. **L'authentification** :
   - "J'utilise des tokens JWT pour sécuriser l'accès"
   - "Le token est stocké dans le localStorage"

3. **Les QR codes** :
   - "Je génère les QR codes avec la bibliothèque `qrcode`"
   - "Le QR code contient les infos de la réservation"

4. **Le déploiement** :
   - "Frontend sur Vercel (gratuit, rapide)"
   - "Backend sur Railway (gratuit aussi)"

### Questions probables du jury :

**"Pourquoi Node.js ?"**
→ Facile à déployer, écosystème npm riche, bon pour les APIs

**"Comment sécurisez-vous l'API ?"**
→ JWT pour l'auth, CORS configuré, validation des données

**"Où sont les données ?"**
→ En mémoire pour le POC, mais en production j'utiliserais PostgreSQL

---

## ✅ CHECKLIST FINALE

Avant le 12 février :

- [ ] Code complet sur GitHub
- [ ] Backend déployé sur Railway (fonctionne)
- [ ] Frontend déployé sur Vercel (fonctionne)
- [ ] Vous pouvez vous connecter et faire une réservation
- [ ] README à jour avec les liens
- [ ] Documents prêts pour le Drive

Vous êtes prêt ! 🎉

---

## 🆘 AIDE SUPPLÉMENTAIRE

Si vous êtes bloqué :
1. Regardez les logs sur Railway/Vercel
2. Vérifiez la console du navigateur (F12)
3. Testez l'API avec Postman ou curl
4. Relisez ce guide calmement

**Bon courage !** 💪
