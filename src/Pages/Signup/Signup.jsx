import "./Signup.css";
import PageBanner from "../../Shared/PageBanner/PageBanner";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import { TextField } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";
import { addItemToLS } from "../../Hooks & Functions/locaStorage";
import { uploadPhoto } from "../../Hooks & Functions/uploadPhoto";

const Signup = () => {

    const [signupLoading, setSignupLoading] = useState(false)

    const { signup, user, logout, waitForUser, setWaitForUser } = useContext(Context)


    const navigate = useNavigate()

    const address = "/"



    // registration date 
    const MonthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dateFun = new Date()
    const date = dateFun.getDate()
    const monthNumber = dateFun.getMonth()
    const month = MonthArr[monthNumber]
    const year = dateFun.getFullYear()

    const today = `${month} ${date},${year}`

    const axios = UseAxios()
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

        if (user) {
            return;
        }
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
            setSignupLoading(true)
            const { data } = await uploadPhoto(photo)
            const url = data?.display_url

            const { user } = await signup(email, password)

            await updateProfile(user, {
                photoURL: url,
                displayName: `${firstName} ${lastName}`
            })


            const { data: token } = await axios.post("/user/token", { email: email })



            // set token to Local storage
            addItemToLS("token", token)



            const userObj = {
                name: `${firstName} ${lastName}`,
                email: email,
                registerDate: today,
                role: "user",

            }

            const { data: addData } = await axios.put(`/addUser?token=${token}`, userObj)

            // to refetch the user data to get the updated info
            setWaitForUser(!waitForUser)


            // navigate 
            navigate(address)


        }

        catch (err) {
            await logout()
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "please try again",
            });
            setSignupLoading(false)
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

                    <button type="submit">
                        {
                            signupLoading ?
                                <ImSpinner9 className="rotate" />
                                :
                                "signUp"
                        }

                    </button>

                </form>
            </div>
        </div>
    );
};

export default Signup;