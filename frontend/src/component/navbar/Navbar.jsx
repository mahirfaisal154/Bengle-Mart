import React, { useState ,useContext} from 'react'
import "./navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from  "../Assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
const Navbar = () => {
    const [menu,setMenu]=useState("Shop");
    const {getTotalCartItems} = useContext(ShopContext);

    return (
    <div className="navbar" >
        <div className="nav-logo">
            <img src={logo} alt="Logo" />
            <p>Bangla Commerce</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>setMenu("Shop")}><Link style={{ textDecoration: 'none' }} to="/">Shop</Link>{menu==="Shop"? <hr/> : <></>}</li>
            <li onClick={()=>setMenu("Men")}><Link style={{ textDecoration: 'none' }} to="/mens">Men</Link>{menu==="Men"? <hr/> : <></>}</li>
            <li onClick={()=>setMenu("Women")}><Link style={{ textDecoration: 'none' }} to="/womens">Women</Link>{menu==="Women"? <hr/> : <></>}</li>
            <li onClick={()=>setMenu("Kids")}><Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>{menu==="Kids"? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to="/login"><button>Login</button></Link>
            <Link to="/cart" className="nav-cart">
                <img src={cart_icon} alt="" />
                <div className="nav-cart-count">
                    {getTotalCartItems()}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
