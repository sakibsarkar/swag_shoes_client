import "./Login.css";
import PageBanner from "../../Shared/PageBanner/PageBanner";
import SocialAuth from "../../Shared/SocialAuth/SocialAuth";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";
import { addItemToLS } from "../../Hooks & Functions/locaStorage";

const Login = () => {
    const location = useLocation()
    const [loginLoading, setLoginLoading] = useState(false)
    const axios = UseAxios()


    const navigate = useNavigate()
    const addrss = location?.state ? location.state : "/"

    const { login, user, logout } = useContext(Context)
    const handleLogin = async (e) => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value
        const password = form.password.value
        await login(email, password)

        try {

            setLoginLoading(true)

            // get token from the server
            const { data: token } = await axios.post("/user/token", { email: email })
            addItemToLS("token", token)


            // authentication
            const { user } = await login(email, password)

            setLoginLoading(false)
            Swal.fire({
                title: "Success fully Logged in",
                text: "",
                icon: "seccess"
            });
            navigate(addrss)
        }

        catch (err) {
            logout()
            Swal.fire({
                title: "something wrong.please check your email or password",
                text: "",
                icon: "error"
            });
            console.log(err);
            setLoginLoading(false)
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
                    <Button type="submit" variant="contained">

                        {
                            loginLoading ?
                                <ImSpinner9 className="rotate" />
                                :
                                " Login"
                        }

                    </Button>
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