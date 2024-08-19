// On cré une interface pour naviguer entre les routes admin:
// Link to... équivalent de href permet de changer de page sans faire une requete http au server ce qui permet une navigation plus fluide et rapide.
// Le admin des links ne fait pas ref a un dossier mais à l'adminRouteur qui a pour début d'url: admin. 

import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <div className="sideMenu border border-gold rounded-lg p-1">
            <ul>
                <li>
                    <p className="userSideMenuTitle bg-red-500 mb-3 mt-3 rounded-xl text-center">Users:</p>
                    <ul>
                        <li><Link to="/admin/users/indexuser">Liste</Link></li>
                        <li><Link to="/admin/users/useradd">Ajouter</Link></li>
                        <li><Link to="/admin/users/useredit">Modifier</Link></li>
                        <li><Link to="/admin/users/userdel">Supprimer</Link></li>
                    </ul>
                </li>
                <li>
                    <p className="commentSideMenuTitle bg-red-500 mb-3 mt-3 rounded-xl text-center">Comments:</p>
                    <ul>
                        <li><Link to="/admin/comments/indexcomments">Liste</Link></li>
                        <li><Link to="/admin/comments/commentsadd">Ajouter</Link></li>
                        <li><Link to="/admin/comments/commentsedit">Modifier</Link></li>
                        <li><Link to="/admin/comments/commentsdel">Supprimer</Link></li>
                    </ul>
                </li>
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
                <li className=" mt-5"><Link to="/">Retour à l'<a href="/" className="linkClick">Accueil</a></Link></li>
            </ul>
        </div>
    );
};

export default SideMenu;