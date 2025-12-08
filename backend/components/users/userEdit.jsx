import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// SUPABASE
import { supabase } from "../../../src/services/supabaseClient";
import SideMenu from "../admin/sideMenu.jsx";

const UserEdit = () => {
  const [message, setMessage] = useState(""); // message utilisateur
  const [loading, setLoading] = useState(false); // état chargement
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalcode: "",
    role: "",
  });
  const flag = useRef(false); // pour éviter double fetch
  const { uid } = useParams(); // ID utilisateur depuis URL

  // Gestion des changements des inputs
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Soumission du formulaire
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // SUPABASE: mise à jour de l'utilisateur dans la table "users"
      const { error } = await supabase
        .from("users")
        .update({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postalcode: user.postalcode,
          role: user.role,
        })
        .eq("id", uid);

      if (error) {
        console.error(error);
        setMessage("❌ Une erreur est survenue.");
      } else {
        setMessage("✅ Modifications du profil enregistrées.");
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Récupération des données utilisateur
  useEffect(() => {
    if (!flag.current) {
      const fetchUser = async () => {
        try {
          // SUPABASE: récupération de l'utilisateur par id
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", uid)
            .single();

          if (error) {
            console.error(error);
            setMessage("❌ Impossible de récupérer les données.");
          } else {
            setUser(data);
          }
        } catch (err) {
          console.error(err);
          setMessage("❌ Impossible de récupérer les données.");
        }
      };
      fetchUser();
      flag.current = true;
    }
  }, [uid]);

  return (
    <div className="userEdit flex flex-col items-center p-4">
      <h1 className="mb-3">Modifier l'utilisateur :</h1>

      <div className="mb-5 w-full max-w-xl">
        <SideMenu />
      </div>

      <form onSubmit={onSubmit} className="text-center w-full max-w-xl">
        {[
          "firstname",
          "lastname",
          "email",
          "phone",
          "address",
          "city",
          "postalcode",
        ].map((field) => (
          <div className="flex flex-col mb-3" key={field}>
            <label htmlFor={`${field}Edit`}>
              Modifier {field.charAt(0).toUpperCase() + field.slice(1)} :
            </label>
            <input
              id={`${field}Edit`}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={user[field] || ""}
              onChange={onChange}
              className="modifiable text-center"
            />
          </div>
        ))}

        <div className="flex flex-col mb-3">
          <label htmlFor="roleEdit">Modifier le rôle :</label>
          <select
            name="role"
            id="roleEdit"
            value={user.role || "utilisateur"}
            onChange={onChange}
            className="modifiable text-center p-2 border border-gray-400 m-auto"
          >
            <option value="utilisateur">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        {message && (
          <p
            aria-live="polite"
            className={`font-semibold mb-4 ${
              message.startsWith("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <button type="submit" className="allButton mt-4" disabled={loading}>
            {loading ? "Enregistrement en cours..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
