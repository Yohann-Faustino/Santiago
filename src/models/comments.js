import { DataTypes, Model } from "sequelize";
import sequelize from "../datas/database";

class Comments extends Model {}

Comments.init({

    title: {
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