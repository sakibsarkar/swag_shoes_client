import "./Navbar.css";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";

const Navbar = () => {
    const { user, logout } = useContext(Context)
    const [showDropDown, setShowDropDown] = useState(false)
    const defaultUser = "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"

    const handleLogout = () => {
        logout()
    }
    return (
        <div className="navWrapper">
            <nav>
                <div className="logo">
                    <img src="https://i.ibb.co/jD0cWQ4/LOGO.png" alt="" />
                </div>

                <ul>
                    <li><NavLink to={"/"} className="navLinks">Home</NavLink></li>
                    <li><NavLink to={"/allShoes"} className="navLinks">All Shoes</NavLink></li>
                    <li><NavLink to={"/all-shoes"} className="navLinks">All Shoes</NavLink></li>
                    <li><NavLink to={"/contact"} className="navLinks">Contact</NavLink></li>
                </ul>


                {
                    user ?
                        <div className="userItems">
                            <div className="userImg" onClick={() => setShowDropDown(!showDropDown)}>
                                <img src={user?.photoURL ? user.photoURL : defaultUser} alt="" />
                            </div>
                            <div className="cart">
                                <IoCart />
                            </div>

                            {
                                showDropDown ?
                                    <div className="userDropDown">
                                        <Link>Profile</Link>
                                        <Link>Order History</Link>
                                        <button onClick={handleLogout}>Log Out</button>
                                    </div>
                                    : ""
                            }

                        </div>
                        :
                        <Link to={"/login"} className="createAccount">
                            <FaUser />
                            <p>|</p>
                            <p>Login</p>
                        </Link >
                }

            </nav>
        </div>
    );
};

export default Navbar;