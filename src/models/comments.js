import { DataTypes, Model } from "sequelize";
import sequelize from "../datas/database";

class comments extends Model {}

comments.init({

    title: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    
},
    {
        sequelize,
        modelName: 'comments',
        tableName: 'Comments'
    }
);

export default comments;