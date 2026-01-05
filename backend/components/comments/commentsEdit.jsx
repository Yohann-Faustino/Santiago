import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../src/services/supabaseClient";
import SideMenu from "../admin/sideMenu.jsx";

const CommentsEdit = () => {
  // État du commentaire à modifier
  const [comment, setComment] = useState({
    title: "",
    content: "",
    users_id: "",
  });

  // État de chargement pour désactiver le bouton
  const [loading, setLoading] = useState(false);

  // Message de succès / erreur
  const [message, setMessage] = useState("");

  // Flag pour éviter double appel du useEffect
  const flag = useRef(false);

  // Récupération de l'ID du commentaire dans l'URL
  const { cid } = useParams();

  // Gestion des inputs du formulaire
  const onChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire → mise à jour du commentaire
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // On récupère uniquement les champs modifiables
      const { title, content, users_id } = comment;
      const updatedData = { title, content, users_id };

      // Requête Supabase pour mettre à jour
      const { error } = await supabase
        .from("comments")
        .update(updatedData)
        .eq("id", cid);

      // Gestion des erreurs
      if (error) {
        setMessage("❌ Une erreur est survenue lors de la mise à jour.");
      } else {
        setMessage("✅ Commentaire mis à jour avec succès.");
      }

      // Efface le message après 3 secondes
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue lors de la mise à jour.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Chargement du commentaire lors de l'arrivée sur la page
  useEffect(() => {
    if (!flag.current) {
      const fetchComment = async () => {
        try {
          // Récupération du commentaire par son ID
          const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("id", cid)
            .single();

          if (error) throw error;

          // Remplissage des champs
          setComment(data);
        } catch (err) {
          console.error(err);
          setMessage("❌ Impossible de charger le commentaire.");
        }
      };

      fetchComment();
      flag.current = true; // Empêche un second fetch
    }
  }, [cid]);

  return (
    // Conteneur principal centré + style propre
    <div className="commentsEdit max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-6">
      {/* Titre de la page */}
      <h1 className="text-center text-red-700 text-2xl font-bold mb-6">
        Modifier le Commentaire
      </h1>

      {/* Menu admin */}
      <div className="mb-6 flex justify-center">
        <SideMenu />
      </div>

      {/* Formulaire */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-4 text-center"
      >
        {/* Champ titre */}
        <div className="flex flex-col w-full max-w-md">
          <label
            htmlFor="editCommentTitle"
            className="font-semibold mb-1 text-gray-700 text-left"
          >
            Titre
          </label>

          <input
            id="editCommentTitle"
            type="text"
            name="title"
            value={comment.title || ""}
            onChange={onChange}
            className="modifiable text-center"
          />
        </div>

        {/* Champ contenu */}
        <div className="flex flex-col w-full max-w-md">
          <label
            htmlFor="editCommentContent"
            className="font-semibold mb-1 text-gray-700 text-left"
          >
            Contenu
          </label>

          <textarea
            id="editCommentContent"
            name="content"
            value={comment.content || ""}
            onChange={onChange}
            className="modifiable text-center min-h-[120px]"
          />
        </div>

        {/* Message d’erreur ou succès */}
        {message && (
          <p
            role="alert"
            aria-live="assertive"
            className={`font-semibold mt-2 ${
              message.startsWith("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Bouton bleu standard du site */}
        <button className="allButton mt-4" disabled={loading}>
          {loading ? "Enregistrement en cours..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
};

export default CommentsEdit;
