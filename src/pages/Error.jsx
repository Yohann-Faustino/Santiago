import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col items-center m-auto text-center">
            <h1 className="text-5xl font-bold text-red-600 mb-4" role="heading">
                Erreur 404
            </h1>
            <p className="text-lg text-blue-400 mb-6">
                Oups ! La page que vous cherchez n'existe pas.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-400 text-white rounded-xl shadow-md hover:bg-blue-500 transition duration-300"
                aria-label="Retourner à la page d'accueil"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default Error;
