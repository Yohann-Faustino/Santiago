// Parite pour la suite du projet:
// on utilise un hook: useParams est un paramètre de route utilisé pour récupérer une valeur dynamique de l'URL.

import { useParams } from "react-router-dom";

const AppointmentsEdit = () => {

    let { aid } = useParams()

    return (
        <div className="commentsEdit">
            <h1>AppointmentsEdit</h1>
        </div>
    );
};

export default AppointmentsEdit;