// Représentation de la structure des données dans une base de données:

import { DataTypes, Model } from 'sequelize';
import sequelize from '../datas/database.js';

class Users extends Model { }

Users.init({

    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidPhoneNumber(value) {
                if (!/^[0-9]{10}$/.test(value)) {
                    // ^ : Début de la chaîne
                    // [0-9] : Accepte les chiffres de 0 à 9
                    // {10} : Doit être exactement de 10 caractères
                    // $ : Fin de la chaîne
                    // i : Insensible à la casse (pour accepter les chiffres en majuscules ou minuscules)
                    throw new Error('Le numéro de téléphone doit être composé de 10 chiffres');
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true // Option sequelize de qui valide si l'email est au bon format.
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: { 
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'user' // Valeur par défaut, par exemple, 'user' pour les utilisateurs normaux.
    },
        resettoken: { // Sert pour la fonction mdp oublié
        type: DataTypes.STRING,
        allowNull: true
    },
    resettokenexpiry: { // Sert pour la fonction mdp oublié
        type: DataTypes.DATE,
        allowNull: true
    }
},

    {
        sequelize,
        modelName: 'Users',
        tableName: 'Users'
    }
);

export default Users;