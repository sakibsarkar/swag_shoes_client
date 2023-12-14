import AdminPrivateRoute from "../PrivateRoutes/AdminPrivateRoute";
import AllOrders from "../AdminPage/AllOrders/AllOrders";
import AllShoes from "../Pages/AllShoes/AllShoes";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MainLayout from "../Layout/MainLayout";
import MyCart from "../Cards & Components/MyCart/MyCart";
import Myorders from "../Pages/Myorders/Myorders";
import PaymentPage from "../Cards & Components/PaymentPage/PaymentPage";
import ShoeDetail from "../Cards & Components/ShoeDetail/ShoeDetail";
import Signup from "../Pages/Signup/Signup";
import Statistics from "../AdminPage/Statistics/Statistics";
import UserPrivateRoute from "../PrivateRoutes/UserPrivateRoute";
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
                path: "/shoeDetail/:id",
                element: <UserPrivateRoute> <ShoeDetail /></UserPrivateRoute>
            },
            {
                path: "/myCart",
                element: <UserPrivateRoute><MyCart /></UserPrivateRoute>
            },
            {
                path: "/myOrders",
                element: <UserPrivateRoute><Myorders /></UserPrivateRoute>
            },
            {
                path: "/paymentPage",
                element: <UserPrivateRoute><PaymentPage /></UserPrivateRoute>
            }
            ,
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
    ,
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard/statistics",
                element: <AdminPrivateRoute><Statistics /></AdminPrivateRoute>
            },
            {
                path: "/dashboard/allOrders",
                element: <AdminPrivateRoute><AllOrders /></AdminPrivateRoute>
            }
        ]
    }
]
)