// Contrôleur pour mettre à jour le profil:

import Profile from '../models/users.js';

const profileController = {
    // Méthode pour mettre à jour le profil
    updateProfile: async (req, res) => {
        try {
            // Contient les données envoyées dans la requête HTTP soit les valeurs du profil à mettre à jour:
            const id = req.userId; 
            const { firstname, lastname, email, phone, address, city, postalcode } = req.body;

            // Méthode de Sequelize pour mettre à jour les enregistrements dans la base de données:
            const updatedProfile = await Profile.update(
                { firstname, lastname, email, phone, address, city, postalcode },
                { where: { id } }
            );

            // Sequelize retourne un tableau où le nombre de lignes affectées par la mise à jour est compté et si c'est 0 cela signifie qu'aucune modifs:
            if (updatedProfile[0] === 0) {
                return res.status(404).json({ message: 'Profil non trouvé.' });
            }

            res.status(200).json({ message: 'Profil mis à jour avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour du profil.' });
        }
    }
};

export default profileController;
