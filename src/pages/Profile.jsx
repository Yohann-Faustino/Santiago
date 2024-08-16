import React, { useState, useEffect, useRef } from 'react';
import { getProfile, updateProfile, updatePassword } from '../services/profile.service'; // Import des services pour récupérer et mettre à jour les données du profil.

const ProfilePage = () => {
    // useState gère le stockage des données du profil de l'utilisateur récupérées par fetchProfileData plus bas:
    const [profileData, setProfileData] = useState(null);
    // useState gère l'état des messages d'erreur de toute la page afin d'avoir un code simple et propre:
    const [error, setError] = useState(null);

    // Ce hook sert de pense-bête pour que mon code se rappelle d'une fonction décrite plus bas:
    const flag = useRef(false);

    // Ce hook s'active en même temps qu'un événement particulier choisi par le dev, et s'il n'y a pas d'événement particulier on met un tableau vide pour qu'il s'exécute qu'une seule fois.
    // useEffect permet de charger progressivement les données car il demande de charger les données de la bdd après que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
    useEffect(() => {
        // On utilise flag.current pour éviter de rappeler getProfile plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            const fetchProfileData = async () => {
                try {
                    const response = await getProfile();  // Utilisation de getProfile pour récupérer les données.
                    setProfileData(response.data);
                    console.log('Infos du profil:', response.data); // Affiche les données du profil dans la console pour débogage.
                } catch (error) {
                    console.error('Erreur lors de la récupération des infos du profil:', error);
                    setError('Erreur lors de la récupération des infos du profil.'); // Affiche un message d'erreur à l'utilisateur.
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

    // Met à jour les données du formulaire lorsque profileData est modifié par l'user:
    useEffect(() => {
        if (profileData) {
            setEditData({
                id: profileData.id,
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
            [e.target.name]: e.target.value // Evènement qui écoute les modifs de l'utilisateur cible de nom de ce qui est modifié et lui assigne sa nouvelle valeur.
        });
    };

    // useState pour gérer les champs de mot de passe:
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    // Gère les modifications des champs de mot de passe:
    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value // Evènement qui écoute les modifs de l'utilisateur cible de nom de ce qui est modifié et lui assigne sa nouvelle valeur.
        });
    };

    // Gère la soumission du formulaire de mise à jour du profil:
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire.

        // Vérifier si le nouveau mot de passe et la confirmation correspondent:
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }

        try {
            // Mettre à jour le profil:
            const response = await updateProfile(editData);
            setProfileData(response.data);

            // Met à jour le mot de passe si il a été modifié:
            if (passwordData.currentPassword && passwordData.newPassword) {
                await updatePassword({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                });
                console.log('Mot de passe mis à jour.');
            }

            console.log('Profil mis à jour:', response.data);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            setError('Erreur lors de la mise à jour du profil.');
        }
    };

    // Si une erreur s'est produite, on retourne un message d'erreur:
    if (error) {
        return <div>{error}</div>;
    }

    // Si les données du profil ne sont pas encore chargées, on retourne un message indiquant que les données sont en cours de chargement:
    if (!profileData) {
        return <div>Chargement...</div>;
    }

    // Si les données du profil sont chargées sans erreur alors on affiche les données:
    return (
        <div className="profile-container mx-auto w-1/2">
            <h1 className="colorTitle text-center">Mon Profil</h1>
            <div className="cards">
                <form
                    className="flex flex-col"
                    /* maxHeight: '400px', overflowY: 'auto' -> fixe une hauteur max de 400px et rend la div défilante verticalement(Y) lorsque le contenu dépasse la hauteur fixée. */
                    style={{ overflowY: 'auto', maxHeight: '800px' }}
                    onSubmit={handleSubmit}
                >
                    {/* Informations du profil */}
                    <div className=' flex flex-col'>
                        <h2 className=" colorh2">Informations personnelles</h2>
                        <div className="input-group">
                            <label htmlFor="firstname">Prénom</label>
                            <input
                                className='inputGeneral'
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={editData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastname">Nom</label>
                            <input
                                className='inputGeneral'
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={editData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className='inputGeneral'
                                type="email"
                                id="email"
                                name="email"
                                value={editData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Téléphone</label>
                            <input
                                className='inputGeneral'
                                type="text"
                                id="phone"
                                name="phone"
                                value={editData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Adresse</label>
                            <input
                                className='inputGeneral'
                                type="text"
                                id="address"
                                name="address"
                                value={editData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">Ville</label>
                            <input
                                className='inputGeneral'
                                type="text"
                                id="city"
                                name="city"
                                value={editData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="postalcode">Code Postal</label>
                            <input
                                className='inputGeneral'
                                type="text"
                                id="postalcode"
                                name="postalcode"
                                value={editData.postalcode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Changement de mot de passe */}
                    <div>
                        <h2 className=" colorh2">Changement password</h2>
                        <div className="input-group">
                            <label htmlFor="currentPassword">Password actuel</label>
                            <input
                                className='inputGeneral'
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="newPassword">Nouveau password</label>
                            <input
                                className='inputGeneral'
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmNewPassword">Confirmer password</label>
                            <input
                                className='inputGeneral'
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="allButton mt-6 mx-auto">
                        Mettre à jour le profil
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
