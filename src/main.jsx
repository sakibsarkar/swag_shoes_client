import "./index.css";
import AuthContext from "./Hooks & Functions/AauthContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { route } from "./Routes/Routes";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <RouterProvider router={route} />
    </AuthContext>
  </React.StrictMode>,
)
