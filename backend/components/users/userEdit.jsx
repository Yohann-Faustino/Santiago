import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../../src/services/user.service";
import SideMenu from "../admin/sideMenu";

const UserEdit = () => {

    // Ce hook gere les messages utilisateur
    const [message, setMessage] = useState('');

    // useState pour gérer l'état de chargement lors des appels API (chargement en cours...):
    const [loading, setLoading] = useState(false);

    // État local pour stocker les données de l'user
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        role: ''
    });
    // Référence pour contrôler si le composant a été monté
    const flag = useRef(false);

    // Récupération de l'ID du commentaire depuis les paramètres d'URL
    const { uid } = useParams();

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

        try {
            setLoading(true);
            // J'appelle mon service pour envoyer les modifications en BDD
            await userService.getUpdate(userWithId);
            setMessage('✅ Modifications du profil enregistrées.');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.log(err); // J'affiche l’erreur si la requête échoue
            setMessage('❌ Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    // Effet secondaire pour récupérer les données de l'user à éditer
    useEffect(() => {
        if (flag.current === false) {
            // Récupère les données de l'user en utilisant l'ID
            userService.getUser(uid)
                .then(res => setUser(res.data))
                .catch(err => {
                    console.error(err);
                    setMessage('❌ Impossible de récupérer les données.');
                });
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
                    <label htmlFor="firstnameEdit">Modifier le Prénom:</label>
                    <input
                        className="modifiable text-center"
                        id="firstnameEdit"
                        type="text"
                        name="firstname"
                        value={user.firstname || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="lastnameEdit">Modifier le Nom:</label>
                    <input
                        className="modifiable text-center"
                        id="lastnameEdit"
                        type="text"
                        name="lastname"
                        value={user.lastname || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="emailEdit">Modifier l'Email:</label>
                    <input
                        className="modifiable text-center"
                        id="emailEdit"
                        type="email"
                        name="email"
                        value={user.email || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="phoneEdit">Modifier le Téléphone:</label>
                    <input
                        className="modifiable text-center"
                        id="phoneEdit"
                        type="text"
                        name="phone"
                        value={user.phone || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="addressEdit">Modifier l'Adresse:</label>
                    <input
                        className="modifiable text-center"
                        id="addressEdit"
                        type="text"
                        name="address"
                        value={user.address || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange}// Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="cityEdit">Modifier la Ville:</label>
                    <input
                        className="modifiable text-center"
                        id="cityEdit"
                        type="text"
                        name="city"
                        value={user.city || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="postalcodeEdit">Modifier le Code Postal:</label>
                    <input
                        className="modifiable text-center"
                        id="postalcodeEdit"
                        type="text"
                        name="postalcode"
                        value={user.postalcode || ''} // Affiche le contenu actuel ou une chaîne vide
                        onChange={onChange} // Appelle onChange lors du changement
                    />
                </div>
                <div>
                    {/* Affiche un message de succès ou d'erreur */}
                    {message && (
                        <p
                        aria-live="polite" 
                        className={`font-semibold mb-4 ${message.startsWith('❌') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="roleEdit">Modifier le Rôle :</label>
                    <select
                        name="role"
                        id="roleEdit"
                        value={user.role || 'utilisateur'}
                        onChange={onChange}
                        className="modifiable text-center p-2 border border-gray-400 m-auto"
                    >
                        <option value="utilisateur">Utilisateur</option>
                        <option value="admin">Administrateur</option>
                    </select>
                </div>

                <div>
                    <button
                        className="mt-4 p-2 bg-blue-900 text-white rounded"
                        disabled={loading}
                    >
                        {loading ? "Enregistrement en cours..." : "Enregistrer"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
