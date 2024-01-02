import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />

        </>
    );
};

export default MainLayout;