import React, { useState, useEffect } from 'react'
import "../style/Header.css"
import { Link } from "react-router-dom";

const AuthValidate = require("../../Auth/AuthValidate");

const Header = () => {

    const [state, setSate] = useState("none");
    const [close, setClose] = useState("none");


    // check logged or not
    const [authstate, setAuthState] = useState("");

    useEffect(() => {
        AuthValidate.default.onAuth().then(value => {
            // console.log(value)
            setAuthState(value);

        });
    }, [])


    // for open and close navbar
    const OpenNav = () => {
        if (state === "none") {
            setSate("active")
            setClose("close")
        } else if (state === "active") {
            setSate("none")
            setClose("none")
        }
    }


    return (
        <header className="header">
            <nav className="navbar">

                {/* Mobile */}
                <div className={`hamburger ${close}`} onClick={OpenNav}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className="logo-container">
                    <Link to='/' style={{ textDecoration: "none" }}>
                        YAX<span> Tailors</span>
                    </Link>
                </div>

                <ul className={`nav-items  ${state}`}>


                    {/* signup button */}

                    {
                        authstate !== "logged" ?

                            <Link to="/signup" onClick={OpenNav}>

                                <li className="nav-item" >
                                    Signup
                                </li>

                            </Link >

                            : null
                    }


                    {/* Profile Section */}

                    {
                        authstate === "logged" ?

                            <Link to="/profile" onClick={OpenNav} >
                                <li className="nav-item"  >
                                    Account

                                </li>
                            </Link>

                            : null
                    }



                    <Link to="/cart" onClick={OpenNav}>
                        <li className="nav-item cart" >
                            Cart
                        </li>
                    </Link>


                    {/* Login Section */}

                    {
                        authstate === "notLogged" ?

                            <Link to="/login" className='login' onClick={OpenNav} >
                                <li className="nav-item login" >
                                    Login
                                </li>
                            </Link>
                            :
                            authstate === "logged" ?
                                <Link to="/logout" className='login' onClick={OpenNav} >
                                    <li className="nav-item login" >
                                        LogOut
                                    </li>
                                </Link>
                                :
                                authstate === "error" ?

                                    <Link to="/login" className='login' onClick={OpenNav} >
                                        <li className="nav-item login" >
                                            Error
                                        </li>
                                    </Link> : null
                    }

                </ul>

            </nav>

        </header>
    )
}

export default Header;

/* API :/register - user registration 
        /login - user login
        /explore - return all the products - return category
        /cart - add orders here and show bill
        /order/:id  -  order service 
        /explore/:category-name
        /offers
        /offer/:id -> redirect to service page 
        
*/
