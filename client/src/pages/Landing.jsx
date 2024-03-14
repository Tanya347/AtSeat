import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  

  return (
    <div>
        <Link to="/adminLogin">
            <button>Login as Admin</button>
        </Link>
        <Link to="/userLogin">
            <button>Login as User</button>
        </Link>
    </div>
  )
}

export default Landing