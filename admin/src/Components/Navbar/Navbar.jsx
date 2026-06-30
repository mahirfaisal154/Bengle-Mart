import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="navbar">
      <p className="nav-logo-text">Bengle Mart</p>
      <img src={navProfile} className="nav-profile" alt="Profile" />
    </div>
  )
}

export default Navbar
