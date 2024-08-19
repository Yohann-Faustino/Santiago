// Parite pour la suite du projet:
// Permet de naviguer vers une autre page (useredit) tout en passant un paramètre d'ID utilisateur:
import React from "react";
import { useNavigate } from "react-router-dom";

const Appointments = () => {

    let navigate = useNavigate()

    const appointmentSelectId = (appointmentId) => {
        console.log('click')
        navigate("../appointmentsedit/" + appointmentId)

    }
        return (
            <div className="comments">
                <h1>Appointments</h1>
                <button onClick={() => appointmentSelectId(2)}>Rdv 2</button>
            </div>
        );
    };

    export default Appointments;