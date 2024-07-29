import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {

    const baseUrl = "./src/assets/Photos/"
    const datasImages = [
        {
            id: 1,
            image: `${baseUrl}1.png`,
            title: "Chaudière",
            text: "lorem ipsum"
        },
        {
            id: 2,
            image: `${baseUrl}2.jpg`,
            title: "Dégorgement",
            text: "lorem ipsum"
        },
        {
            id: 3,
            image: `${baseUrl}3.jpg`,
            title: "Chauffage",
            text: "lorem ipsum"
        },
        {
            id: 4,
            image: `${baseUrl}4.jpg`,
            title: "Rénovation",
            text: "lorem ipsum"
        },
    ]

    

    return (
        <div className="carousel-container w-2/5 m-auto">
            <Carousel>
                {datasImages.map(slide => (
                    <div className='carousel-slide' key={slide.id}>
                        <img className='carousel-image h-40 object-contain' src={slide.image} alt="carousel d'images de l'équipement et du travail de l'entreprise" />
                        <p className=' bg-black opacity-40 mb-4 mt-1 p-1 rounded-full text-center text-white'>{slide.title}</p>
                        {/* On prevois un text si le client souhaite une descritption a ses images: */}
                        {/* <p>{slide.text}</p> */}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Slider;
