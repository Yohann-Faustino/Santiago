// on utilise un hook: useParams est un paramètre de route utilisé pour récupérer une valeur dynamique de l'URL.
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../../src/services/user.service";

const UserEdit = () => {

    const [user, setUser] = useState([])
    const flag = useRef(false)

    // Récupération de l'Id du commentaire:
    const { uid } = useParams()
    console.log(uid)

    // Handle de modifications dans le form:
    const onChange = (e) => {

    }

    // Soumission du form:
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(user)
    }

    useEffect(() => {
        // On utilise flag.current pour éviter de rappeler userService.getAllUsers() plus d'une fois lors du rendu du composant:
        if (flag.current === false) {
            userService.getUser(uid)
                .then(res => {
                    console.log(res.data)
                    setUser(res.data)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
    }, []) // erreur video 29

    return (
        <div className="userEdit">
            <h1>UserEdit</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="idUser">Modifier l'Id</label>
                    <input type="text" name="idUser" value={user.id} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="firstname">Modifier le Prénom</label>
                    <input type="text" name="firstname" value={user.firstname} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="lastname">Modifier le Nom</label>
                    <input type="text" name="lastname" value={user.lastname} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="email">Modifier l'Email</label>
                    <input type="text" name="email" value={user.email} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="phone">Modifier le Téléphone</label>
                    <input type="text" name="phone" value={user.phone} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="address">Modifier l'Adresse</label>
                    <input type="text" name="address" value={user.address} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="city">Modifier la Ville</label>
                    <input type="text" name="city" value={user.city} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="postalCode">Modifier le Code Postale</label>
                    <input type="text" name="postalCode" value={user.postalcode} onChange={onChange} />
                </div>
                <div>
                    <button>Enregistrer les modifications</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;