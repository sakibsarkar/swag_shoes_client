import auth from "../Firebase/Firebase-config";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null)
const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [waitForUser, setWaitForUser] = useState(true)


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
        setWaitForUser,
        waitForUser,
        loading

    }
    return (
        <Context.Provider value={items}>
            {children}
        </Context.Provider>
    );
};

export default AuthContext;