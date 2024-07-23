import React from 'react'
import Auth from '../Auth'
import Login from '../pages/Login'

// Check Auth Before GOing to Actual Page - This file works as middle ware
function LoginS({children}) {
    return (

        <Auth>
          {children}
        </Auth>
    )
}

export default LoginS