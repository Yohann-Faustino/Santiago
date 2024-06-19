import { DataTypes, Model } from "sequelize";
import sequelize from "../datas/database";

class appointments extends Model {}

appointments.init({

    date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        sequelize,
        modelName: 'appointments',
        tableName: 'Appointments'
    }

);

export default appointments;