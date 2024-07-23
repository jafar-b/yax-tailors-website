import React, { useState, useEffect } from 'react'
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom"


const AuthValidate = require("../../Auth/AuthValidate");
const cookies = new Cookies();
const LogOut = () => {

  // check logged or not
  const [authstate, setAuthState] = useState("");

  // smooth redirect
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    AuthValidate.default.onAuth().then(value => {
      console.log(value)

      setAuthState(value);

    });
  }, [])


  const onLogOut = async () => {

    cookies.remove("token_id");
    cookies.remove("user_id");

    await alert("You are Logged Out Successfully")
    
    // hard redirect to home page
    window.location.href = "/";

  }

  const cancelLogout = () => {

    // redirect to home page
    setRedirect(true)
  }

  return (
    <>
      {
        redirect === true ?
          <Navigate to="/" />
          : null
      }
      {
        authstate !== "notLogged" ?

          < div className='card bg-white m-2' >

            <div className="alert alert-danger m-2" role="alert">

              Are you sure you want to Logout?

            </div>

            <div>

              <button className=' btn btn-success' onClick={cancelLogout}>
                No
              </button>

              <button className='m-1 btn btn-danger' onClick={onLogOut}>
                Yes
              </button>
            </div>
          </div >
          :

          <div className="notLogged card bg-white m-2">
            <div className="alert alert-danger m-2" role="alert">

              You are not Logged In.

            </div>
          </div>
      }
    </>

  )
}

export default LogOut