import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../../src/services/user.service";

const UserEdit = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });
    const flag = useRef(false);

    const { uid } = useParams();
    console.log(uid);

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userWithId = { ...user, id: uid };
        console.log(userWithId);
        try {
            const res = await userService.getUpdate(userWithId);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    

    useEffect(() => {
        if (flag.current === false) {
            userService.getUser(uid)
                .then(res => {
                    console.log(res.data);
                    setUser(res.data);
                })
                .catch(err => console.log(err));
        }
        return () => flag.current = true;
    }, []);

    return (
        <div className="userEdit p-4">
            <h1 className="mb-3">UserEdit</h1>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col mb-3">
                    <label htmlFor="firstname">Modifier le Prénom:</label>
                    <input className="modifiable" type="text" name="firstname" value={user.firstname || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="lastname">Modifier le Nom:</label>
                    <input className="modifiable" type="text" name="lastname" value={user.lastname || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="email">Modifier l'Email:</label>
                    <input className="modifiable" type="text" name="email" value={user.email || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="phone">Modifier le Téléphone:</label>
                    <input className="modifiable" type="text" name="phone" value={user.phone || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="address">Modifier l'Adresse:</label>
                    <input className="modifiable" type="text" name="address" value={user.address || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="city">Modifier la Ville:</label>
                    <input className="modifiable" type="text" name="city" value={user.city || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="postalcode">Modifier le Code Postal:</label>
                    <input className="modifiable" type="text" name="postalcode" value={user.postalcode || ''} onChange={onChange} />
                </div>
                <div className="flex flex-col mb-3">
                    <button className="mt-4 p-2 bg-blue-900 text-white rounded">Enregistrer</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
