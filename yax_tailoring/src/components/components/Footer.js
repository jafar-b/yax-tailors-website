import React from 'react'
import "../style/Footer.css"

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'

const Footer = () => {
    return (

        <div className='footer'>
            <div className="container-max">

                <div className="card bg-white p-3 ">
                    <div className="row">

                        <div className="col-md-4 col-sm-11 col-xs-11">
                            <div className="footer-text pull-left">
                                <div className="d-flex logo">
                                    <h1 className="font-weight-bold mr-2 px-3" style={{ color: "red" }} > YAX  </h1>
                                    <h1 style={{ color: "red" }}>TAILORS</h1>
                                </div>
                                <p className="card-text"> Block No 10, Municipal Shopping Center, Athawada Bazar, Ratnagiri City, Ratnagiri - 415612 .</p>
                                {/* 16.990894323986005, 73.28742859224732 */}
                                {/* https://www.embedgooglemap.net/ */}

                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe width="450" height="150" id="gmap_canvas" src="https://maps.google.com/maps?q=%2016.990894323986005,%2073.28742859224732&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                                        </iframe>
                                    </div>
                                </div>

                                {/* <div className="social ">

                                    <i className="fa fa-facebook-official fa-lg" i />
                                    <i className="fa fa-instagram fa-lg"></i>
                                    <i className="fa fa-twitter fa-lg"></i>
                                    <i className="fa fa-linkedin-square fa-lg"></i>
                                    <i className="fa fa-facebook"></i>

                                </div> */}
                            </div>
                        </div>


                        <div className="col-md-2 col-sm-1 col-xs-1 mb-2"></div>

                        <div className="col-md-2 col-sm-4 col-xs-4">

                            <h5 className="heading">Services</h5>
                            <ul >
                                <li> <Link to='#'>Men</Link></li>

                                <li>
                                    <Link to='#'> Jeans </Link>
                                </li>


                                <li>
                                    <Link to='#' />
                                    Customs made Tailored Fabric

                                </li>

                            </ul>

                        </div>


                        <div className="col-md-2 col-sm-4 col-xs-4 sm-mt-2">

                            <h5 className="heading">Opening Hours</h5>
                            <ul className="card-text">
                                <li>Mon-Sat 10.00 to 22.00.</li>
                                <li>Sunday  11.00 to 22.00.</li>
                                <li>Closed on religious holidays.</li>


                            </ul>

                        </div>


                        <div className="col-md-2 col-sm-4 col-xs-4 sm-mt-2">

                            <h5 className="heading">About Us</h5>
                            <ul className="card-text">
                                <li>
                                    <Link to='/Contact'>
                                        Contact
                                    </Link>

                                </li>
                                <li>
                                    <Link to='/Faq'>
                                        FAQs</Link>
                                </li>

                            </ul>

                        </div>

                    </div>


                    <div className="divider mb-4" >
                    </div>


                    <div className="row" style={{ fontSize: "10px" }}>

                        <div className="col-md-6 col-sm-6 col-xs-6">

                            <div className="pull-left">

                                <p><i className="fa-copyright"></i> &copy; All Rights Reserved. 2022</p>

                            </div>

                        </div>



                        <div className="col-md-6 col-sm-6 col-xs-6">


                            <div className="pull-right mr-4 d-flex policy">

                                <div>Terms of Use</div>
                                <div>Privacy Policy</div>
                                <div>Cookie Policy</div>

                            </div>



                        </div>



                    </div>
                </div>

            </div>
        </div>


    )
}

export default Footer




