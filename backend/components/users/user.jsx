// Permet de naviguer vers une autre page (useredit) tout en passant un paramètre d'ID utilisateur:
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userService } from "../../../src/services/user.service";

const User = () => {

    let navigate = useNavigate()

    // Ce hook
    const [users, setUsers] = useState([])

    // Ce hook s'active en même temps qu'un événement particulier choisis par le dev et si il y a pas d'événement particulier on met un tableau vide pour q'il s'execute qu'une seule fois:
    useEffect(() => {
        userService.getAllUsers()
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
    })
        .catch(err => console.log(err))
    }, [])

    // const userSelectId = (userId) => {
    //     console.log('click')
    //     navigate("../useredit/"+userId)
    // }

    return (
        <div className="user">
            <h1>User</h1>
            {/* <button onClick={() => userSelectId(2)}>User 2</button> */}
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>Hash</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default User;