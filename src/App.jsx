import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRouter from "./publicRouter/publicRouter";
import AdminRouter from "../backend/adminRouter/adminRouter";
import AuthRouter from "../backend/authRouter/authRouter";
import AuthGuard from "../backend/components/securite/authGuard";
import ThemeToggle from "./components/themeToggle";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
            {/* Router pour la partie publique du site */}
            <Route path="/*" element={<PublicRouter />} />

            {/* Router pour la partie admin avec AuthGuard */}
            <Route
              path="/admin/*"
              element={
                <AuthGuard>
                  <AdminRouter />
                </AuthGuard>
              }
            />

            {/* Router spécifique aux routes d'authentification */}
            <Route path="/auth/*" element={<AuthRouter />} />

            {/* Routes pour le mot de passe oublié / reset */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
