import "./Navbar.css";
import { useContext, useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiConverseShoe } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";

const Navbar = () => {
    const { user, logout, myCart, userRole } = useContext(Context)
    const [showDropDown, setShowDropDown] = useState(false)
    const defaultUser = "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"


    const [showDrawer, setShowDrawer] = useState(false)

    const handleLogout = () => {
        logout()
    }


    const handleShowDrawer = () => {
        if (showDrawer) {
            document.body.classList.remove("noScroll")
            setShowDrawer(!showDrawer)
        }
        else {
            document.body.classList.add("noScroll")
            setShowDrawer(!showDrawer)

        }
    }





    return (
        <div className="navWrapper">
            <nav>
                <div className="logo">
                    <img src="https://i.ibb.co/0m6QGR0/BWlogo.png" alt="" />
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
                            <Link to={"/myCart"} className="cart">
                                <IoCart />
                                <p>{myCart.totalItem}</p>
                            </Link>

                            {
                                showDropDown ?
                                    <div className="userDropDown" onClick={() => setShowDropDown(false)}>
                                        <Link>Profile</Link>
                                        {
                                            userRole ?
                                                <>
                                                    {

                                                        userRole == "admin" ?
                                                            <Link to={"/dashboard/statistics"}>Dashboard</Link>
                                                            :
                                                            ""
                                                    }
                                                </>
                                                :
                                                ""
                                        }
                                        <Link to={"/myOrders"}>Order History</Link>
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

            <div className="drawerNav">
                <GiHamburgerMenu onClick={handleShowDrawer} className="hamburger" />
                {
                    showDrawer ?
                        <div className="drawerContainer" onClick={handleShowDrawer}>
                            <div className="logo">
                                <img src="https://i.ibb.co/0m6QGR0/BWlogo.png" alt="" />
                            </div>
                            <div className="drawerLinks">
                                <NavLink to={"/"}><GoHome />Home</NavLink>
                                <NavLink to={"/allShoes"}><GiConverseShoe />All Shoes</NavLink>
                                <NavLink to={"/contact"}><GrContact />Contact</NavLink>
                                {
                                    user ?
                                        <>

                                            <NavLink to={"/myCart"}><FaUser /> My cart</NavLink>
                                            <NavLink to={"/myCart"}><IoCart /> My cart</NavLink>
                                            <NavLink to={"/myOrders"}><CiShoppingBasket />Order History</NavLink>


                                            {
                                                userRole === "admin" ?
                                                    <Link to={"/dashboard/statistics"}><FaChartLine />Dashboard</Link>
                                                    :
                                                    ""
                                            }

                                        </>

                                        : ""
                                }

                            </div>


                        </div>
                        :
                        ""
                }
            </div>
        </div >
    );
};

export default Navbar;