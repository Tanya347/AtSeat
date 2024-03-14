import '../styles/navbar.scss'
import { useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext"


const Navbar = ({type}) => {

    const navigate = useNavigate()

    const { user, dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }



    return (
        <div className='navContainer'>
            <Link to="/home"> 
                <p className='navLogo'>AtSeat</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar"><FontAwesomeIcon icon={faBars} className="icon" /></label>
            <nav className='navbar'>
                <ul>
                    <Link to="/landing">
                        <li><p>Landing</p></li>
                    </Link>
                    <Link to="/">
                        <li><p>Search Page</p></li>
                    </Link>
                    <Link to="/reservations">
                        <li><p>Reservations</p></li>
                    </Link>
                    {user ? (<>

                        <Link to={`/user/${user._id}`}>
                            <li onClick={handleClick} style={{ cursor: "pointer" }}><p>Logout</p></li>
                            <li><div className="profilePicture">
                                <img src={user.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
                            </div></li>
                            <li id="usernamename"><p>{user.username}</p></li>
                        </Link>
                    </>
                    )
                        :
                        (
                            <>
                                <Link to={type === "admin"? "/adminRegister":"/userRegister"}>
                                    <li><p>Register</p></li>
                                </Link>
                                <Link to={type === "user"? "/userLogin" : "/adminLogin"}>
                                    <li><p>Login</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div >
    )
}

export default Navbar