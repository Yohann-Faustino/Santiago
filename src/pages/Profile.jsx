import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  updatePassword,
} from "../services/profile.service"; // Service Supabase pour le profil

const ProfilePage = () => {
  const navigate = useNavigate();

  // États pour stocker les données du profil et gérer le formulaire
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalcode: "",
  });

  // États pour le formulaire de changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false); // Indique si une action est en cours
  const [message, setMessage] = useState(""); // Message de succès
  const [error, setError] = useState(""); // Message d'erreur
  const [showPasswords, setShowPasswords] = useState(false); // Toggle visibilité mot de passe

  const flag = useRef(false); // Permet de ne charger le profil qu'une seule fois

  // Récupère les infos du profil au montage du composant
  useEffect(() => {
    if (!flag.current) {
      flag.current = true;

      const fetchProfileData = async () => {
        setLoading(true); // Affiche le chargement
        try {
          const user = await getProfile(); // Récupération du profil depuis Supabase
          setProfileData(user);

          // Pré-remplissage du formulaire avec les données existantes
          setEditData({
            firstname: user.user_metadata?.firstname || "",
            lastname: user.user_metadata?.lastname || "",
            email: user.email || "",
            phone: user.user_metadata?.phone || "",
            address: user.user_metadata?.address || "",
            city: user.user_metadata?.city || "",
            postalcode: user.user_metadata?.postalcode || "",
          });

          console.log("Profil récupéré :", user);
        } catch (err) {
          console.error("Erreur récupération profil :", err);
          setError("Erreur lors de la récupération du profil.");
        } finally {
          setLoading(false); // Fin du chargement
        }
      };

      fetchProfileData();
    }
  }, []);

  // Gère les changements dans le formulaire d'informations personnelles
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Gère les changements dans le formulaire de mot de passe
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire complet (profil + mot de passe)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Vérifie que les nouveaux mots de passe correspondent
    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmNewPassword
    ) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      // Mise à jour du profil
      const updatedUser = await updateProfile(editData);
      setProfileData(updatedUser);

      // Mise à jour du mot de passe si renseigné
      if (passwordData.newPassword) {
        await updatePassword({ newPassword: passwordData.newPassword });
        setPasswordData({ newPassword: "", confirmNewPassword: "" });
      }

      setMessage("✅ Modifications enregistrées.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Erreur mise à jour profil :", err);
      setError("❌ Une erreur est survenue lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`profile-container mx-auto w-1/4 relative ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Overlay de chargement */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
          <p className="text-xl font-semibold">Chargement...</p>
        </div>
      )}

      <h1 className="colorTitle text-center">Mon Profil</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        style={{ overflowY: "auto", maxHeight: "800px" }}
      >
        {/* Informations personnelles */}
        <h2 className="colorh2">Informations personnelles</h2>
        {[
          "firstname",
          "lastname",
          "email",
          "phone",
          "address",
          "city",
          "postalcode",
        ].map((field) => (
          <div key={field} className="input-group">
            <label htmlFor={`${field}Profile`}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              className="inputGeneral text-black"
              type={field === "email" ? "email" : "text"}
              id={`${field}Profile`}
              name={field}
              value={editData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Changement de mot de passe */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="colorh2">Changement mot de passe</h2>
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
          >
            {showPasswords ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="newPasswordProfile">Nouveau mot de passe</label>
          <input
            className="inputGeneral text-black"
            type={showPasswords ? "text" : "password"}
            id="newPasswordProfile"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmNewPasswordProfile">
            Confirmer mot de passe
          </label>
          <input
            className="inputGeneral text-black"
            type={showPasswords ? "text" : "password"}
            id="confirmNewPasswordProfile"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Messages de succès ou erreur */}
        {message && (
          <p className="text-green-600 font-semibold mb-4">{message}</p>
        )}
        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="allButton mt-6 mx-auto"
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Mettre à jour le profil"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
