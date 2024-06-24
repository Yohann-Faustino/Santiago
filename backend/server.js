// On crée le server pour le backend

import express from 'express';
import sequelize from './datas/database.js';
import * as dotenv from 'dotenv';
import session from 'express-session';
import router from './router.js';
import { Pool } from 'pg';

// Récupère les variables d'environnement depuis un fichier .env
dotenv.config();

const app = express(); // Crées une session Express qui définis les routes, applique les middlewares et configure les comportements du serveur back.
const port = process.env.PORT || 3000; // On décide que le port du serveur soit le 3000.
const pool = new Pool ({ // On utilise un pool de connexions pour simplifier la gestion des connexions pour ne pas avoir à créer ou fermer les connexions manuellement à chaque requête.
    user: 'santiago',
    host: 'localhost',
    database: 'santiago,',
    password: 'santiago',
    port: 5432,
})

app.use(express.json()); // Dans le contexte d'Express.js, parser le JSON signifie lire les données JSON envoyées dans le corps des requêtes HTTP (par exemple, via un formulaire POST) et les convertir en objets JavaScript pour les traiter dans les routes du serveur back.

app.use(express.urlencoded({extended:true})); // Cutter qui ouvre ce qu'on recois de l'user (req.body).

app.use(session({ // Ces lignes de code permettent de gérer la session du customer.
    resave: false, // Option qui permet de déterminer si l'on sauvegarde a nouveau ou non une séssion quand le customer est inscrit même si elle n'a pas été modifiée.
    secret: process.env.SECRET, // On récupère la phrase secrète du .env qui permet de signer le cookies comme ca on sait qu'il viens de notre serveur et cela évite de devoir s'inscrire à chaque requêtes.
    saveUninitialized: false, // Option qui permet de déterminer si l'on sauvegarde ou non la séssion vide qui s'initialise quand un visiteur accède à notre site.
    cookie: { secure: false, // Bouton on/off qui permet de mettre en place les cookies même sur des connexions non sécurisées (HTTP car connexion privée sans certificats), en développement on reste sur false et en production on passera en true.
              maxAge: 12*60*60*1000 // Détermine le temps de durée du cookie, ici 12h.
     }
}));

// On importe le router pour que le server comprenne les routes du projet.
app.use(router);


// Permet de démmarer le serveur et affiche un message pour dire qu'il est fonctionnel.
app.listen(port, () => {
    console.log(`Le serveur démarré est à l'écoute sur http://localhost:${port}`);
});