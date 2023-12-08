import "./Signup.css";
import PageBanner from "../../Shared/PageBanner/PageBanner";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";
import { uploadPhoto } from "../../Hooks & Functions/uploadPhoto";

const Signup = () => {


    const { signup } = useContext(Context)

    const navigate = useNavigate()
    const address = "/"

    const handleSignup = async (e) => {
        e.preventDefault()
        const form = e.target
        const firstName = form.Fname.value
        const lastName = form.Lname.value
        const photo = form.photo.files[0]
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value


        // regex
        const capital = /[A-Z]/;
        const special = /[\W_]/

        if (!capital.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password should contain atleast one capital letter",
                text: "use capital letter",
            });
            return;
        }
        if (!special.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password should contain atleast one special charecter",
                text: "use special character",
            });
            return;
        }


        if (password !== confirm) {
            Swal.fire({
                icon: "error",
                title: "Password didn't matched ",
                text: "try again",
            });
            return;
        }

        try {
            const { data } = await uploadPhoto(photo)
            const url = data?.display_url

            const { user } = await signup(email, password)

            await updateProfile(user, {
                photoURL: url,
                displayName: `${firstName} ${lastName}`
            })

            navigate(address)


        }

        catch (err) {
            console.log(err);
        }

    }




    return (
        <div className="signupCon">
            <PageBanner sectionName={"Signup"} routeArr={["Home", "/", "Signup"]}></PageBanner>


            <div className="signupFormBox">
                <form className="signUp" onSubmit={handleSignup}>
                    <h1>Signup</h1>
                    <div className="brother">
                        <TextField name="Fname" type="text" required id="standard-basic" label="First Name" variant="standard" />
                        <TextField name="Lname" type="text" required id="standard-basic" label="Last Name" variant="standard" />
                    </div>

                    <input className="photoUploadBox" name="photo" type="file" accept="image/*" required />

                    <TextField name="email" type="email" required id="standard-basic" label="Email" variant="standard" />

                    <TextField name="password" type="password" required id="standard-basic" label="Password" variant="standard" />

                    <TextField name="confirm" type="password" required id="standard-basic" label="Confirm Password" variant="standard" />

                    <button type="submit">signUp</button>

                </form>
            </div>
        </div>
    );
};

export default Signup;