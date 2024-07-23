import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export const UpdatePassword = () => {

    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isError, setError] = useState("");

    const onChangeNewPass = (e) => {
        setNewPass(e.target.value);
    }

    const onChangeOldPass = (e) => {
        setOldPass(e.target.value);
    }

    const validateInputs = () => {

        setLoading(true);

        if (oldPass === "" || oldPass === undefined) {
            alert("Please enter Your Old/Previus Password");
        }
        else if (newPass === "" || newPass === undefined) {
            alert("Please Enter New Password");
        }
        else {

            // make request
            onUpdate();
        }
    }

    // On update click event
    const onUpdateClick = () => {
        validateInputs();
    }


    // Onupdate API request
    const onUpdate = async () => {

        // Toked ID from cookie
        const token_id = cookies.get("token_id");

        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            token_id: token_id
        }

        let bodyContent = `oldPass=${oldPass}&newPass=${newPass}`;

        let response = await fetch("http://localhost:5000/profile/edit/password", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setLoading(false)

        if (response.ok) {
            alert(data.message)
            setRedirect(true)
        } else {
            setError(data.message)
        }
    }


    // on Cancel click event
    const onCancel = () => {
        // redirect to home page
        setRedirect(true)
    }

    return (
        <div className="container mt-2 mb-2 edit-profile" style={{ backgroundColor: "#fff" }}>

            {
                redirect === true ?
                    <Navigate to="/profile" />
                    : null
            }

            <div className="personal-info align-item-center">
                <div className="title alert alert">
                    <strong>
                        Edit Your Password
                    </strong>
                </div>

                <p className="alert alert-danger p-1">Click "Save Changes" to save your changes.</p>

                {/* Form */}
                <form className="form-horizontal" >

                    {/* Old Password */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Old Password</span>
                        <input className="form-control" type="password" value={oldPass} onChange={onChangeOldPass} placeholder={"enter your old password"} />


                    </div>

                    {/* New assword */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">New Password</span>
                        <input className="form-control" type="password" value={newPass} onChange={onChangeNewPass} placeholder={"enter your New password"} />
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

                            <input type="button" className="btn m-1" value="Save Changes" onClick={onUpdateClick} />

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
