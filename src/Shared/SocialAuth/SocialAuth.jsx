import "./SocialAuth.css";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks & Functions/Axios/UseAxios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Hooks & Functions/AauthContext";
import { addItemToLS } from "../../Hooks & Functions/locaStorage";

const SocialAuth = ({ mt = 0 }) => {
    const { googleAuth, githubAuth, logout, user } = useContext(Context)

    const axios = UseAxios()

    // registration date 
    const MonthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dateFun = new Date()
    const date = dateFun.getDate()
    const monthNumber = dateFun.getMonth()
    const month = MonthArr[monthNumber]
    const year = dateFun.getFullYear()

    const today = `${month} ${date},${year}`


    const address = "/"
    const navigate = useNavigate()


    const mediaLogin = async (media) => {
        const toastId = toast.loading("please wait...")

        try {
            const { user } = await media();
            if (!user.email) {
                toast.dismiss(toastId)
                logout()
                return toast.error("please login with a different account that has a email")
            }
            const { data: token } = await axios.post("/user/token", { email: user?.email })
            addItemToLS("token", token)

            const userObj = {
                name: user?.displayName,
                email: user?.email,
                registerDate: today,
                role: "user",

            }
            const { data: addData } = await axios.put(`/addUser?token=${token}`, userObj)

            Swal.fire({
                icon: "success",
                title: "Succes",
            });

            navigate(address)
            toast.dismiss(toastId)
        }
        catch {
            if (user) {
                logout()
            }
            toast.dismiss(toastId)
            toast.error("something went wrong please try again")
        }

    }

    return (
        <div className="socialAuthWrapper" style={{ marginTop: `${mt}px` }}>

            <h1>Or login with</h1>
            <div className="authentications">
                <div className="socialBox" onClick={() => mediaLogin(googleAuth)}>
                    <FcGoogle />
                </div>
                <div className="socialBox" onClick={() => mediaLogin(githubAuth)}>
                    <FiGithub />
                </div>
            </div>
        </div >
    );
};

export default SocialAuth;