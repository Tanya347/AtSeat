import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/landing.scss"

const Landing = () => {
  

  return (
    <div className='landing'>
        <div className="text">
          <p>Welcome to <span>AtSeat</span> !</p>
          <Link to="/adminLogin">
              <button>Login as Admin</button>
          </Link>
          <Link to="/userLogin">
              <button>Login as User</button>
          </Link>
        </div>
    </div>
  )
}

export default Landing