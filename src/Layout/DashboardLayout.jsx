import "./DashLayout.css";
import Dashbar from "../AdminPage/Dashbar/Dashbar";
import { useState } from "react";
import { FaBox } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrLineChart } from "react-icons/gr";
import { MdOutlineFreeCancellation, MdOutlinePendingActions } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {

    const [showDrawer, setShowDrawer] = useState(false)

    return (
        <div className="dashboardContainer">

            <div className="dashboarNavbar">
                {
                    showDrawer ?
                        <RxCross2 onClick={() => setShowDrawer(!showDrawer)} />
                        :
                        <GiHamburgerMenu onClick={() => setShowDrawer(!showDrawer)} />
                }
            </div>

            <div className="dashboarBar">
                <Dashbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />


            </div>


            {
                showDrawer ?

                    <div className="dashBarCon dashBoardDrawer" onClick={() => setShowDrawer(false)}>
                        <Link to={"/"} className="dashlogo">
                            <img src="https://i.ibb.co/jD0cWQ4/LOGO.png" alt="" />
                        </Link>


                        <h1>Dashboard</h1>

                        <div className="dashBoardLinks">
                            <NavLink to={"/dashboard/statistics"}><GrLineChart />Statistics</NavLink>
                            <NavLink to={"/dashboard/allOrders"}><FaBox /> All Orders</NavLink>
                            <NavLink to={"/dashboard/products"}><MdOutlinePendingActions />Products</NavLink>

                            <NavLink to={"/dashboard/cancelRequest"}><MdOutlineFreeCancellation />Cancel Request</NavLink>
                        </div>
                    </div>

                    :

                    ""
            }


            <div className="dashOutlet">

                <Outlet />
            </div>
        </div >
    );
};

export default DashboardLayout;