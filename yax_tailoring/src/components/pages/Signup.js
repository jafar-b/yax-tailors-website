import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import "../style/login.css"
import Cookies from "universal-cookie";


const cookies = new Cookies();


export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      retype: '',
      redirect: false,
      agree: false,
      isLoading: false
    }
  }

  // handle email input
  handleEmail = (event) => {

    this.setState({ email: event.target.value })

  }

  // handle password input
  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  // handle retype
  handleRetypePass = (event) => {

    this.setState({ retype: event.target.value })

  }

  // handle name input
  handleName = (event) => {

    this.setState({ name: event.target.value })

  }

  // agreement agree
  handleAgreement = () => {
    if (this.state.agree === false) {

      this.setState({ agree: true })

    } else {

      this.setState({ agree: false })

    }
  }

  // On signup click event
  onSignUp() {
    let email = this.state.email;
    let password = this.state.password;
    let retypepassword = this.state.retype;
    let name = this.state.name;

    /* Check email enterred or not */
    if (!email) {
      alert("Please Input Email!")
    }

    /* Check password is enterred or not */
    else if (!password) {

      alert("Please Input Password!")

    }

    /* Check retype_pass */
    else if (!retypepassword) {
      alert("Please Enter Password Again!")

    }

    /* check name */
    else if (!name) {
      alert("Please Enter your Name")
    }

    /* Check both password is same or not */
    else if (password !== retypepassword) {
      alert("Password Does not match")
    }

    else if (this.state.agree === false) {
      alert("Please Agree our Terms and Condition to use our Platform")
    }

    // If all are input are present then make API request
    else {
      this.setState(
        { isLoading: true }
      )
      this.SignUp(email, password, name, retypepassword);
    }


  }


  // Signup API request
  SignUp = async (email, pass, name, retype) => {

    // passing Headers
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded"
    }

    // body to request
    let bodyContent = `name=${name}&email=${email}&pass=${pass}&retype_pass=${retype}`;

    try {


      // making request
      let response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      // getting and parsing response
      let data = await response.json();
      console.log(data);

      this.setState(
        { isLoading: false }
      )

      alert(data.message);

      // If success Request 
      if (response.ok) {

        const cookieOption = {
          path: "/",
          sameSite: true,
          expire: Date.now() + 60 * 60 * 24 * 30,
          secure: true,
          // httpOnly: true, // Not Working

        }

        // store user id and login token for auth
        cookies.set("token_id", data.token, cookieOption);
        cookies.set("user_id", data.userId, cookieOption);

        // hard redirect to home page
        window.location.href = "/";

      }
    } catch (err) {

      this.setState(
        { isLoading: false }
      )

      alert("Something goes went wrong, Please try again Later")

    }

  }

  // Render 
  render() {

    const { redirect } = this.state;

    console.log(redirect)

    if (redirect) {

      return <Navigate to="/" />
    }
    return (
      <div className="container mt-2 mb-2" style={{ backgroundColor: "#fff" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black bg-white" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"  >Sign up</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">

                        {/* Input name */}
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example1c" placeholder='Your name' className="form-control" onChange={this.handleName.bind(this)} />

                        </div>
                      </div>

                      {/* Input Email */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" placeholder='Your Email' onChange={this.handleEmail.bind(this)} />
                        </div>
                      </div>

                      {/* Input Password */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" placeholder='Password' onChange={this.handlePassword.bind(this)} />
                        </div>
                      </div>

                      {/* Input Retype Password */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" placeholder='Repeat your password' onChange={this.handleRetypePass.bind(this)} />
                        </div>
                      </div>

                      {/* Input checkbox for agreement Licence */}
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" onChange={this.handleAgreement.bind(this)} />

                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#">Terms of service</a>
                        </label>
                      </div>

                      {/* Loading */}
                      {
                        this.state.isLoading === true ? <div className="d-flex justify-content-center mb-2 mt-0">
                          <div className="spinner-border text-danger" role="status">
                            <span className="sr-only"></span>
                          </div>
                        </div> : null
                      }

                      {/* Signup button */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                        <button type="button" className="btn btn-primary btn-lg" style={{ backgroundColor: "#6c63ff", border: "none" }} onClick={this.onSignUp.bind(this)} >Signup</button>

                      </div>

                    </form>

                  </div>

                  {/* Signup Image  */}
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 ">
                    <div className='img-fluid '>

                      <img src="./Images/singup.svg" className='signup-img' alt='singup' />

                    </div>
                  </div>

                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}
