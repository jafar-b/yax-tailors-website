import React from 'react'

const LoginError = ({ message }) => {
  return (
    <div className="alert alert-danger m-2" role="alert">
      {message}
    </div>
  )
}

export default LoginError