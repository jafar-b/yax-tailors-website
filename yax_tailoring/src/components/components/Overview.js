
import React from 'react'

import "../style/Overview.css"
import { Link } from 'react-router-dom'

const Overview = () => {
    return (
        <div className='overview'>
            <div className="content">
                <h1>Online Tailor Services – Let Us Create Your Style</h1>
                <p>
                    A few simple steps towards your perfect fit
                </p>



                <button>       <Link to="/contact">
                    Contact Us
                    &#8594;

                </Link>
                </button>


            </div>
            {/* <video src={video}></video> */}
        </div>
    )
}

export default Overview