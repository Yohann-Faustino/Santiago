import { DataTypes, Model } from 'sequelize';
import sequelize from '../datas/database';

class customers extends Model { }

customers.init({

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
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isValidPhoneNumber(value) {
                if(!/^[0-9]{10}$/i.test(value)){
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
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Option sequelize de qui valide si l'email est au bon format
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},

    {
        sequelize,
        modelName: 'customers',
        tableName: 'Customers'
    }
);

export default customers;