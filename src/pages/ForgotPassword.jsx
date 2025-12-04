import { useState } from "react";
import { forgotPassword } from "../services/auth.service";

const ForgotPassword = () => {
  // États pour l'email, le message de succès et le message d'erreur
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fonction exécutée à la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setMessage(""); // Réinitialise les messages
    setError("");

    try {
      // Appelle le service pour envoyer l'email de réinitialisation
      await forgotPassword(email);
      setMessage(
        "📩 Un email de réinitialisation a été envoyé ! Vérifiez votre boîte de réception."
      );
    } catch (err) {
      // Affiche l'erreur si la requête échoue
      setError(err.message);
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-10">
      {/* Titre de la page */}
      <h1 className="text-center text-xl font-bold mb-4">
        Mot de passe oublié
      </h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Votre email"
          className="inputGeneral text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Met à jour l'état email
          required
        />
        <button className="allButton" type="submit">
          Envoyer l'email
        </button>
      </form>

      {/* Messages de succès ou d'erreur */}
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
