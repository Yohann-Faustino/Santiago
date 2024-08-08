// On test la connexion avec notre bdd pour savoir si sequelize est bien configuré.

import sequelize from "./sequelize.config.js";

const testConnection = async () => {
    try {
        await sequelize.authenticate(); // On tente de se connecter à la bdd en utilisant sequelize.config.js
        console.log('Connection avec sequelize établie avec succès.');
    } catch (error) {
        console.error('Erreur entre la bdd et sequelize:', error);
    }
};

testConnection();

// Pour lancer le test dans le terminale:
// node testConnectionSequelize.js