//  Point d'entrée des composants React de l'application.

import React from 'react';
import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from './publicRouter/publicRouter';
import AdminRouter from '../backend/adminRouter/adminRouter';
import AuthRouter from '../backend/authRouter/authRouter';
import AuthGuard from '../backend/components/securite/authGuard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route path="/admin/*" element={
            // On met AuthGuard autour de AdminRouter pour qu'il s'applique aux routes ce celui ci.
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
          } />
          {/* Router spécifique aux personnes identifiées: */}
          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
