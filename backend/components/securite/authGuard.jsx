// Vérifie si l'utilisateur est connecté sur la route où est apellé AutGuard sinon redirige vers la page de connexion/inscription.
// Vérifie si l'utilisateur connecté a le role admin sinon retour a l'accueil.

import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { accountService } from '../../../src/services/account.service';

const AuthGuard = ({ children }) => {
  if (!accountService.isLogged()) {
    return <Navigate to="/signup" />;
  }

  // Récupérer le rôle de l'utilisateur connecté
  const role  = accountService.getRole();

  // Bloquer l'accès si on est sur une route admin et que l'utilisateur n'est pas admin
  if (window.location.pathname.startsWith('/admin') && role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

// Validation des props (routes encapsulées dans authGuard):
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
