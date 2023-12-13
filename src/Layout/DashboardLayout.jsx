import "./DashLayout.css";
import Dashbar from "../AdminPage/Dashbar/Dashbar";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="dashboardContainer">
            <div className="dashboarBar">
                <Dashbar />
            </div>


            <div className="dashOutlet">

                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;