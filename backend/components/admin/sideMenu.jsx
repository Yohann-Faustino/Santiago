// On cré une interface pour naviguer entre les routes admin:
// Link to... équivalent de href permet de changer de page sans faire une requete http au server ce qui permet une navigation plus fluide et rapide.
// Le admin des links ne fait pas ref a un dossier mais à l'adminRouteur qui a pour début d'url: admin. 

import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <div className="sideMenu border border-red-700 rounded-lg p-2">
            <ul className=" flex flex-row justify-around">
                        <li className=" linkClick text-center"><Link to="/admin/users/indexuser">Liste des utilisateurs</Link></li>
                        <li className=" linkClick text-center"><Link to="/admin/comments/indexcomments">Liste des commentaires</Link></li>
                        <li className="linkClick text-center"><Link to="/">Retour à l'Accueil</Link></li>
                {/* Partie pout la suite du projet:
                <li>
                    <p className="appointmentSideMenuTitle bg-red-500 mb-3 mt-3 rounded-xl text-center">Appointment:</p>
                    <ul>
                        <li><Link to="/admin/appointments/indexappointment">Liste</Link></li>
                        <li><Link to="/admin/appointments/appointmentsadd">Ajouter</Link></li>
                        <li><Link to="/admin/appointments/appointmentsedit">Modifier</Link></li>
                        <li><Link to="/admin/appointments/appointmentsDel">Supprimer</Link></li>
                    </ul>
                </li> */}
            </ul>
        </div>
    );
};

export default SideMenu;