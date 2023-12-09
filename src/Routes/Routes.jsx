import AllShoes from "../Pages/AllShoes/AllShoes";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MainLayout from "../Layout/MainLayout";
import Signup from "../Pages/Signup/Signup";
import { createBrowserRouter } from "react-router-dom";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/allShoes",
                element: <AllShoes />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            }
        ]
    }
]
)