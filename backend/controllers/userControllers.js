import Users from '../models/users.js';

const userController = {
    // Méthode pour supprimer un utilisateur
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findByPk(id); // Trouver l'utilisateur à supprimer

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            await user.destroy(); // Supprimer l'utilisateur
            res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    }
};

export default userController;
