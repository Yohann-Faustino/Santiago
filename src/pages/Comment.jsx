import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/comment.service";
import { accountService } from "../services/account.service";

const Comments = () => {
  // Récupère l'ID utilisateur depuis accountService
  const userId = accountService.getUser()?.id || null;

  // États pour gestion du formulaire et des messages
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [commentData, setCommentData] = useState({
    title: "",
    content: "",
    users_id: userId,
  });
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  // Met à jour l'état du formulaire
  const onChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du commentaire
  const onSubmit = async (e) => {
    e.preventDefault();

    // Redirige vers l'inscription si non connecté
    if (!accountService.isLogged()) {
      navigate("/signup");
      return;
    }

    const commentWithUserId = {
      ...commentData,
      users_id: userId,
    };

    try {
      setLoadingAdd(true);
      setError("");
      // Ajoute le commentaire via le service
      const addedComment = await commentService.addComment(commentWithUserId);

      if (!addedComment) return;

      // Rafraîchit la liste des commentaires
      await fetchComments();

      // Réinitialise le formulaire
      setCommentData({
        title: "",
        content: "",
        users_id: userId,
      });

      setSuccessMessage("Commentaire ajouté avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Erreur ajout commentaire:", err);
      const msg = err?.message || "Erreur lors de l'ajout du commentaire.";
      setError(msg);
    } finally {
      setLoadingAdd(false);
    }
  };

  // Récupère tous les commentaires
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await commentService.getAllComments();
      setComments(response.data || []);
    } catch (err) {
      console.error("Erreur récupération commentaires:", err);
      setError("Erreur lors de la récupération des commentaires.");
    } finally {
      setLoadingComments(false);
    }
  };

  // Charge les commentaires au montage
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="commentBlock flex flex-row-reverse w-[95%] max-w-[1200px]">
      {/* Formulaire de commentaire */}
      <div className="commentInputBlock flex flex-col m-3 justify-center text-center">
        <h1 className="colorTitle mb-3">Laissez un commentaire :</h1>

        <form onSubmit={onSubmit}>
          <fieldset className="flex flex-col border p-2 rounded-lg border-blue-600">
            <legend className="text-lg font-semibold mb-2">
              Formulaire de commentaire
            </legend>

            {/* Nom / Prénom */}
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

            {/* Contenu du commentaire */}
            <label htmlFor="contentComment">Écrivez votre commentaire :</label>
            <textarea
              className="inputGeneral focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="contentComment"
              name="content"
              value={commentData.content}
              onChange={onChange}
              required
            />

            {/* Bouton de soumission */}
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

        {/* Messages dynamiques */}
        {successMessage && (
          <div role="status" className="text-green-600 mt-3" aria-live="polite">
            {successMessage}
          </div>
        )}
        {error && (
          <div role="alert" className="text-red-400 mt-3">
            {error}
          </div>
        )}
      </div>

      {/* Liste des commentaires */}
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
  );
};

export default Comments;
