import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/comment.service";
import { accountService } from "../services/account.service";

const Comments = () => {
  // Récupérer l'ID utilisateur depuis accountService:
  const userId = accountService.getCurrentUserId();
  console.log("userId:", userId); // On vérifie si l'ID utilisateur est correctement récupéré.

  const [commentData, setCommentData] = useState({
    title: '',
    content: '',
    users_id: userId // Dans la colonne users_id de la bdd on met la fonction qui récupère l'id de l'user.
  });

  // État pour gérer les commentaires et les erreurs:
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Met à jour commentData lors des modifications du formulaire:
  const onChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value
    });
  };

  // Gère la soumission du formulaire:
  const onSubmit = (e) => {
    e.preventDefault();

    if (!accountService.isLogged()) {
      navigate("/signup");
      return;
    }

    const commentWithUserId = {
      ...commentData,
      users_id: userId
    };
    console.log('Commentaire à envoyer:', commentWithUserId);

    commentService.addComment(commentWithUserId)
      .then(res => {
        console.log(res);
        fetchComments(); // Rafraîchit les commentaires après l'ajout.

        // Réinitialise les champs du formulaire:
        setCommentData({
          title: '',
          content: '',
          users_id: userId
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message || 'Vous ne pouvez ajouter qu\'un commentaire toutes les 24 heures.');
        } else {
          console.log('Erreur lors de l\'ajout du commentaire.');
        }
      });
  };

  // Récupère la liste des commentaires:
  const fetchComments = async () => {
    try {
      const response = await commentService.getAllComments();
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      setError('Erreur lors de la récupération des commentaires.');
    }
  };

  // Ce hook s'active en même temps qu'un événement particulier choisi par le dev, et s'il n'y a pas d'événement particulier on met un tableau vide pour qu'il s'exécute qu'une seule fois.
  // useEffect permet de charger progressivement les données car il demande de charger les données de la bdd après que la page soit chargée.
  // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="commentBlock flex flex-row-reverse m-auto">
      <div className="commentInputBlock flex flex-col w-1/2 m-3 justify-center text-center">
        <h1 className="colorTitle mb-3">Laissez un commentaire:</h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <label htmlFor="title">Titre du commentaire:</label>
          <input
            className="inputGeneral"
            type="text"
            name="title"
            value={commentData.title}
            onChange={onChange}
            required
            aria-label="Titre du commentaire"
          />
          <label htmlFor="content">Écrivez votre commentaire:</label>
          <textarea
            className="inputGeneral"
            name="content"
            value={commentData.content}
            onChange={onChange}
            required
            aria-label="Écrivez votre commentaire"
          />
          <button className="allButton mt-3" type="submit">Envoyer</button>
        </form>
      </div>

      <div className="commentListBlock w-1/2">
        <h2 className="colorTitle mb-3 text-center">Liste des Commentaires:</h2>
        {error && <div>{error}</div>}
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
      </div>
    </div>
  );
};

export default Comments;
