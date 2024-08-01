// Gére la configuration et le rendu des routes accessibles sans être connecté:
import React from "react";
import { Routes, Route } from "react-router-dom";
// On peut importer simplement comme suit car on a fait un fichier indexPublic:
import { 
  Layout, 
  Nav,
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
  AuthGuard 
} from './indexPublic';

/*import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import LegalDisclaimer from "../pages/LegalDisclaimer";
import SiteMap from "../pages/SiteMap";
import Services from "../pages/Service";
// import Planning from "../pages/Planning";
// import AdminBoard from "../pages/AdminBoard";
import Error from "../pages/Error";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Profile from "../pages/Profile";
import Comment from "../pages/Comment";
import Appointments from "../pages/Appointments";
// import Users from "../pages/Users";
import Layout from '../layouts/layout';
import AuthGuard from "../../backend/components/securite/authGuard";*/

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
            {/* <Route path="/planning" element={<Planning />} /> */}
            {/* <Route path="/admin/dashboard" element={<AdminBoard />} /> */}
            <Route path="/profile" element={<AuthGuard route="profile"><Profile /></AuthGuard>} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/comments" element={<AuthGuard route="comments"><Comment /></AuthGuard>} />
            <Route path="/appointments" element={<AuthGuard route="appointments"><Appointments /></AuthGuard>} />
            {/* <Route path="/users" element={<AuthGuard route="users"><Users /></AuthGuard>} /> */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
    );
};

export default PublicRouter;