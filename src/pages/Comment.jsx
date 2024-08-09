import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/comment.service";
import { accountService } from "../services/account.service";

const Comments = () => {

  // Récupérer l'ID utilisateur depuis accountService:
  const userId = accountService.getCurrentUserId();
  console.log("userId:", userId);  // On vérifie si l'ID utilisateur est correctement récupéré.

  const [commentData, setCommentData] = useState({
    title: '',
    content: '',
    users_id: userId // Dans la colonne users_id de la bdd on met la fonction qui récupère l'id de l'user.
  });

  // useState gère la récupération des commentaires dynamiquement:
  const [comments, setComments] = useState([]);

  // useState gère l'état des messages d'erreur de toute la page afin d'avoir un code simple et propre:
  const [error, setError] = useState(null);

  // Ce hook permet de rediriger le navigateur vers la page souhaitée par le dev:
  const navigate = useNavigate();

  // Met à jour commentData lors des modifications du formulaire
  const onChange = (e) => {
    setCommentData({
      ...commentData, // Récupère toutes les données dans commentData (destructuration).
      [e.target.name]: e.target.value // Evènement qui écoute les modifs de l'utilisateur cible de nom de ce qui est modifié et lui assigne sa nouvelle valeur.
    });
  };

  // Gère la soumission du formulaire:
  const onSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire qui est de soumettre celui ci.

    // Vérifie si l'utilisateur est connecté avant de soumettre le commentaire sinon direction signup:
    if (!accountService.isLogged()) {
      navigate("/signup");
      return;
    }

    // Ajoute users_id aux données du commentaire:
    const commentWithUserId = {
      ...commentData, // Récupère toutes les données dans commentData (destructuration).
      users_id: userId // Dans la colonne users_id de la bdd on met la fonction qui récupère l'id de l'user.
    };
    console.log('Commentaire à envoyer:', commentWithUserId);

    // Appelle le commentService pour ajouter le commentaire:
    commentService.addComment(commentWithUserId)
      .then(res => {
        console.log(res);
        fetchComments(); // Rafraîchit les commentaires après l'ajout pour voir dessuite son commentaire dans la liste.

        // Réinitialise les champs du formulaire:
        setCommentData({
          title: '',
          content: '',
          users_id: userId
        });
      })
      .catch(err => {
        // Gère le cas spécifique où l'utilisateur essaie de poster deux commentaires en moins de 24h
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message || 'Vous ne pouvez ajouter qu\'un commentaire toutes les 24 heures.');
        } else {
          console.log('Erreur lors de l\'ajout du commentaire.');
        }
      });
  };

  // Récupère la liste des commentaires grâce au commentService:
  const fetchComments = async () => {
    try {
      const response = await commentService.getAllComments();
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      setError('Erreur lors de la récupération des commentaires.');
    }
  };
  // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour qu'il s'execute qu'une seule fois.
  // useEffect permet de charger progressivement les donées car il demande a charger les données de la bdd apres que la page soit chargée.
  // Charge les commentaires lors du premier rendu du composant.
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="commentBlock flex flex-row-reverse m-auto">
      <div className="commentInputBlock flex flex-col w-1/2 m-3 justify-center text-center">
        <h1 className="colorh2 mb-3">Laissez un commentaire:</h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <label htmlFor="title">Titre du commentaire:</label>
          <input
            className="border"
            type="text"
            name="title"
            value={commentData.title}
            onChange={onChange}
            required
          />
          <label htmlFor="content">Écrivez votre commentaire:</label>
          <input
            className="border"
            type="text"
            name="content"
            value={commentData.content}
            onChange={onChange}
            required
          />
          <button className="allButton mt-3">Envoyer</button>
        </form>
      </div>
      <div className="commentListBlock w-1/2">
        <h2 className="colorh2 mb-3 text-center">Liste des Commentaires:</h2>
        {error && <div>{error}</div>}
        <div className="cards">
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
