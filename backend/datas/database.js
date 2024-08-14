import Sequelize from 'sequelize'; //  Importation du module Sequelize, qui est utilisé pour interagir avec une base de données SQL
import * as dotenv from 'dotenv' // Importation du module dotenv, qui est utilisé pour charger les variables d'environnement à partir d'un fichier .env.

dotenv.config(); // Charge les variables d'environnement à partir d'un fichier .env et les ajoute au processus d'exécution de Node.js

// Initialise sequelize avec le PG_URL du .env a la racine du projet
const sequelize = new Sequelize(process.env.PG_URL, {

    define: {
        timestamps: false, // Indique à Sequelize de ne pas ajouter automatiquement les champs created et updated dans les modèles de la base de données.
        underscored: true //Indique à Sequelize d'utiliser des noms de colonnes en snake_case au lieu de camelCase
    }
});


// Le test suivant permet de savoir si on est co a la BDD ou pas
sequelize.authenticate()
.then(() => {

    console.log('Connection -> OK');
})

.catch(err => {

    console.log('Connection -> failed', err);
});


export default sequelize;