import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../AauthContext";

export const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

const UseAxios = () => {
    const { logout } = useContext(Context)
    const navigate = useNavigate()

    instance.interceptors.response.use((res) => {
        return res
    },

        async (err) => {
            const status = err?.response?.status

            if (status === 401 || status === 403) {
                await logout()
                Promise.reject(err)
                navigate("/login")
            }

        })

    return instance
};

export default UseAxios;