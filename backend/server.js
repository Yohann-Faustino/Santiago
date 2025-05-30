import express from 'express';
import sequelize from './datas/database.js';
import * as dotenv from 'dotenv';
import router from './router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config(); // Récupère les variables d'environnement depuis un fichier .env

const app = express();
const port = process.env.PORT || 3000;

// Helmet ajoute des headers de sécurité dans les réponses HTTP
app.use(helmet());

// Liste des origines autorisées pour CORS
const allowedOrigins = [
  'http://localhost:5173',  // URL front dev locale
  'https://santiago-production.up.railway.app' 
];

// Active CORS pour toutes les requêtes, mais uniquement depuis les origines autorisées
app.use(cors({
  origin: function(origin, callback){
    // autoriser les requêtes sans origine (ex: Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: Origine '${origin}' non autorisée.`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true // si tu utilises cookies ou autorisations avec credentials
}));

// Body parser pour traiter les données JSON et les formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log des headers uniquement en développement
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    next();
  });
}

// Utilisation du router principal
app.use(router);

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

// Démarre le serveur après vérification de la connexion à la BDD
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
