import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <div className="sideMenu">
            <h1>SideMenu</h1>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li>Vide</li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li>
                    <h3>Users:</h3>
                    <ul>
                        <li><Link to="/admin/users/indexuser">Liste</Link></li>
                        <li><Link to="/admin/users/useradd">Ajouter</Link></li>
                        <li><Link to="/admin/users/useredit">Supprimer</Link></li>
                    </ul>
                </li>
                <li>
                    <h3>Comments:</h3>
                    <ul>
                        <li><Link to="/admin/comments/indexcomments">Liste</Link></li>
                        <li><Link to="/admin/comments/commentsadd">Ajouter</Link></li>
                        <li><Link to="/admin/comments/commentsedit">Supprimer</Link></li>
                        <li></li>
                    </ul>
                </li>
                <li>
                    <h3>Appointment:</h3>
                    <ul>
                        <li><Link to="/appointment/indexappointment">Liste</Link></li>
                        <li><Link to="/appointment/appointmentadd">Ajouter</Link></li>
                        <li><Link to="/appointment/appointmentedit">Supprimer</Link></li>
                        <li></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;