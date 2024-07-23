import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import LogOut from '../LogOut';


const cookie = new Cookies()

export const DeleteProfile = () => {

    const [redirect, setRedirect] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [isError, setError] = useState("");
    const [isLoading, setLoading] = useState(false);


    const onChangeOldPass = (e) => {
        setOldPass(e.target.value);
    }


    const onDeleteEvent = () => {
        if (oldPass === "" || oldPass === undefined) {
            alert("Please Enter your Account Password to delete Account");
        } else {

            onDelete();

        }
    }

    const onDelete = async () => {

        const token_id = cookie.get("token_id");

        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            token_id: token_id
        }

        let bodyContent = `pass=${oldPass}`;

        let response = await fetch("http://localhost:5000/profile/delete", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setLoading(false);

        if (response.ok) {

            cookie.remove("token_id");
            cookie.remove("user_id");

            alert("Successfully Deleted Account");

            // hard redirect to home page
            window.location.href = "/";
        } else {
            setError(data.message);
        }

    }

    // on Cancel click event
    const onCancel = () => {
        // redirect to home page
        setRedirect(true)
    }


    return (
        <div className='container'>

            {
                redirect === true ?
                    <Navigate to="/profile" />
                    : null
            }

            <div className="personal-info align-item-center">
                <div className="title alert alert">
                    <strong>
                        Delete Your Account
                    </strong>
                </div>

                <p className="alert alert-danger p-1">Click "Delete" to delete your account permanently.</p>

                {/* Form */}
                <form className="form-horizontal" >

                    {/* Old Password */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input className="form-control" type="password" value={oldPass} onChange={onChangeOldPass} placeholder={"enter your password"} />


                    </div>

                    {/* Loading Effect */}

                    {
                        isLoading === true ? <div className="d-flex justify-content-center mb-2 mt-0">
                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div> : null
                    }

                    {/* Show Error */}
                    {
                        isError !== "" ?
                            <div>
                                <div className="alert alert-danger mt-1 mb-1">
                                    Error:  {isError}
                                </div>
                            </div> : null
                    }


                    {/* Buttons */}

                    <div className="form-group edit-action-btn mt-2">

                        <div className="col">

                            {/* Save Changes */}

                            <input type="button" className="btn m-1" value="Delete Account" onClick={onDeleteEvent} />

                            <span className="m-1"></span>

                            {/* Cancel */}
                            <input
                                type="reset"
                                className="btn btn-default m-1"
                                value="Cancel"
                                onClick={onCancel}
                            />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
