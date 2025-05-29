import sequelize from "../datas/database";
import Users from './users';
import Appointments from './appointments';
import Comments from './comments';

// On définis la relation entre les modèles:

Users.hasMany(Comments, {
    foreignKey: 'users_id', // foreignKey renseigne le champs qui fait le lien entre les deux tables.
});

Comments.belongsTo(Users, {
    foreignKey: 'users_id',
});

Users.hasMany(Appointments, {
    foreignKey: 'users_id',
});

Appointments.belongsTo(Users, {
    foreignKey: 'users_id',
});

// Le test suivant permet de savoir si les modèles sont bien synchronisés:
sequelize.sync()
    .then(() => {

        console.log('Modèles -> synchronisés');
    })

    .catch(err => {

        console.error('Modèles -> aucune synchronisation', err)
    });

export { Users, Comments, Appointments };