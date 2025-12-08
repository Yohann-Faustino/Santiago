import React, { useRef, useState, useEffect } from "react";
// SUPABASE: import client Supabase
import { supabase } from "../../../src/services/supabaseClient";
import { Link } from "react-router-dom";
import SideMenu from "../admin/sideMenu";

const Comments = () => {
  // Ce hook prépare une place pour stocker les données des commentaires
  const [comments, setComments] = useState([]);

  // useState pour gérer l'état de chargement lors des appels API
  const [loading, setLoading] = useState(true);

  // Ce hook pour afficher les messages utilisateur
  const [message, setMessage] = useState("");

  // Ce hook sert de pense-bête pour éviter les appels multiples
  const flag = useRef(false);

  // useEffect permet de charger les données après le rendu initial du composant
  useEffect(() => {
    if (!flag.current) {
      const fetchComments = async () => {
        try {
          const { data, error } = await supabase.from("comments").select("*");
          if (error) throw error;
          setComments(data);
        } catch (err) {
          console.error(err);
          setMessage("❌ Impossible de charger les commentaires.");
        } finally {
          setLoading(false);
        }
      };
      fetchComments();
      flag.current = true;
    }
  }, []);

  // Fonction de suppression d'un commentaire
  const delComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Es-tu sûr de vouloir supprimer ce commentaire ?"
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      if (error) throw error;
      setComments((current) =>
        current.filter((comment) => comment.id !== commentId)
      );
      setMessage("✅ Commentaire supprimé avec succès.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Échec de la suppression du commentaire.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="comments flex-col p-4">
      <h1 className="mb-4">Liste des commentaires :</h1>
      {message && (
        <div role="alert" aria-live="assertive">
          {message}
        </div>
      )}
      {loading ? (
        <p>Chargement des commentaires...</p>
      ) : (
        <div className="commentsSideMenu justify-around">
          <div>
            <SideMenu />
          </div>
          <div className="commentsBoard">
            <table className="border-collapse border border-gray-300 w-full">
              <thead>
                <tr className="bg-red-500">
                  <th
                    scope="col"
                    className="p-2 text-center border border-gray-300"
                  >
                    🚮
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-center border border-gray-300"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-center border border-gray-300"
                  >
                    Titre
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-center border border-gray-300"
                  >
                    Contenu
                  </th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-gray-100">
                    <td
                      className="text-center border border-gray-300 cursor-pointer hover:bg-red-100"
                      onClick={() => delComment(comment.id)}
                      title="Supprimer le commentaire"
                      aria-label={`Supprimer le commentaire ${comment.title}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") delComment(comment.id);
                      }}
                    >
                      🗑️
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/comments/commentsedit/${comment.id}`}>
                        {comment.id}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/comments/commentsedit/${comment.id}`}>
                        {comment.title}
                      </Link>
                    </td>
                    <td className="p-2 text-center border border-gray-300">
                      <Link to={`/admin/comments/commentsedit/${comment.id}`}>
                        {comment.content}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
