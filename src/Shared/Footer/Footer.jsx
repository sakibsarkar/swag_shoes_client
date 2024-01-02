import "./Footer.css";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import axios from "axios";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG, FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { IoLogoInstagram } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
    const copyDate = new Date().getFullYear()

    return (
        <footer>


            <div className="socialLinks" >
                <div className="socialLink">
                    <a href="/">
                        <GrFacebookOption />
                    </a>
                </div>

                <div className="socialLink">
                    <a href="/">
                        <FaYoutube />
                    </a>
                </div>
                <div className="socialLink">
                    <a href="/">
                        <IoLogoInstagram />
                    </a>
                </div>
                <div className="socialLink">
                    <a href="/">
                        <FaGooglePlusG />
                    </a>
                </div>

            </div>

            <div className="footerLinks">
                <Link className="footerLink" to={"/"}>Home</Link>
                <Link className="footerLink" to={"/"}>Contact</Link>
                <Link className="footerLink" to={"/"}>FAQ</Link>
                <Link className="footerLink" to={"/"}>Profile</Link>
                <Link className="footerLink" to={"/"}>About</Link>
            </div>




            <div className="copyRight">
                <p>Copyrighted by @swagShoes. All right reserved {copyDate}</p>
            </div>
        </footer>
    );
};

export default Footer;