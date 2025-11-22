// Représentation de la structure des données dans une base de données:
// Code pour la suite du projet.

import { DataTypes, Model } from "sequelize";
import sequelize from "../datas/database.js";

class Appointments extends Model {}

Appointments.init({

    date: {
        type: DataTypes.STRING, // Peut être necessaire plus tard de remplacer.string par .date
        allowNull: true,
    },
    hour: {
        type: DataTypes.STRING, // Peut être necessaire plus tard de remplacer.string par .time
        allowNull: true,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        sequelize,
        modelName: 'Appointments',
        tableName: 'Appointments'
    }

);

export default Appointments;