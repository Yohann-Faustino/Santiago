# Sommaire

- [Sommaire](#sommaire)
  - [✨ Fonctionnalités](#-fonctionnalités)
  - [🛠️ Technologies](#️-technologies)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [🚀 Installation](#-installation)
    - [Prérequis](#prérequis)
    - [Étapes](#étapes)
      - [1. Cloner le repo](#1-cloner-le-repo)
      - [2. Installer les dépendances](#2-installer-les-dépendances)
      - [3. Configurer les variables d’environnement](#3-configurer-les-variables-denvironnement)
      - [4. Créer et migrer la base de données](#4-créer-et-migrer-la-base-de-données)
      - [5. Lancer le serveur](#5-lancer-le-serveur)
  - [🧱 Structure du projet](#-structure-du-projet)
  - [📷 Aperçu](#-aperçu)
  - [🧪 Sécurité](#-sécurité)
  - [👤 Auteur](#-auteur)
  - [📝 Licence](#-licence)
  - [🌐 Déploiement](#-déploiement)

Santiago, Vitrine de l'entreprise DECP: Dégorgement, Entretien, Chauffage, Plomberie qui permet à ses clients de s'exprimer par des commentaires sur la qualité des services de celle-ci, avec un système d’authentification sécurisé, la possibilité de modifer le profile de l'utilisateur ainsi qu'un tableau de bord administrateur.

---

## ✨ Fonctionnalités

- ✅ Inscription et connexion sécurisées avec JWT
- ✅ Réinitialisation du mot de passe par email
- ✅ Protection anti-bot avec reCAPTCHA v2
- ✅ Gestion des rôles (utilisateur / admin)
- ✅ Création, affichage et édition de profils utilisateurs
- ✅ Interface d’administration avec tableau de bord
- ✅ Logs de sécurité côté serveur
- ✅ Protection contre les attaques courantes (XSS, brute force, etc.)

---

## 🛠️ Technologies

### Backend
- **Node.js**, **Express**
- **Sequelize** (ORM) + **PostgreSQL**
- **bcrypt**, **JWT**
- **Nodemailer** (emails)
- **express-rate-limit**, **helmet**

### Frontend
- **React**
- **Tailwind CSS**
- **React Router**
- **Google reCAPTCHA v2**

---

## 🚀 Installation

### Prérequis

- Node.js v18+
- PostgreSQL
- Clé API reCAPTCHA (v2)
- Compte SMTP (Gmail, Mailtrap, etc.)

### Étapes

#### 1. Cloner le repo

```bash
git clone https://github.com/Yohann-Faustino/Santiago
cd santiago
```

#### 2. Installer les dépendances

```bash
npm install
```

#### 3. Configurer les variables d’environnement

Créer un fichier `.env` à la racine du projet avec :

```env
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/santiago
JWT_SECRET=code_super_secret
RECAPTCHA_SECRET=la_clé_secrète_recaptcha
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=email@example.com
SMTP_PASS=mot_de_passe
EMAIL_FROM="Santiago <email@example.com>"
```

#### 4. Créer et migrer la base de données

On gère la base PostgreSQL manuellement avec des fichiers SQL (migrate.sql, seeding.sql) et la commande psql.

```bash
psql -d nomBdd -U nomUtilisateur
psql -d nomBdd -U nomUtilisateur -f ./backend/datas/migrate.sql
psql -d nomBdd -U nomUtilisateur -f ./backend/datas/seeding.sql
```


#### 5. Lancer le serveur

```bash
npm run dev
```

---

## 🧱 Structure du projet

/backend
│   ├── admin/
│   ├── adminRouter/
│   ├── authRouter/
│   ├── components/
│   ├── controllers/
│   ├── datas/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── .env
│   ├── router.js
│   └── server.js

├── public/
├── src/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── publicRouter/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
├── .env
├── .env.example
├── index.html
├── fichiers config
└── readme

.env
README.md

---

## 📷 Aperçu

![Page d'accueil de Santiago](./public/assets/accueil.PNG)
![Page des commentaires](./public/assets/commentaires.PNG)
![Page admin](./public/assets/adminComs.PNG)
![Page profile](./public/assets/profileFictif.PNG)
![QR code DECP](./public/assets/decpQrcode.PNG)

---

## 🧪 Sécurité

Santiago inclut plusieurs couches de protection :

- Validation des entrées côté serveur
- Hashage des mots de passe avec bcrypt
- ReCAPTCHA pour prévenir les bots
- Rate limiting sur les routes sensibles
- Vérification d’identité avec token sécurisé

---

## 👤 Auteur

Développé par [FAUSTINO Yohann](https://github.com/Yohann-Faustino)

---

## 📝 Licence

Ce projet est sous licence MIT — libre à toi de le modifier, réutiliser ou contribuer.

---

## 🌐 Déploiement

[🌐 Voir le site en ligne](https://santiago-plum.vercel.app)
Backend hébergé sur [Railway](https://railway.com/)

---
