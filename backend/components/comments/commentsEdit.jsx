import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../src/services/supabaseClient";
import SideMenu from "../admin/sideMenu.jsx";

const CommentsEdit = () => {
  const [comment, setComment] = useState({
    title: "",
    content: "",
    users_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const flag = useRef(false);
  const { cid } = useParams();

  const onChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { title, content, users_id } = comment;
      const updatedData = { title, content, users_id };

      const { error } = await supabase
        .from("comments")
        .update(updatedData)
        .eq("id", cid);

      if (error) {
        setMessage("❌ Une erreur est survenue lors de la mise à jour.");
      } else {
        setMessage("✅ Commentaire mis à jour avec succès.");
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Une erreur est survenue lors de la mise à jour.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!flag.current) {
      const fetchComment = async () => {
        try {
          const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("id", cid)
            .single();
          if (error) throw error;
          setComment(data);
        } catch (err) {
          console.error(err);
          setMessage("❌ Impossible de charger le commentaire.");
        }
      };
      fetchComment();
      flag.current = true;
    }
  }, [cid]);

  return (
    <div className="commentsEdit max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-6">
      <h1 className="text-center text-red-700 text-2xl font-bold mb-6">
        Modifier le Commentaire
      </h1>

      <div className="mb-6 flex justify-center">
        <SideMenu />
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-6 text-center"
      >
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
            className="modifiable text-center w-full px-3 py-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
            className="modifiable text-center w-full px-3 py-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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

        {/* Bouton bleu identique aux autres pages */}
        <button
          className="allButton px-6 py-3 bg-blue-700 text-white font-semibold rounded-md w-full max-w-sm hover:bg-blue-600 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Enregistrement en cours..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
};

export default CommentsEdit;
