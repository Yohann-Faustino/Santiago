import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layoutAdmin";
import Dashboard from "./dashboard";
import User from "../components/users/user";
import UserAdd from "../components/users/userAdd";
import UserEdit from "../components/users/userEdit";
import Comments from "../components/comments/comments";
import CommentsAdd from "../components/comments/commentsAdd";
import CommentsEdit from "../components/comments/commentsEdit";
import Error from "../../src/pages/Error";

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<LayoutAdmin/>}>
                <Route path="dashboard" element={<Dashboard/>}/>

                <Route path="user">
                    <Route path="indexuser" element={<User/>}/>
                    <Route path="useredit" element={<UserEdit/>}/>
                    <Route path="useradd" element={<UserAdd/>}/>
                </Route>

                <Route path="comments">
                    <Route path="indexcomments" element={<Comments/>}/>
                    <Route path="commentsedit" element={<CommentsEdit/>}/>
                    <Route path="commentsadd" element={<CommentsAdd/>}/>
                </Route>

                <Route path="*" element={<Error />} />

            </Route>
        </Routes>
    );
};

export default AdminRouter;