import React, { useState, useEffect, useRef } from 'react';
import getProfile from '../services/profile.service';

const ProfilePage = () => {
    // useState gère le stockage des données du profil de l'utilisateur récupérées par fetchProfileData plus bas:
    const [profileData, setProfileData] = useState(null);
    // useState gère l'état des messages d'erreur de toute la page afin d'avoir un code simple et propre:
    const [error, setError] = useState(null);

    // Ce hook sert de pense-bête pour que mon code se rappelle d'une fonction décrite plus bas:
    const flag = useRef(false);

   // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour qu'il s'execute qu'une seule fois.
    // useEffect permet de charger progressivement les donées car il demande a charger les données de la bdd apres que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
    useEffect(() => {
        
        // On utilise flag.current pour éviter de rappeler getProfile plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            const fetchProfileData = async () => {
                try {
                    const response = await getProfile();
                    setProfileData(response.data);
                    console.log('Infos du profil:', response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des infos du profil:', error);
                    setError('Erreur lors de la récupération des infos du profil.');
                }
            };

            // Appel de la fonction pour récupérer les données du profil:
            fetchProfileData();
        }

        return () => flag.current = true;
    }, []);

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
            <table>
                <thead>
                    <tr>
                        <th>#</th>
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
                        <td>{profileData.id}</td>
                        <td>{profileData.firstname}</td>
                        <td>{profileData.lastname}</td>
                        <td>{profileData.email}</td>
                        <td>{profileData.phone}</td>
                        <td>{profileData.address}</td>
                        <td>{profileData.city}</td>
                        <td>{profileData.postalcode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProfilePage;
