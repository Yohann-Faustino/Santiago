import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../../src/pages/SignUp";
import Error from "../../src/pages/Error";

const AuthRouter = () => {
  return (

    <Routes>
      {/* Affiche SignUp quand l’utilisateur va sur /auth directement */}
      <Route index element={<SignUp />} />
      <Route path="*" element={<Error />} />
    </Routes>

  );
};

export default AuthRouter;