import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../../src/services/user.service";
import SideMenu from "../admin/sideMenu";

const UserEdit = () => {
    // État local pour stocker les données de l'user
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });
    // Référence pour contrôler si le composant a été monté
    const flag = useRef(false);
    // Récupération de l'ID du commentaire depuis les paramètres d'URL

    // Gere le message de prise en compte de la modification sur l'user.
    const [message, setMessage] = useState('');

    const { uid } = useParams();
    console.log(uid);

    // Fonction de gestion du changement d'input
    const onChange = (e) => {
        const { name, value } = e.target;
        // Met à jour l'état de l'user avec la nouvelle valeur
        setUser({
            ...user,
            [name]: value
        });
    };

    // Fonction qui se déclenche au submit du formulaire
    const onSubmit = async (e) => {
        e.preventDefault(); // Pour éviter le rechargement de la page

        // Je récupère les valeurs dans user et j'ajoute l'id
        const userWithId = { ...user, id: uid };
        console.log(userWithId); // Vérifie ce qu'on envoie

        try {
            // J'appelle mon service pour envoyer les modifications en BDD
            const res = await userService.getUpdate(userWithId);
            console.log(res); // Je vérifie la réponse du backend

            // Message de validation
            setMessage('✅ Modifications du profil enregistrées.');
            // Effacement du message après 3 secondes
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.log(err); // J'affiche l’erreur si la requête échoue
            setMessage('❌ Une erreur est survenue.');
        }
    };

    // Effet secondaire pour récupérer les données de l'user à éditer
    useEffect(() => {
        if (flag.current === false) {
            // Récupère les données de l'user en utilisant l'ID
            userService.getUser(uid)
                .then(res => {
                    console.log(res.data);
                    // Met à jour l'état avec les données récupérées
                    setUser(res.data);
                })
                .catch(err => console.log(err));
        }
        // Change le flag pour éviter de récupérer les données plusieurs fois
        return () => flag.current = true;
    }, []);

    return (
        <div className="userEdit p-4">
            <h1 className="mb-3">Modifier l'utilisateur:</h1>
            <div className=" mb-5">
                <SideMenu />
            </div>
            <form onSubmit={onSubmit} className=" text-center">
                <div className="flex flex-col mb-3">
                    <label htmlFor="firstname">Modifier le Prénom:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="firstname"
                        value={user.firstname || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="lastname">Modifier le Nom:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="lastname"
                        value={user.lastname || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="email">Modifier l'Email:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="email"
                        value={user.email || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" // Vérifie le format de l'email
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="phone">Modifier le Téléphone:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="phone"
                        value={user.phone || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="address">Modifier l'Adresse:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="address"
                        value={user.address || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange}// Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="city">Modifier la Ville:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="city"
                        value={user.city || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="postalcode">Modifier le Code Postal:</label>
                    <input
                        className="modifiable text-center"
                        type="text"
                        name="postalcode"
                        value={user.postalcode || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div>
                    {/* Affiche un message de succès ou d'erreur */}
                    {message && (
                        <p className={`font-semibold mb-4 ${message.startsWith('❌') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
                <div>
                    <button className="mt-4 p-2 bg-blue-900 text-white rounded">Enregistrer</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
