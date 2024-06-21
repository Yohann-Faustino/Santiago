// On crée le server pour le backend

import express from 'express';
import sequelize from './datas/database.js';
import * as dotenv from 'dotenv';
import session from 'express-session';
import router from './router.js';

// Récupère les variables d'environnement depuis un fichier .env
dotenv.config();

const app = express(); // Crées une session Express qui définis les routes, applique les middlewares et configure les comportements du serveur back.
const port = 3000; // On décide que le port du serveur soit le 3000
// const port = process.env.PORT || 3000; probleme avec le process ???


app.use(express.json()); // Dans le contexte d'Express.js, parser le JSON signifie lire les données JSON envoyées dans le corps des requêtes HTTP (par exemple, via un formulaire POST) et les convertir en objets JavaScript pour les traiter dans les routes du serveur back.

app.use(express.urlencoded({extended:true})); // Cutter qui ouvre ce qu'on recois de l'user (req.body)

// Ces lignes de code permettent de gérer la session du customer
/*app.use(session({
    resave: true, // la session est réenregistrée meme si elle n'est pas modifiée
    secret: process.env.SECRET, // ajoute une part d'aléatoire dans la génération des id de session imprédictible
    saveUninitialized: true, // génère un id de session pour tous ceux qui n'en ont pas encore
    /*cookie: { secure: true } securitee qui boss avec https donc si on boss en locale c'est inutile*/
/*}));*/

// On importe le router pour que le server comprenne les routes du projet
app.use(router);


// Permet de démmarer le serveur et affiche un message pour dire qu'il est fonctionnel
app.listen(port, () => {
    console.log(`Le serveur démarré est à l'écoute sur http://localhost:${port}`);
});