import express from 'express';
import sequelize from './datas/database.js';
import * as dotenv from 'dotenv';
import router from './router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
console.log('URL PG_URL:', process.env.PG_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // ✅ Déclaré AVANT tout le reste
const port = process.env.PORT || 3000;

// Helmet pour sécuriser les headers HTTP
app.use(helmet());

// CORS
const allowedOrigins = ['https://santiago-plum.vercel.app', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Requête bloquée CORS depuis origine non autorisée : ${origin}`);
      }
      return callback(null, false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.options('*', cors());

// Middleware JSON et URL-encoded
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging headers (dev uniquement)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    next();
  });
}

// ✅ D'abord les routes API
app.use(router);

// ✅ Ensuite, les fichiers statiques React (dossier dist)
app.use(express.static(path.join(__dirname, '../dist')));

// ✅ Enfin, toutes les autres routes envoient index.html (client SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Gestion des erreurs
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

// Lancement serveur + BDD
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');

    await sequelize.sync({ alter: true });
    console.log('✅ Base de données synchronisée.');

    app.listen(port, () => {
      console.log(`✅ Serveur à l'écoute sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Échec de connexion à la base de données.');
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    process.exit(1);
  }
};

startServer();
