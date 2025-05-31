import express from 'express';
import sequelize from './datas/database.js';
import * as dotenv from 'dotenv';
import router from './router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const app = express();
const port = process.env.PORT || 3000;

// Helmet pour sécuriser les headers HTTP
app.use(helmet());

// Origines autorisées pour CORS
const allowedOrigins = ['https://santiago-plum.vercel.app', 'http://localhost:3000'];

// Middleware CORS avec gestion personnalisée des origines
app.use(cors({
  origin: function(origin, callback) {
    // Permet requêtes sans origine (ex: postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Requête bloquée CORS depuis origine non autorisée : ${origin}`);
      }
      // Ne pas renvoyer d'erreur mais refuser l'origine
      return callback(null, false);
    }
    // Origine autorisée
    return callback(null, true);
  },
  credentials: true, 
}));

// Gérer explicitement la requête OPTIONS pour toutes les routes (preflight)
app.options('*', cors());

// Middleware JSON + bodyParser (attention, express.json() suffit normalement)
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging des headers uniquement en dev
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    next();
  });
}

// Routes principales
app.use(router);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sert les fichiers statiques générés par Vite dans /dist
app.use(express.static(path.join(__dirname, '../dist')));

// Pour toute route non reconnue côté backend, renvoyer index.html (React gère la route)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Erreur détectée (détails complets) :', err);
  } else {
    console.error('❌ Une erreur est survenue.');
  }

  res.status(err.status || 500).json({
    message: "Une erreur interne est survenue. Veuillez réessayer plus tard."
  });
});

// Démarrage du serveur après connexion à la BDD
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');

    await sequelize.sync({ alter: true });
    console.log('✅ Base de données synchronisée.');

    app.listen(port, () => {
      console.log(`Le serveur est à l'écoute sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données.');
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    process.exit(1);
  }
};

startServer();
