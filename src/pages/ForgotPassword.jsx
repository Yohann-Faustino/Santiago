import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {

  // États locaux pour le formulaire
  const [email, setEmail] = useState("");
  const [successMessage, setSuccesMessage] = useState("");
  const [error, setError] = useState("");

  // Ajouter un état pour le token captcha
  const [captchaToken, setCaptchaToken] = useState(null);

  // useState pour gérer l'état de chargement lors des appels API (chargement en cour...):
  const [loading, setLoading] = useState(false);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setSuccesMessage("");
    setError("");

    if (!captchaToken) {
      setError("Veuillez valider le reCAPTCHA.");
      return;
    }

    try {
      setLoading(true);
      // Envoi des données pour l'envoi de mail:
      const response = await AxiosCall.post('/forgot-password', { email, captchaToken });
      if (response.status === 200) {
        setSuccesMessage("Un email de réinitialisation a été envoyé si cet email est enregistré.");
        setCaptchaToken(null);
      }
    } catch (err) {
      setError("Erreur lors de la demande de réinitialisation.");
    } finally {
      setLoading(false); // 👈 stoppe le chargement
    }
  };

  return (
    <div className="forgotPasswordContainer m-auto">
      <h1 className="colorTitle mb-5">Réinitialisation du mot de passe</h1>

      {successMessage && <p className="text-green-600" role="alert" aria-live="polite">{successMessage}</p>}
      {error && <p className="errorMessage text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className=" flex flex-col border border-blue-700 rounded-lg p-2">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className=" text-center mb-2 inputField border rounded-lg"
        />
        <ReCAPTCHA
          // Clef récupérée sur Google ReCaptcha
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
        <button
          type="submit"
          className="allButton m-auto"
          disabled={loading}
        >
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;