import Footer from "../Shared/Footer/Footer";
import NavbarV2 from "../V2/NabarV2/NavbarV2";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            {/* <Navbar /> */}

            <Toaster />
            <NavbarV2 />
            <Outlet />
            <Footer />

        </>
    );
};

export default MainLayout;