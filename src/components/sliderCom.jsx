import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { commentService } from "../services/comment.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";

console.log("API base URL:", import.meta.env.VITE_API_BASE_URL);

const SliderCom = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await commentService.getAllComments();
      setComments(response.data);
      setError(null); // Réinitialise l'erreur s'il n'y a pas de problème.
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
    <div className="carousel-container border border-blue-700 rounded-xl p-1 w-1/2 m-auto">
      {error ? (
        <div>{error}</div>
      ) : (
        // key={comments.length} relance le carousel apres que les coms soient chargés
        <Carousel key={comments.length} autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={true} interval={3000}>
          {comments.length > 0 ? ( // Si il y a plus de 0 com on les affiches sinon on affiche le code en-dessous:  ") : (" 
            comments.map(comment => (
              <div className="carousel-slide object-contain w-auto" key={comment.id}>
                <div className="carousel-content p-4 bg-white rounded-lg ">
                  <h3 className="text-xl font-bold text-red-700">{comment.title}</h3>
                  <p className=" text-black">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-slide">
              <div className="carousel-content p-4 bg-white max-w-xl mx-auto">
                <p>Chargement des commentaires....</p>
              </div>
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default SliderCom;
