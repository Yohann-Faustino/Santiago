// On déterminent quel composant React doit être rendu sur une URL choisie:

import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../admin/layoutAdmin";
import Dashboard from "../admin/dashboard";
import User from "../components/users/user";
import UserEdit from "../components/users/userEdit";
import Comments from "../components/comments/comments";
import CommentsEdit from "../components/comments/commentsEdit";
import Appointments from "../components/appointments/appointments";
import AppointmentsEdit from "../components/appointments/appointmentsEdit";
import Error from "../../src/pages/Error";

// Fonction qui retourne la configuration des routes pour l’interface admin
const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        {/* Quand l’admin va sur /admin, on lui affiche le Dashboard par défaut */}
        <Route index element={<Dashboard />} />

        <Route path="users">
          <Route path="indexuser" element={<User />} />
          <Route path="useredit/:uid" element={<UserEdit />} />
        </Route>

        <Route path="comments">
          <Route path="indexcomments" element={<Comments />} />
          <Route path="commentsedit/:cid" element={<CommentsEdit />} />
        </Route>

        <Route path="appointments">
          <Route path="indexappointment" element={<Appointments />} />
          <Route path="appointmentsedit/:aid" element={<AppointmentsEdit />} />
        </Route>

        {/* Route que l'on positionne en derniere afin de dire que toutes les autres pages a part celles au-dessus seront des pages 404 */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
