import sequelize from "../datas/database";
import Users from './users';
import Appointments from './appointments';
import Comments from './comments';

// On définis la relation entre les modèles

Users.hasMany(Comments, {
    foreignKey: 'users', // foreignKey renseigne le champs qui fait le lien entre les deux tables
});

Comments.belongsTo(Users, {
    foreignKey: 'users',
});

Users.hasMany(Appointments, {
    foreignKey: 'users',
});

Appointments.belongsTo(Users, {
    foreignKey: 'users',
});

// Le test suivant permet de savoir si les modèles sont bien synchronisés
sequelize.sync()
.then(() => {

    console.log('Modèles -> synchronisés');
})

.catch(err => {

    console.log('Modèles -> aucune synchronisation', err)
});

export { Users, Comments, Appointments };