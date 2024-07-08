// On cré une interface pour naviguer entre les routes admin:
// Link to... équivalent de href permet de changer de page sans recharger de page ce qui permet une navigation plus fluide et rapide.
import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <div className="sideMenu">
            <h1>SideMenu</h1>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li>
                    <h3 className="userSideMenuTitle bg-red-600">Users:</h3>
                    <ul>
                        <li><Link to="/admin/users/indexuser">Liste</Link></li>
                        <li><Link to="/admin/users/useradd">Ajouter</Link></li>
                        <li><Link to="/admin/users/useredit">Modifier</Link></li>
                        <li><Link to="/admin/users/userdel">Supprimer</Link></li>
                    </ul>
                </li>
                <li>
                    <h3 className="commentSideMenuTitle bg-red-600">Comments:</h3>
                    <ul>
                        <li><Link to="/admin/comments/indexcomments">Liste</Link></li>
                        <li><Link to="/admin/comments/commentsadd">Ajouter</Link></li>
                        <li><Link to="/admin/comments/commentsedit">Modifier</Link></li>
                        <li><Link to="/admin/comments/commentsdel">Supprimer</Link></li>
                    </ul>
                </li>
                <li>
                    <h3 className="appointmentSideMenuTitle bg-red-600">Appointment:</h3>
                    <ul>
                        <li><Link to="/admin/appointments/indexappointment">Liste</Link></li>
                        <li><Link to="/admin/appointments/appointmentsadd">Ajouter</Link></li>
                        <li><Link to="/admin/appointments/appointmentsedit">Modifier</Link></li>
                        <li><Link to="/admin/appointments/appointmentsDel">Supprimer</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;