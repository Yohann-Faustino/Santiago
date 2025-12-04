import React, { useState, useEffect, useRef } from "react";
import {
  getProfile,
  updateProfile,
  updatePassword,
} from "../services/profile.service";

const ProfilePage = () => {
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Un état pour chaque œil
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const flag = useRef(false);

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          const user = await getProfile();
          setProfileData(user);
          setEditData({
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            city: user.city || "",
            postalcode: user.postalcode || "",
          });
        } catch {
          setError("Erreur lors de la récupération du profil.");
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
  }, []);

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const togglePassword = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmNewPassword
    ) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    if (!passwordData.currentPassword) {
      setError(
        "Veuillez saisir votre mot de passe actuel pour valider les modifications du profil."
      );
      setLoading(false);
      return;
    }

    try {
      // Met à jour le profil côté Supabase
      await updateProfile(editData, passwordData.currentPassword);

      // Met à jour le mot de passe si demandé
      if (passwordData.newPassword) {
        await updatePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        });
      }

      setMessage("✅ Modifications enregistrées.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err.message || "❌ Une erreur est survenue.");
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

        <h2 className="colorh2 mt-4">Sécurité</h2>

        {["currentPassword", "newPassword", "confirmNewPassword"].map(
          (field) => (
            <div key={field} className="input-group relative">
              <label htmlFor={`${field}Profile`}>
                {field === "currentPassword"
                  ? "Mot de passe actuel"
                  : field === "newPassword"
                  ? "Nouveau mot de passe"
                  : "Confirmer mot de passe"}
              </label>

              <input
                className="inputGeneral text-black pr-10"
                type={showPassword[field] ? "text" : "password"}
                id={`${field}Profile`}
                name={field}
                value={passwordData[field]}
                onChange={handlePasswordChange}
              />

              {/* BOUTON ŒIL — bien positionné */}
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => togglePassword(field)}
              >
                {showPassword[field] ? (
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
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
               -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          )
        )}

        {message && (
          <p className="text-green-600 font-semibold mb-4">{message}</p>
        )}
        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

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
