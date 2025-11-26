//  Point d'entrée des composants React de l'application.

import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRouter from "./publicRouter/publicRouter";
import AdminRouter from "../backend/adminRouter/adminRouter";
import AuthRouter from "../backend/authRouter/authRouter";
import AuthGuard from "../backend/components/securite/authGuard";
import ThemeToggle from "./components/themeToggle";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="fixed top-12 right-2 z-50">
        {/* Mode jour/nuit */}
        <ThemeToggle />
      </div>
      {/* Gère l’historique de navigation dans le navigateur */}
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/*" element={<PublicRouter />} />
            <Route
              path="/admin/*"
              element={
                // On met AuthGuard autour de AdminRouter pour qu'il s'applique aux routes ce celui ci.
                <AuthGuard>
                  <AdminRouter />
                </AuthGuard>
              }
            />
            {/* Router spécifique aux personnes identifiées: */}
            <Route path="/auth/*" element={<AuthRouter />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
