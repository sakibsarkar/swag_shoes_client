import "./Navbar.css";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <img src="https://i.ibb.co/jD0cWQ4/LOGO.png" alt="" />
            </div>

            <ul>
                <li><NavLink to={"/"} className="navLinks">Home</NavLink></li>
                <li><NavLink to={"/products"} className="navLinks">Products</NavLink></li>
                <li><NavLink to={"/all-shoes"} className="navLinks">All Shoes</NavLink></li>
                <li><NavLink to={"/contact"} className="navLinks">Contact</NavLink></li>
            </ul>


            <Link to={"/login"} className="createAccount">
                <FaUser />
                <p>|</p>
                <p>Login</p>
            </Link >

        </nav>
    );
};

export default Navbar;