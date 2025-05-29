// // On crée le server pour le backend:

// import express from 'express';
// import sequelize from './datas/database.js';
// import * as dotenv from 'dotenv';
// import router from './router.js';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import helmet from 'helmet';

// dotenv.config(); // Récupère les variables d'environnement depuis un fichier .env

// const app = express(); // Crées une session Express qui définis les routes, applique les middlewares et configure les comportements du serveur back.
// const port = process.env.PORT || 3000; // On décide que le port du serveur soit le 3000.

// // Helmet ajoute des headers de sécurité dans les réponses HTTP
// app.use(helmet());

// // Activer CORS pour toutes les requêtes
// app.use(cors());

// app.use(bodyParser.json()); // Dans le contexte d'Express.js, parser le JSON signifie lire les données JSON envoyées dans le corps des requêtes HTTP (par exemple, via un formulaire POST) et les convertir en objets JavaScript pour les traiter dans les routes du serveur back.

// app.use(bodyParser.urlencoded({extended:true})); // Cutter qui ouvre ce qu'on recois de l'user (req.body).

// // On importe le router pour que le server comprenne les routes du projet.
// app.use(router);

// app.use((req, res, next) => {
//     next();
//   });  

// // Fonction asynchrone pour démarrer le serveur seulement si la BDD est accessible
// const startServer = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('✅ Connexion à la base de données réussie.');

//         app.listen(port, () => {
//             console.log(`Le serveur est à l'écoute sur http://localhost:${port}`);
//         });
//     } catch (error) {
//         console.error('❌ Impossible de se connecter à la base de données:');
//         process.exit(1); // Arrête le serveur en cas d'échec de connexion à la BDD
//     }
// };

// // Middleware de gestion d'erreurs global
// app.use((err, req, res, next) => {
//   console.error('Erreur détectée:', err); // Log complet dans la console

//   res.status(err.status || 500).json({
//     message: "Une erreur interne est survenue. Veuillez réessayer plus tard."
//     // Tu ne renvoies **jamais** err.message ou err.stack au client.
//   });
// });

// startServer();

// On crée le serveur pour le backend :

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

// Active CORS pour toutes les requêtes
app.use(cors());

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
