import sequelize from "../datas/database";
import Customers from './customers';
import Appointments from './appointments';
import Comments from './comments';

// On définis la relation entre les modèles

Customers.hasMany(Comments, {
    foreignKey: 'customers_id', // foreignKey renseigne le champs qui fait le lien entre les deux tables
});

Comments.belongsTo(Customers, {
    foreignKey: 'customers_id',
});

Customers.hasMany(Appointments, {
    foreignKey: 'customers_id',
});

Appointments.belongsTo(Customers, {
    foreignKey: 'customers_id',
});

// Le test suivant permet de savoir si les modèles sont bien synchronisés
sequelize.sync()
.then(() => {

    console.log('Modèles -> synchronisés');
})

.catch(err => {

    console.log('Modèles -> aucune synchronisation', err)
});

export { Customers, Comments, Appointments };