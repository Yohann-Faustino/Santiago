// Gére la configuration et le rendu des routes accessibles sans être connecté:

import React from "react";
import { Routes, Route } from "react-router-dom";
// On peut importer simplement comme suit car on a fait un fichier indexPublic:
import {
  Layout,
  Appointments,
  Comment,
  Contact,
  Error,
  Home,
  LegalDisclaimer,
  Planning,
  PrivacyPolicy,
  Profile,
  Services,
  SignUp,
  SiteMap,
  AuthGuard,
  ForgotPassword,
  ResetPassword
} from './indexPublic';

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* On met ce qu'il y a dans le layout (header, nav, footer) a toutes les pages suiavantes: */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legaldisclaimer" element={<LegalDisclaimer />} />
        <Route path="/siteMap" element={<SiteMap />} />
        <Route path="/prestations" element={<Services />} />
        {/* <Route path="/planning" element={<Planning />} /> On garde cette route pour la suite du projet */}
        <Route path="/profile" element={<AuthGuard route="profile"><Profile /></AuthGuard>} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/comments" element={<Comment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/appointments" element={<AuthGuard route="appointments"><Appointments /></AuthGuard>} />  On garde cette route pour la suite du projet */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;