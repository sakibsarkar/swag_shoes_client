import LoadingAnimation from "../Cards & Components/LoadingAnimation/LoadingAnimation";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Hooks & Functions/AauthContext";

const UserPrivateRoute = ({ children }) => {


    const { user, loading } = useContext(Context)

    if (loading) {
        return <LoadingAnimation />
    }

    if (!user) {
        return <Navigate to={"/login"} state={location.pathname}></Navigate>
    }



    return children
};

export default UserPrivateRoute;