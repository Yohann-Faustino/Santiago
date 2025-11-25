// src/pages/AuthenticationPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { accountService } from "../services/account.service";
import { UserContext } from "../contexts/UserContext";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext); // pour mettre à jour le contexte après login

  const [isSignUp, setIsSignUp] = useState(false); // toggle formulaire inscription / connexion
  const [loading, setLoading] = useState(false); // état de chargement
  const [error, setError] = useState(""); // message d'erreur
  const [message, setMessage] = useState(""); // message succès

  // état du formulaire de connexion
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  // soumission du formulaire connexion
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await accountService.login(loginData); // connexion
      await refreshUser(); // met à jour la Nav
      setMessage("✅ Connexion réussie !");
      setTimeout(() => navigate("/"), 1500); // redirection accueil
    } catch (err) {
      setError(err.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  // état du formulaire d'inscription
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    postalcode: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSignUpChange = (e) =>
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  // soumission du formulaire inscription
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!captchaValue) {
      setError("Veuillez valider le reCAPTCHA.");
      setLoading(false);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      await accountService.signUp(signUpData);
      await refreshUser(); // met à jour la Nav pour les boutons profil et déconnexion
      setMessage("✅ Inscription réussie !");
      setTimeout(() => navigate("/"), 2000); // redirection accueil
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container flex justify-center gap-8 mt-10">
      {/* Formulaire connexion */}
      <div className="login-form w-1/2 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Connexion</h2>
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 mt-2"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="text-sm mt-2 text-center">
          Pas de compte ?{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => setIsSignUp(true)}
          >
            Inscrivez-vous
          </button>
        </p>
      </div>

      {/* Formulaire inscription */}
      {isSignUp && (
        <div className="signup-form w-1/2 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Inscription</h2>
          <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-3">
            {/* génération des inputs */}
            {[
              "firstname",
              "lastname",
              "email",
              "password",
              "confirmPassword",
              "phone",
              "address",
              "city",
              "postalcode",
            ].map((field) => (
              <input
                key={field}
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={field}
                value={signUpData[field]}
                onChange={handleSignUpChange}
                required={
                  field !== "phone" &&
                  field !== "address" &&
                  field !== "city" &&
                  field !== "postalcode"
                }
              />
            ))}

            {/* reCAPTCHA */}
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
            />

            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white p-2 mt-2"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>

            <p className="text-sm mt-2 text-center">
              Déjà un compte ?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsSignUp(false)}
              >
                Connectez-vous
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
