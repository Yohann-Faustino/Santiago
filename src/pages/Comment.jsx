import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/comment.service";
import { accountService } from "../services/account.service";

const Comments = () => {
  // Récupérer l'ID utilisateur depuis accountService:
  const userId = accountService.getCurrentUserId();

  // useState pour gérer l'état de chargement lors des appels API (chargement en cours...):
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  // Gère l'état des message de succes
  const [successMessage, setSuccessMessage] = useState('');

  // Surveille l’état des champs du formulaire
  const [commentData, setCommentData] = useState({
    title: '',
    content: '',
    users_id: userId // Dans la colonne users_id de la bdd on met la fonction qui récupère l'id de l'user.
  });

  // Contient la liste des commentaires déja existants:
  const [comments, setComments] = useState([]);

// Message d'erreur en cas de non récupération de la liste des commentaires existants
  const [error, setError] = useState(null);

  // Permet de rediriger l'utilisateur après une action spécifique
  const navigate = useNavigate();

  // Met à jour commentData lors des modifications du formulaire:
  const onChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value
    });
  };

  // Gère la soumission du formulaire:
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!accountService.isLogged()) {
      navigate("/signup");
      return;
    }

    const commentWithUserId = {
      ...commentData,
      users_id: userId
    };

    try {
      setLoadingAdd(true);
      await commentService.addComment(commentWithUserId);
      await fetchComments(); // Rafraîchit les commentaires après l'ajout.
      // Réinitialise les champs du formulaire:
      setCommentData({
        title: '',
        content: '',
        users_id: userId
      });
      setSuccessMessage('Commentaire ajouté avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erreur ajout commentaire:', err.response?.data || err.message);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message || 'Vous ne pouvez ajouter qu\'un commentaire toutes les 24 heures.');
      } else {
        alert('Erreur lors de l\'ajout du commentaire.');
      }
    } finally {
      setLoadingAdd(false);
    }
  };

  // Récupère la liste des commentaires:
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await commentService.getAllComments();
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      setError('Erreur lors de la récupération des commentaires.');
    } finally {
      setLoadingComments(false);
    }
  };

  // Ce hook s'active en même temps qu'un événement particulier choisi par le dev, et s'il n'y a pas d'événement particulier on met un tableau vide pour qu'il s'exécute qu'une seule fois.
  // useEffect permet de charger progressivement les données car il demande de charger les données de la bdd après que la page soit chargée.
  // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="commentBlock flex flex-row-reverse w-[95%] max-w-[1200px]">
      <div className="commentInputBlock flex flex-col m-3 justify-center text-center">
        <h1 className="colorTitle mb-3">Laissez un commentaire:</h1>

        {/* Utilisation de fieldset et legend pour le regroupement logique */}
        <form onSubmit={onSubmit}>
          <fieldset className=" flex flex-col border p-2 rounded-lg border-blue-600">
            <legend className="text-lg font-semibold mb-2">Formulaire de commentaire</legend>

            {/* Ajout d'id pour améliorer l'association label/input */}
            <label htmlFor="commentTitle">Nom et Prénom:</label>
            <input
              className="inputGeneral focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="commentTitle"
              name="title"
              value={commentData.title}
              onChange={onChange}
              required
            />

            <label htmlFor="contentComment">Écrivez votre commentaire:</label>
            <textarea
              className="inputGeneral focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="contentComment"
              name="content"
              value={commentData.content}
              onChange={onChange}
              required
            />

            <button
              className="allButton"
              type="submit"
              disabled={loadingAdd}
            >
              {loadingAdd ? "Ajout du commentaire en cours..." : "Ajouter un commentaire"}
            </button>
          </fieldset>
        </form>

        {successMessage && (
          <div role="status" className="text-green-600 mt-3" aria-live="polite">
            {successMessage}
          </div>
        )}

        {/* Message d'erreur accessible pour lecteur d'écran */}
        {error && <div role="alert" className="text-red-400 mt-3">{error}</div>}
      </div>

      <div className="commentListBlock">
        <h2 className="colorTitle mb-3 text-center">Liste des Commentaires:</h2>

        {loadingComments ? (
          <p className="text-center text-blue-500">Chargement des commentaires...</p>
        ) : (
          <div className="cards" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <h3 className="text-red-700">{comment.title}</h3>
                  <p className="mb-3">{comment.content}</p>
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
