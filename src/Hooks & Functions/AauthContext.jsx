import UseAxios from "./Axios/UseAxios";
import auth from "../Firebase/Firebase-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { removeItem } from "localforage";
import { createContext, useEffect, useState } from "react";
import { deleteItemFromLS, getItemFromLS } from "./locaStorage";

export const Context = createContext(null)
const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [waitForUser, setWaitForUser] = useState(true)

    const [myCart, setMyCart] = useState({ cartData: [], totalItem: 0 })



    const token = getItemFromLS("token")



    // new user register 
    const signup = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }


    // log in 
    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    // login with google
    const googleAuth = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    // gitHubLogIn
    const githubAuth = () => {
        setLoading(true)
        const provider = new GithubAuthProvider()
        return signInWithPopup(auth, provider)
    }

    // logOut
    const logout = () => {
        setLoading(true)
        deleteItemFromLS("token")
        return signOut(auth)
    }




    // userCart
    useEffect(() => {

        if (token) {
            axios.get(`http://localhost:5000/api/mycart?token=${token}`)
                .then(({ data }) => setMyCart({ cartData: data ? data : [], totalItem: data ? data.length : 0 }))
                .catch(err => {
                    return
                })
            return
        }
        setMyCart({ cartData: [], totalItem: 0 })


    }, [token])


    // atuth check
    useEffect(() => {
        onAuthStateChanged(auth, USER => {
            setUser(USER)
            setLoading(false)
        })
    }, [waitForUser])

    const items = {
        user,
        login,
        signup,
        googleAuth,
        githubAuth,
        logout,
        setWaitForUser,
        waitForUser,
        loading,
        myCart,
        setMyCart


    }
    return (
        <Context.Provider value={items}>
            {children}
        </Context.Provider>
    );
};

export default AuthContext;