// Gère les routes accessibles sans être connecté

import React from "react";
import { Routes, Route } from "react-router-dom";

// Import simplifié grâce à indexPublic.js
import {
  Layout,
  // Appointments, pour le futur du projet
  Comment,
  Contact,
  Error,
  Home,
  LegalDisclaimer,
  // Planning, pour le futur du projet
  PrivacyPolicy,
  Profile,
  Services,
  SignUp,
  SiteMap,
  AuthGuard,
  ForgotPassword,
  ResetPassword,
} from "./indexPublic";

const PublicRouter = () => {
  return (
    <Routes>
      {/* Layout englobe toutes les pages suivantes */}
      <Route element={<Layout />}>
        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legaldisclaimer" element={<LegalDisclaimer />} />
        <Route path="/siteMap" element={<SiteMap />} />
        <Route path="/prestations" element={<Services />} />

        {/* Route en attente pour la suite du projet */}
        {/* <Route path="/planning" element={<Planning />} /> */}

        {/* Pages nécessitant une authentification */}
        <Route
          path="/profile"
          element={
            <AuthGuard route="profile">
              <Profile />
            </AuthGuard>
          }
        />

        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/comments" element={<Comment />} />

        {/* Pages de reset de mot de passe */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Route en attente pour la suite du projet */}
        {/* <Route
          path="/appointments"
          element={
            <AuthGuard route="appointments">
              <Appointments />
            </AuthGuard>
          }
        /> */}

        {/* Route 404 */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
