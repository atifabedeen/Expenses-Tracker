import React from 'react'
import '../css/Navbar.css';
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import { useAuthentication } from '../components/AuthenticationContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src = {logo} alt="logo" />
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {isAuthenticated===null || !isAuthenticated?            <li>
            <NavLink to="/signup">Sign up</NavLink>
            </li>:   <Popup trigger={<button className='logout-btn'>Log out</button>} position="bottom center">
    <div>Are you sure you want to log out?   <button onClick={()=>{ 
      setIsAuthenticated(false)
    }}>Yes</button></div>
  </Popup>}

            {isAuthenticated=== null || !isAuthenticated? <li>
              <NavLink to="/login">Log in</NavLink>
            </li> : ""}
            {/* <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar