import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient.js";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams(); // Pour récupérer les paramètres dans l'URL (ex: access_token)
  const navigate = useNavigate(); // Pour rediriger l'utilisateur
  const [newPassword, setNewPassword] = useState(""); // Nouveau mot de passe
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmation du mot de passe
  const [message, setMessage] = useState(""); // Message de succès
  const [error, setError] = useState(""); // Message d'erreur

  // Au chargement de la page, si un access_token est présent dans l'URL, on le configure dans Supabase
  useEffect(() => {
    const access_token = searchParams.get("access_token");
    if (access_token) {
      supabase.auth.setSession({ access_token });
    }
  }, [searchParams]);

  // Regex pour sécuriser le mot de passe:
  // 8 caractères mini
  // 1 majuscule
  // 1 minuscule
  // 1 chiffre
  // 1 caractère spécial

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Fonction exécutée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setMessage(""); // Réinitialise les messages
    setError("");

    // Vérifie que les deux mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérifie que le mot de passe respecte le regex de sécurité
    if (!strongPasswordRegex.test(newPassword)) {
      setError(
        "Le mot de passe doit contenir au minimum 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    try {
      // Appelle Supabase pour mettre à jour le mot de passe
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      setMessage("✅ Mot de passe réinitialisé avec succès.");

      // Redirection vers l’accueil après 2 secondes
      setTimeout(() => {
        navigate("/");
      }, 2000);

      // Réinitialise les champs du formulaire
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      // Affiche l'erreur si la requête échoue
      setError(err.message);
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-10">
      {/* Titre de la page */}
      <h1 className="text-center text-xl font-bold mb-4">
        Réinitialiser le mot de passe
      </h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="inputGeneral text-black"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // Met à jour l'état newPassword
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="inputGeneral text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Met à jour l'état confirmPassword
          required
        />
        <button className="allButton" type="submit">
          Changer le mot de passe
        </button>
      </form>

      {/* Messages de succès ou d'erreur */}
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ResetPassword;
