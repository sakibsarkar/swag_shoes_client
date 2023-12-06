import Navbar from "../Shared/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />

        </>
    );
};

export default MainLayout;