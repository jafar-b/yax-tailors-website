import React, { useEffect, useState } from "react";
import AuthValidate from "../../../Auth/AuthValidate";
import "../../style/Editprofile.css";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom"
import validateEmail from "../../utility/emailValidate";

const cookies = new Cookies();

const Editprofile = () => {

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isError, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  // onLoad page
  useEffect(() => {

    // if (authstate === "logged") {
    getProfile();
    // 
  }, []);




  // handle Name
  const onChangeName = (e) => {
    setName(e.target.value);
  }

  // handle Name
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  // handle address
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  }

  // handle inputs 
  const handleInputes = () => {
    if (name === "") {

      alert("Please Enter Valid Name")

    }
    else if (email === "") {

      alert("Please Enter Email");

    }
    else {

      if (validateEmail(email)) {

        updateProfile();

      } else {

        alert("Please Enter Valid Email")

      }

    }
  }


  // Get profile information from the server
  const getProfile = async () => {

    setLoading(true);

    const token_id = cookies.get("token_id");

    // pass token to the headers 
    let headersList = {
      "Accept": "*/*",
      "token_id": token_id
    }

    let response = await fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    // console.log(data);

    if (response.ok) {

      try {
        // set the response value to the hooks
        setName(data.name);
        setEmail(data.email);
        setAddress(data.location);


      } catch (err) {
        console.log("Some values are not found");
      }

    } else {
      // console.log(data.message);
      setError(data.message);
    }
    setLoading(false);

  }


  // On Update CLick Event 
  const onUpdate = () => {
    handleInputes();
  }

  // Update Profile (name,email, and address fields)
  const updateProfile = async () => {

    setLoading(true);

    const token_id = cookies.get("token_id");

    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "token_id": token_id
    }

    let bodyContent = `name=${name}&email=${email}&address=${address}`;

    let response = await fetch("http://localhost:5000/profile/edit", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();

    setLoading(false);

    alert(data.message);

    setRedirect(true);


  }

  // on Cancel click event
  const onCancel = () => {
    // redirect to home page
    setRedirect(true)
  }

  return (

    <div className="container mt-2 mb-2 edit-profile" style={{ backgroundColor: "#fff" }}>

      {/* Redirect to login Page */}

      {
        redirect === true ?
          <Navigate to="/profile" />
          : null
      }

      {
        isError === "" ?

          <div>

            <div className="personal-info align-item-center">
              <div className="title alert alert">
                <strong>
                  Edit Your Profile
                </strong>
              </div>

              <p className="alert alert-danger p-1">Click "Save Changes" to save your changes.</p>
            </div>

            {/* Form */}
            <form className="form-horizontal" >

              {/* Name */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                <input className="form-control" type="text" value={name} onChange={onChangeName} />
              </div>

              {/* Email */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              {/* Address */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
                <input className="form-control" value={address} type="text" onChange={onChangeAddress} />
              </div>

              {/* Loading Effect */}

              {
                isLoading === true ? <div className="d-flex justify-content-center mb-2 mt-0">
                  <div className="spinner-border text-danger" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div> : null
              }

              {/* Button */}
              <div className="form-group edit-action-btn mt-2">

                <div className="col">

                  {/* Save Changes */}

                  <input type="button" className="btn m-1" value="Save Changes" onClick={onUpdate} />

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
          :
          <div>
            <div className="alert alert-danger">
              {isError}
            </div>
          </div>
      }

    </div>
  );
}


export default Editprofile;