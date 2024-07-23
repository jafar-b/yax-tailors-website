import React from 'react'
import { Link } from 'react-router-dom'
import "../style/PageNotFound.css"

const PageNotFOund = () => {
    return (
        <div className='container pageNotFound'>
            <img src='/Images/404.svg' />
            <div className="notice alert alert-danger">
                Sorry Page Not Found

                <Link to={"/"}>
                <button className="back btn btn-success">
                    Go back
                </button>
            </Link>
            </div>
          

        </div>
    )
}

export default PageNotFOund