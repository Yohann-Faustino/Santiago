import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../../src/pages/SignUp";
import Error from "../../src/pages/Error";

const AuthRouter = () => {
    return (
  <Routes>
    {/* L'index permet de rediriger l'utilisateur qui mettrais en url /auth/ alors qu'il y a pas de page a cet adresse et que la bonne adresse url est auth/signup. */}
    <Route index element={<SignUp/>}/>
    <Route path="signup" element={<SignUp/>}/>
    <Route path="*" element={<Error/>}/>
  </Routes>
    );
};

export default AuthRouter;