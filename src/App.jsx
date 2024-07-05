import React from 'react';
import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthCheck from "../backend/components/securite/authCheck";
import PublicRouter from './publicRouter/publicRouter';
import AdminRouter from '../backend/admin/adminRouter';

function App() {
  return (
    <div>
      <AuthCheck /> {/* Vérifie si l'utilisateur du site a un token pour limiter/autoriser les accès. */}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter/>}/>
          <Route path="/admin/*" element={<AdminRouter/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
