// on utilise un hook: useParams est un paramètre de route utilisé pour récupérer une valeur dynamique de l'URL.
import { useParams } from "react-router-dom";

const UserEdit = () => {

    const {uid} = useParams()
    console.log(uid)

    return (
        <div className="userEdit">
            <h1>UserEdit</h1>
        </div>
    );
};

export default UserEdit;