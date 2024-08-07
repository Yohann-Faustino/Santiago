import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { commentService } from "../services/comment.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderCom = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await commentService.getAllComments();
      setComments(response.data);
      setError(null); // Réinitialise l'erreur s'il n'y a pas de problème
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      setError('Erreur lors de la récupération des commentaires.');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="carousel-container border border-blue-700 rounded-xl p-1">
      {error ? (
        <div>{error}</div>
      ) : (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={true} interval={3000}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div className="carousel-slide object-contain w-auto" key={comment.id}>
                <div className="carousel-content p-4 bg-white rounded-lg ">
                  <h3 className="text-xl font-bold">{comment.title}</h3>
                  <p>{comment.content}</p>
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
