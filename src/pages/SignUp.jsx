// src/pages/AuthenticationPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { accountService } from "../services/account.service";
import { UserContext } from "../contexts/UserContext";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext); // met à jour le contexte après login

  // États principaux
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Formulaire connexion
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await accountService.login(loginData);
      await refreshUser();
      setMessage("✅ Connexion réussie !");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Formulaire inscription
  const [signUpData, setSignUpData] = useState({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    confirmerMotDePasse: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const handleSignUpChange = (e) =>
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
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

    if (signUpData.motDePasse !== signUpData.confirmerMotDePasse) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      await accountService.signUp(signUpData);
      await refreshUser();
      setMessage("✅ Inscription réussie !");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center relative bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="w-[420px] relative h-[600px]">
        {/* Formulaire Connexion */}
        <div
          className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
            isSignUp
              ? "opacity-0 -translate-x-full pointer-events-none"
              : "opacity-100 translate-x-0"
          }`}
        >
          <h2 className="text-xl font-bold mb-4 text-center colorTitle">
            Connexion
          </h2>
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              className="inputGeneral text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="inputGeneral text-black"
            />
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="allButton">
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

        {/* Formulaire Inscription */}
        <div
          className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
            isSignUp
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full pointer-events-none"
          }`}
        >
          <h2 className="text-xl font-bold mb-4 text-center colorTitle">
            Inscription
          </h2>
          <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-3">
            {[
              { name: "prenom", placeholder: "Prénom" },
              { name: "nom", placeholder: "Nom" },
              { name: "email", placeholder: "Adresse email" },
              { name: "motDePasse", placeholder: "Mot de passe" },
              {
                name: "confirmerMotDePasse",
                placeholder: "Confirmer mot de passe",
              },
              { name: "telephone", placeholder: "Téléphone" },
              { name: "adresse", placeholder: "Adresse" },
              { name: "ville", placeholder: "Ville" },
              { name: "codePostal", placeholder: "Code postal" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.name.includes("motDePasse") ? "password" : "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={signUpData[field.name]}
                onChange={handleSignUpChange}
                required={
                  field.name !== "telephone" &&
                  field.name !== "adresse" &&
                  field.name !== "ville" &&
                  field.name !== "codePostal"
                }
                className="inputGeneral text-black"
              />
            ))}

            <ReCAPTCHA
              className="flex justify-center"
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
            />

            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <button type="submit" disabled={loading} className="allButton">
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>
          <p className="text-sm mt-2 text-center">
            Déjà un compte ?{" "}
            <button
              className="text-blue-500 underline"
              onClick={() => setIsSignUp(false)}
            >
              Connectez-vous
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
