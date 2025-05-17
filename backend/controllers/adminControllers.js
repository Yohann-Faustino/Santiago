// Message de confirmation que l’utilisateur est authentifié ET a le rôle admin

const getAdminDashboard = (req, res) => {
  res.json({ message: 'Bienvenue dans l’espace admin', userRole: req.userRole });
};

export default { getAdminDashboard };
