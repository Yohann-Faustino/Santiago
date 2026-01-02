import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../services/supabaseClient.js";

const ProfilePage = () => {
  // ======================= États =======================
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

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const flag = useRef(false);

  // ======================= Récupération du profil =======================
  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();
          if (sessionError) throw sessionError;
          if (!session?.user) throw new Error("Utilisateur non connecté.");

          const userId = session.user.id;

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("auth_id", userId)
            .single();
          if (error) throw error;

          setEditData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            city: data.city || "",
            postalcode: data.postalcode || "",
          });
        } catch (err) {
          setError(err.message || "Erreur lors de la récupération du profil.");
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
  }, []);

  // ======================= Gestion des champs =======================
  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const togglePassword = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  // ======================= Soumission du profil =======================
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
        "Veuillez saisir votre mot de passe actuel pour valider les modifications."
      );
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Met à jour les infos du profil
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session?.user) throw new Error("Utilisateur non connecté.");

      const userId = session.user.id;

      const { error: updateError } = await supabase
        .from("users")
        .update(editData)
        .eq("auth_id", userId);

      if (updateError) throw updateError;

      // 2️⃣ Met à jour le mot de passe si demandé
      if (passwordData.newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: passwordData.newPassword,
        });
        if (passwordError) throw passwordError;
      }

      setMessage("✅ Modifications enregistrées !");
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

  // ======================= JSX =======================
  return (
    <div
      className={`profile-container mx-auto lg:w-1/4 relative ${
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
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => togglePassword(field)}
              >
                {showPassword[field] ? (
                  // === SVG œil ouvert d'origine ===
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  // === SVG œil fermé d'origine ===
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.12 10.12a3 3 0 014.76 4.76"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7"
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
