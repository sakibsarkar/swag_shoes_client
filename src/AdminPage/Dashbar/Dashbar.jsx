import "./Dashbar.css";
import { FaBox } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Dashbar = () => {
    return (
        <div>


            <Link to={"/"} className="dashlogo">
                <img src="https://i.ibb.co/jD0cWQ4/LOGO.png" alt="" />
            </Link>


            <h1>Dashboard</h1>

            <div className="dashBoardLinks">
                <NavLink to={"/dashboard"}><GrLineChart />Statistics</NavLink>
                <NavLink to={"/dashboard/allOrders"}><FaBox /> All Orders</NavLink>
                <NavLink to={"/pendingOrders"}><MdOutlinePendingActions />Pending Orders</NavLink>
            </div>


        </div>
    );
};

export default Dashbar;