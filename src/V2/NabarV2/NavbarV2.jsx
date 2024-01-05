import "./NavbarV2.css";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaChartLine } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LiaOpencart } from "react-icons/lia";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";

const NavbarV2 = () => {

    const { user, logout, userRole, myCart } = useContext(Context)
    const [showUserDropdown, setShowUserDropdown] = useState(false)

    const userName = user ? user.displayName : ""
    const firstName = userName.split(" ")[0]



    const navigate = useNavigate()
    // array object of shoe names
    const [shoeNames, setShoeNames] = useState([])

    // array shoenames mathed by search value (search suggestion)
    const [suggestion, setSuggestion] = useState([])

    const axios = UseAxios()



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


    useEffect(() => {
        axios.get("/shoe/names")
            .then(({ data }) => setShoeNames(data))
    }, [axios])






    const inputRef = useRef(null)

    const searchClick = () => {
        const value = inputRef.current.value
        inputRef.current.blur()
        setSuggestion([])
        return navigate(`/products?search=${value}`)
    }




    // making a array of shoes name from the array object of shoe names
    let nameArr = []
    for (let name of shoeNames) {
        nameArr.push(name.name.toLowerCase())
    }


    const handleShowSearchData = (e) => {
        const value = e.target.value


        if (value === "") {
            return setSuggestion([])
        }

        if (e.keyCode == 13) {
            inputRef.current.blur()
            setSuggestion([])
            return navigate(`/products?search=${value}`)
        }


        const suggestions = nameArr.filter(name => {

            return name.includes(value)
        })
        setSuggestion(suggestions)
    }


    const handleSuggestionClicked = (suggestionValue) => {
        inputRef.current.value = suggestionValue
        inputRef.current.blur();
        setSuggestion([])
    }











    return (
        <nav className="navbarV2">


            <div className="navbarTop">
                <div className="topLeft">
                    <a><IoIosPhonePortrait />+88012345678</a>
                    <a href=""><CiMail />Email</a>
                </div>

                <p>USD | BDT</p>

            </div>

            <div className="navbarMiddle">
                <div className="navbarMiddleContainer">
                    <div className="logo">
                        <Link to={"/"}>
                            SWAG <span>SHOES</span>
                        </Link>
                    </div>
                    <div className="searchbar">
                        <input ref={inputRef} type="text" placeholder="Search your need" onKeyUp={handleShowSearchData} />
                        <div className="suggestions">
                            {
                                suggestion?.map((suggestion, index) => <Link
                                    key={index}
                                    onClick={() => handleSuggestionClicked(suggestion)}
                                    to={`/products?search=${suggestion}`}

                                >
                                    {suggestion}
                                </Link>)
                            }
                        </div>
                        <button onClick={searchClick}><CiSearch /></button>
                    </div>

                    <div className="user" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                        <div className="userDisplayPicture">
                            <img src={user?.photoURL} alt="" />
                        </div>
                        <div className="userInfo">
                            <p style={{ fontWeight: "800" }}>Hello,{firstName}</p>
                            <p>see your orders</p>
                        </div>


                        <div className="userDropdDown" style={showUserDropdown ? {} : { transition: "0.4s", width: "0px", height: "0px" }}>

                            <Link><CiUser />Profile</Link>
                            <Link to={"/myOrders"}><LiaOpencart />Order History</Link>
                            {
                                userRole === "admin" ?
                                    <Link to={"/dashboard/statistics"}><FaChartLine />Dashboard</Link>
                                    :
                                    ""
                            }

                            <p onClick={handleLogout}><IoIosLogOut />Logout</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="navbarBottom">


                <div className="categories">
                    <IoMdMenu />

                    Browse Categories
                </div>

                <div className="navLinks" onClick={() => inputRef.current.value = ""}>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/allShoes"}>All Shoes</NavLink>
                    <NavLink to={"/contact"}>Contact</NavLink>
                </div>

                <div className="cartBox">
                    <Link className="cart" to={"/myCart"}>
                        <IoCartOutline />
                        <span>{myCart?.totalItem}</span>
                    </Link>

                    <Link className="shopMore" to={"/allShoes"}>Shop More</Link>
                </div>
            </div>


        </nav>
    );
};

export default NavbarV2;