// On crée le server pour le backend

import express from 'express';
import sequelize from './datas/database.js';
import * as dotenv from 'dotenv';
import session from 'express-session';
import router from './router.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config(); // Récupère les variables d'environnement depuis un fichier .env

const app = express(); // Crées une session Express qui définis les routes, applique les middlewares et configure les comportements du serveur back.
const port = process.env.PORT || 3000; // On décide que le port du serveur soit le 3000.

// Activer CORS pour toutes les requêtes
app.use(cors());

app.use(bodyParser.json()); // Dans le contexte d'Express.js, parser le JSON signifie lire les données JSON envoyées dans le corps des requêtes HTTP (par exemple, via un formulaire POST) et les convertir en objets JavaScript pour les traiter dans les routes du serveur back.

app.use(bodyParser.urlencoded({extended:true})); // Cutter qui ouvre ce qu'on recois de l'user (req.body).

app.use(session({ // Ces lignes de code permettent de gérer la session du user.
    resave: false, // Option qui permet de déterminer si l'on sauvegarde a nouveau ou non une séssion quand le user est inscrit même si elle n'a pas été modifiée.
    secret: process.env.SECRET, // On récupère la phrase secrète du .env qui permet de signer le cookies comme ca on sait qu'il viens de notre serveur et cela évite de devoir s'inscrire à chaque requêtes.
    saveUninitialized: false, // Option qui permet de déterminer si l'on sauvegarde ou non la séssion vide qui s'initialise quand un visiteur accède à notre site.
    cookie: { secure: false, // Bouton on/off qui permet de mettre en place les cookies même sur des connexions non sécurisées (HTTP car connexion privée sans certificats), en développement on reste sur false et en production on passera en true.
              maxAge: 1*60*60*1000 // Détermine le temps de durée du cookie, ici 1h.
     }
}));

// On importe le router pour que le server comprenne les routes du projet.
app.use(router);

// server.js ou votre routeur principal

app.use((req, res, next) => {
    console.log('Headers:', req.headers); // Affiche tous les en-têtes de la requête
    next();
  });  

// Permet de démmarer le serveur et affiche un message pour dire qu'il est fonctionnel.
app.listen(port, () => {
    console.log(`Le serveur démarré est à l'écoute sur http://localhost:${port}`);
});