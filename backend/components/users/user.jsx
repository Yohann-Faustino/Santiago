// useState crée une 'boîte' vide pour stocker des données, useEffect demande que userService.getAllUsers() récupère EN DIFFERÉ les données de la base de données et map permet de parcourir ces données pour les afficher selon les props.
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userService } from "../../../src/services/user.service";
import { Link } from "react-router-dom";

const User = () => {

    let navigate = useNavigate()

    const demon = (userId) => {
        console.log('boom User')
        navigate("../useredit/"+userId)
    }

    // Ce hook prépare une place pour stocker les données de la bdd une fois qu'elles seront récupérées.
    const [users, setUsers] = useState([])

    // Ce hook sert de pense bête pour que mon code se rappel d'une fonction décrite plus bas.
    const flag = useRef(false)

    // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour qu'il s'execute qu'une seule fois.
    // useEffect permet de charger progressivement les donées car il demande a charger les données de la bdd apres que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des utilisateurs depuis la bdd.
    useEffect(() => {

        // On utilise flag.current pour éviter de rappeler userService.getAllUsers() plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            userService.getAllUsers()
                .then(res => {
                    console.log(res.data)
                    setUsers(res.data)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
    }, [])

    return (
        <div className="user">
            <h1>User</h1>
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
                        <th>Code Postale</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // On utilise map pour parcourir le tableau des données des users et on utilise les props pour l'organiser.
                        users.map(user => (
                            // Key explique a réact qu'il sagit de la donnée importante et unique qui identifie les users:
                            <tr key={user.id}> {}
                                <td><Link to={`/admin/users/useredit/${user.id}`}>{user.id}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.firstname}`}>{user.firstname}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.lastname}`}>{user.lastname}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.email}`}>{user.email}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.phone}`}>{user.phone}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.address}`}>{user.address}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.city}`}>{user.city}</Link></td>
                                <td><Link to={`/admin/users/useredit/${user.postalcode}`}>{user.postalcode}</Link></td>
                                {/* <td>{user.firstname}</td> */}
                                {/* <td>{user.lastname}</td> */}
                                {/* <td>{user.email}</td> */}
                                {/* <td>{user.phone}</td> */}
                                {/* <td>{user.address}</td> */}
                                {/* <td>{user.city}</td> */}
                                {/* <td>{user.postalcode}</td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => demon(666)}>Comments 666</button>
        </div>
        
    );
};

export default User;