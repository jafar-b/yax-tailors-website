// To check user is already login in browser or not
import React, { useState } from 'react'
import Login from './pages/Login';
import LoginMessage from './pages/LoginMessage';
import LogOut from './pages/LogOut';


const AuthValidate = require("../Auth/AuthValidate");

const Auth = ({ children }) => {

    const [state, setState] = useState("");

    AuthValidate.default.onAuth().then(value => {
        // console.log(value)

        setState(value);

    });

    if (state === "logged") {

        // return <LoginMessage message={"User already Logged in"} />
        return <LogOut />

    } else if (state === "error") {

        return <LoginMessage message={"Invalid Login , Please Relogin"} />

    }
    return (
        <div>
            {children}
        </div>
    )


}

export default Auth