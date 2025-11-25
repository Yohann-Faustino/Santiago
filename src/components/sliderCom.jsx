import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { commentService } from "../services/comment.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderCom = () => {
  // État pour stocker les commentaires
  const [comments, setComments] = useState([]);
  // État pour indiquer si les données sont en cours de chargement
  const [loading, setLoading] = useState(true);
  // État pour stocker les messages d'erreur
  const [error, setError] = useState(null);

  // useEffect pour récupérer les commentaires au montage du composant
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Appel au service pour récupérer tous les commentaires
        const response = await commentService.getAllComments();
        console.log("Comments fetched:", response.data);
        // On s'assure que les données récupérées sont bien un tableau
        setComments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        setError("Impossible de récupérer les commentaires.");
        setComments([]);
      } finally {
        // Fin du chargement
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="carousel-container border border-blue-700 rounded-xl p-1 w-1/2 m-auto">
      {loading ? (
        // Affichage pendant le chargement
        <div className="carousel-slide">
          <div className="carousel-content p-4 bg-white max-w-xl mx-auto">
            <p>Chargement des commentaires...</p>
          </div>
        </div>
      ) : error ? (
        // Affichage en cas d'erreur
        <div>{error}</div>
      ) : (
        // Carousel avec les commentaires
        <Carousel
          key={comments.length}
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          interval={3000}
        >
          {Array.isArray(comments) && comments.length > 0 ? (
            // Mapping des commentaires
            comments.map((comment) => (
              <div
                className="carousel-slide object-contain w-auto"
                key={comment.id}
              >
                <div className="carousel-content p-4 bg-white rounded-lg">
                  <h3 className="text-xl font-bold text-red-700">
                    {comment.title}
                  </h3>
                  <p className="text-black">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            // Affichage si aucun commentaire disponible
            <div className="carousel-slide">
              <div className="carousel-content p-4 bg-white max-w-xl mx-auto">
                <p>Aucun commentaire disponible.</p>
              </div>
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default SliderCom;
