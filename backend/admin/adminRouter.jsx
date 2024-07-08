// On déterminent quel composant React doit être rendu sur une URL choisie:
import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layoutAdmin";
import Dashboard from "./dashboard";
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
                <Route path="dashboard" element={<Dashboard/>}/>

                <Route path="users">
                    <Route path="indexuser" element={<User/>}/>
                    <Route path="useredit" element={<UserEdit/>}/>
                    <Route path="useradd" element={<UserAdd/>}/>
                    <Route path="userdel" element={<UserDel/>}/>
                </Route>

                <Route path="comments">
                    <Route path="indexcomments" element={<Comments/>}/>
                    <Route path="commentsedit" element={<CommentsEdit/>}/>
                    <Route path="commentsadd" element={<CommentsAdd/>}/>
                    <Route path="commentsdel" element={<CommentsDel/>}/>
                </Route>

                <Route path="appointments">
                    <Route path="indexappointment" element={<Appointments/>}/>
                    <Route path="appointmentsedit" element={<AppointmentsEdit/>}/>
                    <Route path="appointmentsadd" element={<AppointmentsAdd/>}/>
                    <Route path="appointmentsdel" element={<AppointmentsDel/>}/>
                </Route>

                <Route path="*" element={<Error />} />

            </Route>
        </Routes>
    );
};

export default AdminRouter;