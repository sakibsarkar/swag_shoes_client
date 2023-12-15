import "./Dashbar.css";
import { useState } from "react";
import { FaBox } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Dashbar = () => {




    return (
        <>


            <div className="dashBarCon">
                <Link to={"/"} className="dashlogo">
                    <img src="https://i.ibb.co/jD0cWQ4/LOGO.png" alt="" />
                </Link>


                <h1>Dashboard</h1>

                <div className="dashBoardLinks">
                    <NavLink to={"/dashboard/statistics"}><GrLineChart />Statistics</NavLink>
                    <NavLink to={"/dashboard/allOrders"}><FaBox /> All Orders</NavLink>
                    <NavLink to={"/dashboard/pendingOrders"}><MdOutlinePendingActions />Pending Orders</NavLink>
                    <NavLink to={"/dashboard/cancelRequest"}><MdOutlineFreeCancellation />Cancel Request</NavLink>
                </div>
            </div>

        

        </>
    );
};

export default Dashbar;