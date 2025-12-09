import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  // Définis le chemin pour accéder aux images stockées dans le dossier public:
  const baseUrl = "/Photos/";

  // Crée un tableau d'objets représentant les images à afficher dans le carousel:
  const datasImages = [
    {
      id: 1,
      image: `${baseUrl}1.png`,
      title: "Chaudière",
      text: "lorem ipsum",
    },
    {
      id: 2,
      image: `${baseUrl}2.jpg`,
      title: "Dégorgement",
      text: "lorem ipsum",
    },
    {
      id: 3,
      image: `${baseUrl}3.jpg`,
      title: "Chauffage",
      text: "lorem ipsum",
    },
    {
      id: 4,
      image: `${baseUrl}4.jpg`,
      title: "Rénovation",
      text: "lorem ipsum",
    },
    // On récupère les images ici après les avoir déposés dans public/assets/Photos/
  ];

  return (
    <div
      className="carousel-container border border-blue-700 rounded-xl p-1 w-1/3 m-auto"
      role="region"
      aria-label="Commentaires des clients"
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        {datasImages.map((slide) => (
          <div className="carousel-slide" key={slide.id}>
            <img
              className="carousel-image relative h-40 object-contain"
              src={slide.image}
              alt={`carousel d'images : ${slide.title}`}
              title={slide.title} // Affiche un petit texte au survol de l'image
            />
            <p className="bg-black absolute bottom-0 left-1/2 -translate-x-1/2 mb-1 pl-1 pr-1 rounded-full text-center text-white">
              {slide.title}
            </p>
            {/* On prévoit un texte si le client souhaite une description à ses images: */}
            {/* <p>{slide.text}</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
