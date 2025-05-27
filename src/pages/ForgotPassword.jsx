import React, { useState } from "react";
import AxiosCall from "../services/axiosCall";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {

  // États locaux pour le formulaire
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Ajouter un état pour le token captcha
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setMessage("");
    setError("");

    if (!captchaToken) {
      setError("Veuillez valider le reCAPTCHA.");
      return;
    }

    try {
      // Envoi des données pour l'envoi de mail:
      const response = await AxiosCall.post('/forgot-password', { email, captchaToken });
      if (response.status === 200) {
        setMessage("Un email de réinitialisation a été envoyé si cet email est enregistré.");
      }
    } catch (err) {
      setError("Erreur lors de la demande de réinitialisation.");
    }
  };

  return (
    <div className="forgotPasswordContainer m-auto">
      <h1 className="colorTitle mb-5">Réinitialisation du mot de passe</h1>
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
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // sécurise la clé via .env
          onChange={handleCaptchaChange}
        />
        <button type="submit" className="allButton m-auto">Envoyer</button>
      </form>
      {message && <p className="successMessage">{message}</p>}
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default ForgotPassword;