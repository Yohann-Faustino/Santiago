// Vérifie si l'utilisateur est connecté sur la route où est apellé AutGuard sinon redirige vers la page de connexion/inscription.

import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { accountService } from '../../../src/services/account.service';

const AuthGuard = ({ children }) => { // Children renvoie l'enfant qu'il y a entre les balises <AuthGuard>...<AuthGuard/> dnas les routers.

  if (!accountService.isLogged()) {
    return <Navigate to="/signup" />;
  }

  return children;
};

// Validation des props (routes encapsulées dans authGuard):
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
