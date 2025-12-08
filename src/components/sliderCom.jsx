import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { commentService } from "../services/comment.service";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderCom = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // 🔥 Récupère directement la liste (pas "response.data")
        const commentList = await commentService.getAllComments();
        console.log("Comments fetched:", commentList);

        setComments(Array.isArray(commentList) ? commentList : []);
      } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        setError("Impossible de récupérer les commentaires.");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="carousel-container border border-blue-700 rounded-xl p-1 w-1/2 m-auto">
      {loading ? (
        <div className="carousel-slide">
          <div className="carousel-content p-4 bg-white max-w-xl mx-auto">
            <p>Chargement des commentaires...</p>
          </div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Carousel
          key={comments.length}
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          interval={3000}
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="carousel-slide" key={comment.id}>
                <div className="carousel-content p-4 bg-white rounded-lg">
                  <h3 className="text-xl font-bold text-red-700">
                    {comment.title}
                  </h3>
                  <p className="text-black">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
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
