// Représentation de la structure des données dans une base de données:

import { DataTypes, Model } from "sequelize";
import sequelize from "../datas/database.js";

class Comments extends Model {}

Comments.init({
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Enregistre la date/heure de création automatiquement.
    },
    updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Nom du modèle des users.
            key: 'id' // La clé primaire du modèle users.
        }
    },
}, {
    sequelize,
    modelName: 'Comments',
    tableName: 'Comments',
    timestamps: false, // Sequelize ajoute automatiquement les champs `created` et `updated` ce qui évite de modifier la bdd et donc le seeding/migrate.
});

export default Comments;
