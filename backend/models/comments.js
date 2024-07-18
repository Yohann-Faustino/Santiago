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
    }
    
},
    {
        sequelize,
        modelName: 'Comments',
        tableName: 'Comments'
    }
);

export default Comments;