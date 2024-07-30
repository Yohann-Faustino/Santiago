import React from "react";
import NavLayout from "./navLayout";
import HeaderLayout from "./headerLayout";
import FooterLayout from "./footerLayout";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <HeaderLayout />
            <div className=" flex md:flex-row sm:flex-col">
                <NavLayout />
                <Outlet />
            </div>
            <FooterLayout />
        </div>
    );
};

export default Layout;