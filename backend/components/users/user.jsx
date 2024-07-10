// Permet de naviguer vers une autre page (useredit) tout en passant un paramètre d'ID utilisateur:
import React from "react";
import { useNavigate } from "react-router-dom";

const User = () => {

    let navigate = useNavigate()

    const userSelectId = (userId) => {
        console.log('click')
        navigate("../useredit/"+userId)

    }
    return (
        <div className="user">
            <h1>User</h1>
            <button onClick={() => userSelectId(2)}>User 2</button>
        </div>
    );
};

export default User;