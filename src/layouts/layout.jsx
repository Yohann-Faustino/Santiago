import React from "react";
import NavLayout from "./navLayout";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <NavLayout />
            <Outlet />
        </div>
    );
};

export default Layout;