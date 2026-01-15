import React from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.init";
const AuthProvider = ({ children }) => {

    const signUpUserEmailPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUserEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userInfo = {
        signUpUserEmailPassword,
        signInUserEmailPassword
    };

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};
export default AuthProvider;