import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const Comments = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({ title: "", content: "" });

  // 🔥 Récupération utilisateur Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // 🔥 Récupérer les commentaires
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created", { ascending: false });
      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error("Erreur récupération commentaires:", err);
      setError("Erreur lors de la récupération des commentaires.");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/signup");
      return;
    }

    try {
      setLoadingAdd(true);
      setError("");

      const { error } = await supabase.from("comments").insert([
        {
          title: commentData.title,
          content: commentData.content,
          users_id: user.id,
        },
      ]);

      if (error) throw error;

      setCommentData({ title: "", content: "" });
      fetchComments();
      setSuccessMessage("Commentaire ajouté avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Erreur ajout commentaire:", err);
      setError("Erreur lors de l'ajout du commentaire.");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    // 🔹 Wrapper pour centrer horizontalement
    <div className="w-full flex justify-center">
      {/* 🔹 Conteneur limité en largeur pour éviter l’étirement */}
      <div className="commentBlock flex flex-row-reverse w-full max-w-5xl">
        {/* Formulaire */}
        <div className="commentInputBlock flex flex-col m-3 justify-center text-center">
          <h1 className="colorTitle mb-3">Laissez un commentaire :</h1>
          <form onSubmit={onSubmit}>
            <fieldset className="flex flex-col border p-2 rounded-lg border-blue-600">
              <legend className="text-lg font-semibold mb-2">
                Formulaire de commentaire
              </legend>
              <label htmlFor="commentTitle">Nom et Prénom :</label>
              <input
                className="inputGeneral focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="commentTitle"
                name="title"
                value={commentData.title}
                onChange={onChange}
                required
              />
              <label htmlFor="contentComment">
                Écrivez votre commentaire :
              </label>
              <textarea
                className="inputGeneral focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="contentComment"
                name="content"
                value={commentData.content}
                onChange={onChange}
                required
              />
              <button
                className="allButton mt-3"
                type="submit"
                disabled={loadingAdd}
              >
                {loadingAdd
                  ? "Ajout du commentaire en cours..."
                  : "Ajouter un commentaire"}
              </button>
            </fieldset>
          </form>

          {successMessage && (
            <div
              role="status"
              className="text-green-600 mt-3"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}
          {error && (
            <div role="alert" className="text-red-400 mt-3">
              {error}
            </div>
          )}
        </div>

        {/* Liste */}
        <div className="commentListBlock flex-1">
          <h2 className="colorTitle mb-3 text-center">
            Liste des Commentaires :
          </h2>
          {loadingComments ? (
            <p className="text-center text-blue-500">
              Chargement des commentaires...
            </p>
          ) : (
            <div
              className="cards"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id} className="mb-4 border-b pb-2">
                    <h3 className="text-red-700">{comment.title}</h3>
                    <p>{comment.content}</p>
                    <small className="text-gray-500">
                      Posté le {new Date(comment.created).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
