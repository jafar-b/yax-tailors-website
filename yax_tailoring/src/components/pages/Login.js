import React, { Component } from 'react'
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom"
import Auth from "../Auth"
import LoginError from './LoginMessage';



export default class Login extends Component {

  cookies = new Cookies();

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      show: false,
      redirect: false,
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


  // Onclick event on LOGIN button
  onLogin = () => {

    let email = this.state.email;
    let password = this.state.password;

    /* Check email enterred or not */
    if (!email) {
      alert("Please Input Email!")
    }

    /* Check password is enterred or not */
    else if (!password) {

      alert("Please Input Password!")

    } else {

      this.setState({ isLoading: true })

      console.log(this.state.isLoading)
      // validate input before requesting
      this.LoginRequest(email, password);

    }


  }


  // Login API request
  LoginRequest = (email, password) => {

    let headersList = {
      'accept': 'application/json',
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"

    }

    let bodyContent = `email=${email}&pass=${password}`;

    fetch("http://localhost:5000/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    })
      .then((response) =>
        response.json()
      )
      .then(data => {
        this.setState({ isLoading: false })


        alert(data.message)

        // console.log(data.message)
        if (data.status === 200) {
          // If request status is 200 ok then redirect

          // store data into cookie
          try {
            const cookieOption = {
              path: "/",
              sameSite: true,
              secure: true,
              maxAge: 60 * 60 * 24 * 30
              // httpOnly: true,
            }

            this.cookies.set("token_id", data.token, cookieOption);
            this.cookies.set("user_id", data.userId, cookieOption);
            this.setState({ redirect: true });

            // redirect to home page
            window.location.href = "/";

          } catch (err) {

            console.log("Something went wrong..", err);

            alert("Something Went Wrong,Try again...")

          }

        }


      }).catch(err => {

        this.setState({ isLoading: false })

        if (err) {
          alert("Something Goes went wrong, Please try again later", err)
        }
      });
  }


  render() {

    return (

      <div className="container mt-2 mb-2" style={{ backgroundColor: "#fff" }}>

        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black bg-white" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
                      </svg></p>


                    <form className="mx-1 mx-md-4">

                      {/* email section */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" placeholder='Your Email' defaultValue={this.state.email} onChange={this.handleEmail.bind(this)} />
                        </div>
                      </div>

                      {/* password Section */}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" placeholder='Password' value={this.state.password} onChange={this.handlePassword.bind(this)} />
                        </div>
                      </div>

                      {/* Loading */}
                      {
                        this.state.isLoading === true ? <div className="d-flex justify-content-center mb-2 mt-0">
                          <div className="spinner-border text-danger" role="status">
                            <span className="sr-only"></span>
                          </div>
                        </div> : null
                      }


                      {/* Login Click Button */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={this.onLogin.bind(this)}>
                          Login
                        </button>
                      </div>

                    </form>

                  </div>

                  {/* Login feature image */}
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <div className='img-fluid '>

                      <img src="./Images/login.svg" className='login-img' alt="login" />

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
