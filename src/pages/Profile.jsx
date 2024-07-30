import React, { useState, useEffect } from 'react';
import { userService } from "../services/user.service";
import AxiosCall from '../services/axiosCall';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await AxiosCall.get('/profile');
          setProfileData(response.data);
          console.log('Infos du profil:', response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des infos du profil:', error);
          setError('Erreur lors de la récupération des infos du profil.');
        }
      };
  
      fetchProfileData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profileData) {
        return <div>Chargement...</div>;
    }

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
