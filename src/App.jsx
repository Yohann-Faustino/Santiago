import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import LegalDisclaimer from "./pages/LegalDisclaimer";
import SiteMap from "./pages/SiteMap";
import Services from "./pages/Service";
import Planning from "./pages/Planning";
import AdminBoard from "./pages/AdminBoard";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Comment from "./pages/Comment";
import Appointments from "./pages/Appointments";
import Customers from "./pages/Customers";
import './styles.css';
import AuthCheck from "./components/authCheck";
import ProtectedData from "./components/protectedData";
import Layout from './layouts/layout';

function App() {
  return (
    <div>
      <AuthCheck /> {/* Vérifie si l'utilisateur du site a un token pour limiter/autoriser les accès. */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* On met ce qu'il y a dans le layout (header, nav, footer) a toutes les pages suiavantes: */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legalDisclaimer" element={<LegalDisclaimer />} />
            <Route path="/siteMap" element={<SiteMap />} />
            <Route path="/prestations" element={<Services />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/adminBoard" element={<AdminBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments" element={<ProtectedData route="comments"><Comment /></ProtectedData>} />
            <Route path="/appointments" element={<ProtectedData route="appointments"><Appointments /></ProtectedData>} />
            <Route path="/customers" element={<ProtectedData route="customers"><Customers /></ProtectedData>} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
