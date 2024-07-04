import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/adminHeader";
import SideMenu from "../components/admin/sideMenu";

const LayoutAdmin = () => {
    return (
        <div className="layoutAdmin">
            <AdminHeader />
            <div id="admin">
                <SideMenu />
                <div id="adminBody"><Outlet /></div>
            </div>
        </div>
    );
};

export default LayoutAdmin;