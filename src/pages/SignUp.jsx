import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { accountService } from "../services/account.service";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext);

  // États principaux
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Formulaire connexion
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);

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
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (signUpData.password !== signUpData.confirmPassword) {
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

  // Composant Input avec toggle mot de passe
  const PasswordInput = ({
    value,
    onChange,
    placeholder,
    show,
    toggleShow,
  }) => (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="inputGeneral text-black w-full pr-10"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={toggleShow}
        tabIndex={-1}
      >
        {show ? (
          // Oeil fermé
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1l22 22" />
            <path d="M17.94 17.94A10.46 10.46 0 0112 19c-5 0-9-3-11-7 1.11-2.06 2.79-3.89 4.78-5.24" />
            <path d="M9.53 9.53a3.5 3.5 0 014.94 4.94" />
            <path d="M10.12 5.12A9.95 9.95 0 0121 12c-1.11 2.06-2.79 3.89-4.78 5.24" />
          </svg>
        ) : (
          // Oeil ouvert
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1.05 12C2.84 7.94 7 5 12 5s9.16 2.94 10.95 7c-1.79 4.06-6 7-10.95 7S2.84 16.06 1.05 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );

  return (
    <div className="w-full flex justify-center relative bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="w-[420px] relative h-[600px] flex flex-col justify-center">
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
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              className="inputGeneral text-black"
            />
            <PasswordInput
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              placeholder="Mot de passe"
              show={showLoginPassword}
              toggleShow={() => setShowLoginPassword(!showLoginPassword)}
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
          {/* Lien Mot de passe oublié */}
          <div className="flex justify-center mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
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
              { name: "firstname", placeholder: "Prénom" },
              { name: "lastname", placeholder: "Nom" },
              { name: "email", placeholder: "Email" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={signUpData[field.name]}
                onChange={handleSignUpChange}
                required
                className="inputGeneral text-black"
              />
            ))}

            <PasswordInput
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
              placeholder="Mot de passe"
              show={showSignUpPassword}
              toggleShow={() => setShowSignUpPassword(!showSignUpPassword)}
            />
            <PasswordInput
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirmer le mot de passe"
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {[
              { name: "phone", placeholder: "Téléphone" },
              { name: "address", placeholder: "Adresse" },
              { name: "city", placeholder: "Ville" },
              { name: "postalcode", placeholder: "Code postal" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={signUpData[field.name]}
                onChange={handleSignUpChange}
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
