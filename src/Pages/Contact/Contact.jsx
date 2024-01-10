import "./Contact.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useContext, useRef } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";
import { Context } from "../../Hooks & Functions/AauthContext";

const Contact = () => {
    const { user } = useContext(Context)
    const userName = user?.displayName || ""
    const userEmail = user?.email || ""



    const form = useRef(null)
    const sendEmail = (e) => {
        e.preventDefault();


        emailjs.sendForm(import.meta.env.VITE_MAIL_JS_SERVICE_ID, import.meta.env.VITE_MAIL_JS_TPLT_ID, form.current, import.meta.env.VITE_MAIL_JS_PUBLIC_KEY)
            .then((result) => {
                Swal.fire({
                    title: "Success",
                    text: "Message send successfuly. please wait we will contact with you",
                    icon: "success"
                });
                e.target.reset()
            }, (error) => {
                Swal.fire({
                    title: "Success",
                    text: "Something went wrong, please try again",
                    icon: "error"
                });
                console.log(error.text);
            });
    };


    return (
        <div className="contactContainer" >
            <h1>Contact us</h1>


            <form onSubmit={sendEmail} ref={form}>
                <div>
                    <p>Your Name</p>
                    <input type="text" name="name" defaultValue={userName} required />
                </div>
                <div>
                    <p>Your Email</p>
                    <input type="text" name="name" defaultValue={userEmail} required />
                </div>
                <div>
                    <p>Your Message</p>
                    <textarea name="message" placeholder="Your Message" required />
                </div>
                <button><FaRegPaperPlane />Send</button>
            </form>

        </div>
    );
};

export default Contact;