import React, { useState, useEffect, useRef } from 'react';
import { getProfile, updateProfile, updatePassword } from '../services/profile.service'; // Import des services pour récupérer et mettre à jour les données du profil.
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

    // Gere le message de prise en compte de la modification du profile.
    const [message, setMessage] = useState('');

    // useState gère le stockage des données du profil de l'utilisateur récupérées par fetchProfileData plus bas:
    const [profileData, setProfileData] = useState(null);

    // useState gère l'état des messages d'erreur de toute la page afin d'avoir un code simple et propre:
    const [error, setError] = useState(null);

    // useState pour gérer l'état de chargement lors des appels API (chargement en cours...):
    const [loading, setLoading] = useState(false);

    // Ce hook sert de pense-bête pour que mon code se rappelle d'une fonction décrite plus bas:
    const flag = useRef(false);

    // État unique pour afficher/cacher tous les mots de passe en même temps
    const [showPasswords, setShowPasswords] = useState(false);

    // Permet de redirigé l'user après la MAJ de son profle:
    const navigate = useNavigate();

    // Ce hook s'active en même temps qu'un événement particulier choisi par le dev, et s'il n'y a pas d'événement particulier on met un tableau vide pour qu'il s'exécute qu'une seule fois.
    // useEffect permet de charger progressivement les données car il demande de charger les données de la bdd après que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
    useEffect(() => {
        // On utilise flag.current pour éviter de rappeler getProfile plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            const fetchProfileData = async () => {
                setLoading(true);
                try {
                    const response = await getProfile();  // Utilisation de getProfile pour récupérer les données.
                    setProfileData(response.data);
                    if (process.env.NODE_ENV === 'development') {
                        console.log('Infos du profil:', response.data);
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des infos du profil:', error);
                    setError('Erreur lors de la récupération des infos du profil.'); // Affiche un message d'erreur à l'utilisateur.
                } finally {
                    setLoading(false);
                }
            };

            // Appel de la fonction pour récupérer les données du profil:
            fetchProfileData();
        }
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
            ...editData, // Conserve toutes les données existantes dans editData (destructuration).
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
            ...passwordData, // Conserve toutes les données existantes dans passwordData (destructuration).
            [e.target.name]: e.target.value // Evènement qui écoute les modifs de l'utilisateur cible de nom de ce qui est modifié et lui assigne sa nouvelle valeur.
        });
    };

    // Gère la soumission du formulaire de mise à jour du profil:
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire.
        setError(null);
        setMessage('');
        setLoading(true);

        // Vérifier si le nouveau mot de passe et la confirmation correspondent:
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas.');
            setLoading(false);
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
                // Réinitialise les champs password après succès
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
            }

            if (process.env.NODE_ENV === 'development') {
                console.log('Profil mis à jour:', response.data);
            }
            setMessage('✅ Modifications du profil enregistrées.');
            // Redirection vers profile après 3 secondes
            setTimeout(() => {
                setMessage('');
                navigate('/profile');
            }, 3000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            setMessage('❌ Une erreur est survenue.');
            setError('Erreur lors de la mise à jour du profil.');
        } finally {
            setLoading(false);
        }
    };

    // Si les données du profil sont chargées sans erreur alors on affiche les données:
    return (
        <div className={`profile-container mx-auto w-1/4 relative ${loading ? 'opacity-50 pointer-events-none' : ''}`}>

            {/* Overlay de chargement (affiché par-dessus) */}
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
                    <p className="text-xl font-semibold">Chargement...</p>
                </div>
            )}            <h1 className="colorTitle text-center">Mon Profil</h1>
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
                            <label htmlFor="firstnameProfile">Prénom</label>
                            <input
                                className='inputGeneral text-black'
                                type="text"
                                id="firstnameProfile"
                                name="firstname"
                                value={editData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastnameProfile">Nom</label>
                            <input
                                className='inputGeneral text-black'
                                type="text"
                                id="lastnameProfile"
                                name="lastname"
                                value={editData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="emailProfile">Email</label>
                            <input
                                className='inputGeneral text-black'
                                type="email"
                                id="emailProfile"
                                name="email"
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                value={editData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phoneProfile">Téléphone</label>
                            <input
                                className='inputGeneral text-black'
                                type="text"
                                id="phoneProfile"
                                name="phone"
                                value={editData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="addressProfile">Adresse</label>
                            <input
                                className='inputGeneral text-black'
                                type="text"
                                id="addressProfile"
                                name="address"
                                value={editData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="cityProfile">Ville</label>
                            <input
                                className='inputGeneral text-black'
                                type="text"
                                id="cityProfile"
                                name="city"
                                value={editData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="postalcodeProfile">Code Postal</label>
                            <input
                                className='inputGeneral text-black'
                                type="text"
                                id="postalcodeProfile"
                                name="postalcode"
                                value={editData.postalcode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Changement de mot de passe */}
                    <div>
                        <div className=' flex'>
                            <h2 className=" colorh2 w-1/2">Changement password</h2>
                            <button
                                type="button"
                                className='w-1/2 items-center '
                                onClick={() => setShowPasswords(!showPasswords)}
                                aria-label={showPasswords ? 'Cacher les mots de passe' : 'Afficher les mots de passe'}
                            >
                                {showPasswords ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <div className="input-group">
                            <label htmlFor="currentPasswordProfile">Password actuel</label>
                            <input
                                className='inputGeneral text-black'
                                type={showPasswords ? 'text' : 'password'}
                                id="currentPasswordProfile"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="newPasswordProfile">Nouveau password</label>
                            <input
                                className='inputGeneral text-black'
                                type={showPasswords ? 'text' : 'password'}
                                id="newPasswordProfile"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmNewPasswordProfile">Confirmer password</label>
                            <input
                                className='inputGeneral text-black'
                                type={showPasswords ? 'text' : 'password'}
                                id="confirmNewPasswordProfile"
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div>
                        {/* Affiche un message de succès ou d'erreur */}
                        {message && (
                            <p className="text-green-600 font-semibold mb-4">{message}</p>
                        )}
                        {error && (
                            <p className="text-red-600 font-semibold mb-4">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="allButton mt-6 mx-auto"
                        disabled={loading}
                    >
                        {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
