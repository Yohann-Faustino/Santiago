// src/pages/admin/CommentsEdit.jsx
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { commentService } from "../../../src/services/comment.service.js";
import SideMenu from "../admin/sideMenu.jsx";

const CommentsEdit = () => {
  // État local pour stocker les données du commentaire
  const [comment, setComment] = useState({
    title: "",
    content: "",
    users_id: "",
  });

  // useState pour gérer l'état de chargement lors des appels API
  const [loading, setLoading] = useState(false);

  // Référence pour éviter les appels multiples
  const flag = useRef(false);

  // Message de succès ou d'erreur
  const [message, setMessage] = useState("");

  // Récupération de l'ID du commentaire depuis l'URL
  const { cid } = useParams();

  // Fonction pour gérer le changement des inputs
  const onChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction de soumission du formulaire
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Supabase n'accepte pas la mise à jour de la colonne 'id'
      const { title, content, users_id } = comment;
      const updatedData = { title, content, users_id };

      // Mise à jour du commentaire
      const updated = await commentService.updatedComment(cid, updatedData);

      if (updated) {
        setMessage("✅ Commentaire mis à jour avec succès.");
      } else {
        setMessage("❌ Une erreur est survenue lors de la mise à jour.");
      }

      // Efface le message après 3s
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Erreur mise à jour commentaire:", err);
      setMessage("❌ Une erreur est survenue lors de la mise à jour.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Récupération du commentaire à éditer au chargement
  useEffect(() => {
    if (!flag.current) {
      commentService
        .getComment(cid)
        .then((res) => {
          if (res) setComment(res);
          else setMessage("❌ Impossible de charger le commentaire.");
        })
        .catch(() => {
          setMessage("❌ Impossible de charger le commentaire.");
        });

      flag.current = true;
    }
  }, [cid]);

  return (
    <div className="commentsEdit p-4">
      <h1 className="mb-3">Modifier le Commentaire:</h1>

      <div className="mb-5">
        <SideMenu />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col text-center">
        <div className="flex flex-col mb-3">
          <label htmlFor="editCommentTitle">Titre</label>
          <input
            className="modifiable text-center"
            id="editCommentTitle"
            type="text"
            name="title"
            value={comment.title || ""}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="editCommentContent">Contenu</label>
          <textarea
            className="modifiable text-center"
            id="editCommentContent"
            name="content"
            value={comment.content || ""}
            onChange={onChange}
          />
        </div>

        {/* Message de succès ou d'erreur */}
        {message && (
          <p
            role="alert"
            aria-live="assertive"
            className={`font-semibold mb-4 ${
              message.startsWith("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          className="p-2 bg-blue-900 text-white rounded"
          disabled={loading}
        >
          {loading ? "Enregistrement en cours..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
};

export default CommentsEdit;
