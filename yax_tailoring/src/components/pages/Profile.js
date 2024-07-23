/* Dashboard Page */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthValidate from '../../Auth/AuthValidate';
import "../style/Profile.css"

export default function Profile() {

  // Loging/auth. status 
  const [authstate, setAuthState] = useState("");
  const [isLoading, setLoading] = useState(false);

  // check logged or not
  const checkAuth = async () => {
    await setLoading(true);
    await AuthValidate.onAuth().then(value => {
      console.log("Logged: ", value)

      // change auth state
      setAuthState(value);
    });

    setLoading(false);
  }

  useState(() => {
    checkAuth();
  }, []);


  return (
    <div className='container'>

      {
        isLoading === true ?
          <div className="d-flex justify-content-center mb-2 mt-0">
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only"></span>
            </div>
          </div> : authstate !== "logged" ?

            <div className="alert alert-danger mt-2 p-4">
              Your are not logged In, Please Login !
            </div>

            :

            <div className="text-center profile-container">
              <div className="row gy-5">

                <div className="col-6 profile-col">
                  <h1 id="pedithead">Yax Tailors, Your Place for perfect fit. </h1>
                </div>

                <div className="col-6 profile-col">
                  <Link to={"/profile/orders"}>
                    <div className="p-3 border bg-light profile-element">Your Orders</div>
                  </Link>
                </div>

                <div className="col-6 profile-col">
                  <Link to={"/profile/edit"}>
                    <div className="p-3 border bg-light profile-element" >Edit Your Profile</div>
                  </Link>

                </div>

                <div className="col-6 profile-col">
                  <Link to={"/profile/edit/password"}>
                    <div className="p-3 border bg-light profile-element">Update Password</div>
                  </Link>
                </div>

                <div className="col-6 profile-col">
                  <Link to={"/profile/delete"}>
                    <div className="p-3 border bg-light profile-element">Delete Account</div>
                  </Link>
                </div>
              </div>
            </div>

      }
    </div>




  )
}
