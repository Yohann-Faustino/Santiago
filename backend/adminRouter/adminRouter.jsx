// On déterminent quel composant React doit être rendu sur une URL choisie:
import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../admin/layoutAdmin";
import Dashboard from "../admin/dashboard";
import User from "../components/users/user"
import UserAdd from "../components/users/userAdd";
import UserEdit from "../components/users/userEdit";
import UserDel from "../components/users/userDel";
import Comments from "../components/comments/comments";
import CommentsAdd from "../components/comments/commentsAdd";
import CommentsEdit from "../components/comments/commentsEdit";
import CommentsDel from "../components/comments/commentsDel"
import Appointments from "../components/appointments/appointments";
import AppointmentsAdd from "../components/appointments/appointmentsAdd";
import AppointmentsEdit from "../components/appointments/appointmentsEdit";
import AppointmentsDel from "../components/appointments/appointmentsDel";
import Error from "../../src/pages/Error";

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<LayoutAdmin/>}>
            {/* L'index permet de rediriger l'admin qui mettrais en url /admin/ alors qu'il y a pas de page a cet adresse et que la bonne adresse url est admin/dashboard. */}
                <Route index element={<Dashboard/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>

                <Route path="users">
                    <Route path="indexuser" element={<User/>}/>
                    <Route path="useredit/:uid" element={<UserEdit/>}/>
                    {/* uid est définis dans userEdit et est un paramètre de route pour récupérer une valeur dans l'URL. */}
                    <Route path="useradd" element={<UserAdd/>}/>
                    <Route path="userdel" element={<UserDel/>}/>
                </Route>

                <Route path="comments">
                    <Route path="indexcomments" element={<Comments/>}/>
                    <Route path="commentsedit/:cid" element={<CommentsEdit/>}/>
                    {/* cid est définis dans commentsedit et est un paramètre de route pour récupérer une valeur dans l'URL. */}
                    <Route path="commentsadd" element={<CommentsAdd/>}/>
                    <Route path="commentsdel" element={<CommentsDel/>}/>
                </Route>

                <Route path="appointments">
                    <Route path="indexappointment" element={<Appointments/>}/>
                    <Route path="appointmentsedit/:aid" element={<AppointmentsEdit/>}/>                    {/* cid est définis dans commentsedit et est un paramètre de route pour récupérer une valeur dans l'URL. */}
                    {/* aid est définis dans appointmentsedit et est un paramètre de route pour récupérer une valeur dans l'URL. */}
                    <Route path="appointmentsadd" element={<AppointmentsAdd/>}/>
                    <Route path="appointmentsdel" element={<AppointmentsDel/>}/>
                </Route>

                <Route path="*" element={<Error />} />

            </Route>
        </Routes>
    );
};

export default AdminRouter;