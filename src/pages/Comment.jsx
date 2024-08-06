import React, { useState, useEffect } from "react";
import { commentService } from "../services/comment.service";

const Comments = () => {
  // useState gère le stockage des données du nouveau commentaire:
  const [commentData, setCommentData] = useState({
    title: '',
    content: ''
  });

  // useState gère le stockage des données de la liste des commentaires:
  const [comments, setComments] = useState([]);

  // useState gère l'état des messages d'erreur de toute la page afin d'avoir un code simple et propre:
  const [error, setError] = useState(null);

  // Fonction met à jour setCommentData lorsque l'utilisateur saisit des informations dans le formulaire de commentaires:
  const onChange = (e) => {
    setCommentData({
      ...commentData,// Cela copie toutes les propriétés de commentData dans le nouvel objet.
      [e.target.name]: e.target.value // Evènment surveille où sont les modifications apportées par l'utilisateur et récupère le nom de élément et sa valeur pour prendre compte son changement.
    });
  };

  // Fonction qui s'applique à la soumission du form de commentaire:
  const onSubmit = (e) => {
    e.preventDefault();

    // On appelle la méthode addComment du service commentService en lui passant commentData qui contient les données du nouveau commentaire saisi dans le formulaire:
    commentService.addComment(commentData)
      .then(res => {
        console.log(res);
        fetchComments(); // Rafraîchit les commentaires après l'ajout.
      })
      .catch(err => console.log(err));
  };

  // Fonction chargée de récupérer la liste des commentaires:
  const fetchComments = async () => {
    try {
      // On appelle la méthode getAllComments du service commentService en lui passant setComments pour mettre à jour l'état local comments avec les données récupérées:
      const response = await commentService.getAllComments();
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      setError('Erreur lors de la récupération des commentaires.');
    }
  };

  // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour qu'il s'execute qu'une seule fois.
  // useEffect permet de charger progressivement les donées car il demande a charger les données de la bdd apres que la page soit chargée.
  // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
  useEffect(() => {
    fetchComments(); // Lors du premier rendu du composant fetchComments est appelé pour récupérer la liste des commentaires.
  }, []);

  return (
    <div className=" commentBlock flex flex-row-reverse m-auto">

      <div className=" commentInputBlock flex flex-col w-1/2 m-3 justify-center text-center">
        <h1 className="colorh2 mb-3">Laissez un commentaire:</h1>

        <form onSubmit={onSubmit} className=" flex flex-col">
          <label htmlFor="">Titre du commentaire:</label>
          <input
            className=" border"
            type="text"
            name="title"
            value={commentData.title}
            onChange={onChange}
            required
          />
          <label htmlFor="">Ecrivez votre commentaire:</label>
          <input
            className=" border"
            type="text"
            name="content"
            value={commentData.content}
            onChange={onChange}
            required
          />
          <button className="allButton mt-3">Envoyer</button>
        </form>
      </div>

      <div className=" commentListBlock w-1/2">
        <h2 className="colorh2 mb-3 text-center">Liste des Commentaires:</h2>
        {error && <div>{error}</div>}
        <div className="cards">
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <h3 className=" text-red-700">{comment.title}</h3>
                <p className=" mb-3">{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comments;
