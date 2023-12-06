import "./Login.css";
import PageBanner from "../../Shared/PageBanner/PageBanner";
import SocialAuth from "../../Shared/SocialAuth/SocialAuth";
import Swal from "sweetalert2";
import toast, { ToastBar } from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";

const Login = () => {
    const location = useLocation()

    const navigate = useNavigate()
    const addrss = location?.state ? location.state : "/"

    const { login, user } = useContext(Context)
    const handleLogin = async (e) => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value
        const password = form.password.value
        await login(email, password)

        try {
            await login(email, password)

            // ------- to do -------
            // get token from the serverr
            Swal.fire({
                title: "Success fully Logged in",
                text: "",
                icon: "seccess"
            });
            navigate(addrss)
        }

        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="loginCon">
            <PageBanner sectionName={"Login"} routeArr={["Home", "/", "Login"]} />
            <div className="loginFormBox">

                <form className="loginForm" onSubmit={(e) => handleLogin(e)}>
                    <h1>Welcome Back</h1>
                    <TextField name="email" type="email" required id="standard-basic" label="Email" variant="standard" />
                    <TextField name="password" type="password" required id="standard-basic" label="Password" variant="standard" />
                    <Button type="submit" variant="contained">Contained</Button>
                    <SocialAuth mt={15} />
                    <div className="loginAction">
                        <p>Forgot Password?</p>
                        <Link to={"/signup"}>Don't have an account ?</Link>
                    </div>
                </form>

                <div className="loginImg">
                    <img src="https://i.ibb.co/2hPCnpw/s-l1200.webp" alt="" />
                </div>
            </div>

            {/* <ToastBar /> */}

        </div>
    );
};

export default Login;