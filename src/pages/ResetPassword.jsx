import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AxiosCall from "../services/axiosCall";
import validator from "validator";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get('token'); 
  const navigate = useNavigate(); // On récupère le token de l'URL
  if (process.env.NODE_ENV === 'development') {
    console.log("Token récupéré de l'URL :", token);
  }

  // États locaux pour le formulaire
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // useState pour gérer l'état de chargement lors des appels API (chargement en cours...):
  const [loading, setLoading] = useState(false);

  // Vérifie la robustesse du mot de passe avec validator
  const isPasswordStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Token de réinitialisation manquant ou invalide.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    if (!isPasswordStrong) {
      setError(
        "❌ Le mot de passe est trop faible. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Soumission du formulaire avec : ", {
        token,
        password,
        confirmPassword,
        isPasswordStrong,
      });
    }

    try {
      setLoading(true);
      const response = await AxiosCall.post(`/reset-password`, {
        token,
        newPassword: password,
      });

      if (process.env.NODE_ENV === "development") {
        console.log("Réponse du backend :", response);
      }

      if (response.status === 200) {
        setMessage("✅ Mot de passe réinitialisé avec succès !");
        setTimeout(() => navigate("/signup"), 3000); // Redirection après 3s
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Erreur attrapée côté client :", err);
      }
      setError(
        err.response?.data?.message ||
        "❌ Erreur lors de la réinitialisation du mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetPasswordContainer m-auto max-w-md p-4">
      <h1 className="colorTitle mb-5 text-center">
        Réinitialisation du mot de passe
      </h1>

      {message && <p className="successMessage mt-4 text-center">{message}</p>}
      {error && <p className="errorMessage mt-4 text-center text-red-400">{error}</p>}
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-blue-700 rounded-lg p-4"
      >
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="inputField border rounded-lg w-full p-2 mb-3 text-center"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="inputField border rounded-lg w-full p-2 mb-3 text-center"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-sm text-blue-600 mb-4 underline"
        >
          {showPassword ? "🙈 Masquer les mots de passe" : "👁️ Afficher les mots de passe"}
        </button>

        {/* Feedbacks */}
        {password && (
          <p className={isPasswordStrong ? "text-green-600" : "text-red-600"}>
            {isPasswordStrong ? "✅ Mot de passe fort" : "❌ Mot de passe faible"}
          </p>
        )}
        {confirmPassword && (
          <p className={password === confirmPassword ? "text-green-600" : "text-red-600"}>
            {password === confirmPassword
              ? "✅ Les mots de passe correspondent"
              : "❌ Les mots de passe ne correspondent pas"}
          </p>
        )}

        <button
          type="submit"
          className="allButton mt-4"
          disabled={loading}
        >
          {loading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
        </button>
      </form>

    </div>
  );
};

export default ResetPassword;
