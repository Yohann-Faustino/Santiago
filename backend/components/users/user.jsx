import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../src/services/user.service";
import { Link } from "react-router-dom";

const User = () => {
    // Permet de rediriger l'user vers la page souhaitée:
    let navigate = useNavigate();

    const userEdit = (userId) => {
        console.log('modif User');
        navigate("../useredit/" + userId);
    };

    // Récupères l'utilisateur que l'on souhaite modifier: 
    const [users, setUsers] = useState([]);

    // Ce hook sert de pense-bête pour que mon code se rappelle d'une fonction décrite plus bas.
    const flag = useRef(false);

    // Ce hook s'active en même temps qu'un événement particulier choisi par le dev et si il n'y a pas d'événement particulier on met un tableau vide pour qu'il s'exécute qu'une seule fois.
    // useEffect permet de charger progressivement les données car il demande à charger les données de la bdd après que la page soit chargée.
    // On ajoute une fonction qui fait une requête HTTP pour récupérer les données des commentaires depuis la bdd.
    useEffect(() => {

        // On utilise flag.current pour éviter de rappeler commentService.getAllUsers() plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            userService.getAllUsers()
                .then(res => {
                    console.log(res.data);
                    setUsers(res.data);
                })
                .catch(err => console.log(err));
        }
        return () => flag.current = true;
    }, []);

        const delUser = (userId) => {
            console.log(userId)
            userService.delUser(userId)
            .then(res => {
                console.log(res)
                setUsers((current) => current.filter(user => user.id !== userId))
            })        .catch(err => console.log(err))
        }

    return (
        <div className="user flex flex-col p-4">
            <h1 className="mb-4">User</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-red-500">
                        <th className="p-2 text-center border border-gray-300">🚮</th>
                        <th className="p-2 text-center border border-gray-300">#</th>
                        <th className="p-2 text-center border border-gray-300">Prénom</th>
                        <th className="p-2 text-center border border-gray-300">Nom</th>
                        <th className="p-2 text-center border border-gray-300">Email</th>
                        <th className="p-2 text-center border border-gray-300">Téléphone</th>
                        <th className="p-2 text-center border border-gray-300">Adresse</th>
                        <th className="p-2 text-center border border-gray-300">Ville</th>
                        <th className="p-2 text-center border border-gray-300">Code Postale</th>
                        <th className="p-2 text-center border border-gray-300">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className=" text-center border border-gray-300" onClick={() => delUser(user.id)}><span>🗑️</span></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.id}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.firstname}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.lastname}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.email}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.phone}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.address}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.city}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.postalcode}</Link></td>
                                <td className="p-2 text-center border border-gray-300"><Link to={`/admin/users/useredit/${user.id}`}>{user.role}</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default User;
