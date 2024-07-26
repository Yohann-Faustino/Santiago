import React, { useState, useEffect } from 'react';
import { userService } from "../services/user.service";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        userService.getUser()
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
                setError('Erreur lors du chargement des informations utilisateur.');
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
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
                        <td>{user.id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.city}</td>
                        <td>{user.postalcode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Profile;
