import { DataTypes, Model } from "sequelize";
import sequelize from "../datas/database";

class Appointments extends Model {}

Appointments.init({

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
        modelName: 'Appointments',
        tableName: 'Appointments'
    }

);

export default Appointments;