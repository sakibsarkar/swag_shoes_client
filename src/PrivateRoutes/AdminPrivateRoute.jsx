import LoadingAnimation from "../Cards & Components/LoadingAnimation/LoadingAnimation";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Hooks & Functions/AauthContext";

const AdminPrivateRoute = ({ children }) => {
    const { loading, user, userRole } = useContext(Context)
    if (loading) {
        return <LoadingAnimation />
    }
    if (!user) {
        return <Navigate to={"/login"} state={location.pathname}></Navigate>
    }

    if (userRole === "admin") {
        return children
    }
    return <Navigate to={"/"}></Navigate>
};

export default AdminPrivateRoute;