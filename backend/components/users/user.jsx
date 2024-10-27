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

    const flag = useRef(false);

    // On utilise flag.current pour éviter de rappeler commentService.getAllUsers() plus d'une fois lors du rendu du composant:
    useEffect(() => {
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

    return (
        <div className="user flex flex-col p-4">
            <h1 className="mb-4">User</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-red-500">
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
