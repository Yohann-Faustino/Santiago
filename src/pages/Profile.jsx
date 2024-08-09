import React, { useState, useEffect, useRef } from 'react';
import { getProfile, updateProfile } from '../services/profile.service'; // Import des services pour récupérer et mettre à jour les données du profil

const ProfilePage = () => {
    // useState gère le stockage des données du profil de l'utilisateur récupérées par fetchProfileData plus bas:
    const [profileData, setProfileData] = useState(null);
    // useState gère l'état des messages d'erreur de toute la page afin d'avoir un code simple et propre:
    const [error, setError] = useState(null);

    // Ce hook sert de pense-bête pour que mon code se rappelle d'une fonction décrite plus bas:
    const flag = useRef(false);

    // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour qu'il s'execute qu'une seule fois.
    // useEffect permet de charger progressivement les données car il demande à charger les données de la bdd après que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
    useEffect(() => {
        // On utilise flag.current pour éviter de rappeler getProfile plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            const fetchProfileData = async () => {
                try {
                    const response = await getProfile();  // Utilisation de getProfile pour récupérer les données
                    setProfileData(response.data);
                    console.log('Infos du profil:', response.data); // Affiche les données du profil dans la console pour débogage
                } catch (error) {
                    console.error('Erreur lors de la récupération des infos du profil:', error); // Affiche l'erreur dans la console
                    setError('Erreur lors de la récupération des infos du profil.'); // Affiche un message d'erreur à l'utilisateur
                }
            };

            // Appel de la fonction pour récupérer les données du profil:
            fetchProfileData();
        }

        // Assure que la récupération des données ne sera pas tentée de nouveau si le composant est démonté:
        return () => flag.current = true;
    }, []);

    // useState pour gérer les données modifiables du profil avant soumission:
    const [editData, setEditData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalcode: ''
    });

    // Met à jour les données du formulaire lorsque profileData change:
    useEffect(() => {
        if (profileData) {
            setEditData({
                id:profileData.id,
                firstname: profileData.firstname,
                lastname: profileData.lastname,
                email: profileData.email,
                phone: profileData.phone,
                address: profileData.address,
                city: profileData.city,
                postalcode: profileData.postalcode
            });
        }
    }, [profileData]);

    // Gère les modifications des champs du formulaire:
    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value // Met à jour la valeur du champ correspondant dans editData
        });
    };

    // Gère la soumission du formulaire de mise à jour du profil:
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire

        try {
            const response = await updateProfile(editData);  // Utilisation de updateProfile pour mettre à jour les données
            setProfileData(response.data);
            console.log('Profil mis à jour:', response.data); // Affiche les données mises à jour dans la console
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error); // Affiche l'erreur dans la console
            setError('Erreur lors de la mise à jour du profil.'); // Affiche un message d'erreur à l'utilisateur
        }
    };

    // Si une erreur s'est produite, on retourne un message d'erreur
    if (error) {
        return <div>{error}</div>;
    }

    // Si les données du profil ne sont pas encore chargées, on retourne un message indiquant que les données sont en cours de chargement
    if (!profileData) {
        return <div>Chargement...</div>;
    }

    // Si les données du profil sont chargées sans erreur, on affiche les données dans une table
    return (
        <div className="profile">
            <h1>Mon Profil</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={editData.firstname}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={editData.lastname}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editData.phone}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="address"
                                    value={editData.address}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="city"
                                    value={editData.city}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="postalcode"
                                    value={editData.postalcode}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Mettre à jour le profil</button>
            </form>
        </div>
    );
};

export default ProfilePage;
