// Contrôleur pour mettre à jour le profil:

import Profile from '../models/users.js';
import bcrypt from 'bcrypt';

const profileController = {
    // Méthode pour mettre à jour le profil
    updateProfile: async (req, res) => {
        try {
            // Contient les données envoyées dans la requête HTTP soit les valeurs du profil à mettre à jour:
            const { firstname, lastname, email, phone, address, city, postalcode } = req.body;

            // Méthode de Sequelize pour mettre à jour les enregistrements dans la base de données:
            const updatedProfile = await Profile.update(
                { firstname, lastname, email, phone, address, city, postalcode },
                { where: { id: req.userId } }
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
    },
    // Méthode pour mettre à jour le mdp
      updatePassword: async (req, res) => {
        const { currentPassword, newPassword } = req.body;

        try {
            const user = await Profile.findOne({ where: { id: req.userId } });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Mot de passe actuel incorrect.' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe :', error);
            res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du mot de passe.' });
        }
    }
};

export default profileController;
