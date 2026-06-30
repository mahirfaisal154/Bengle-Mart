import React, { useState ,useContext, useEffect} from 'react'
import "./navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from  "../Assets/cart_icon.png"
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

const Navbar = () => {
    const [menu,setMenu]=useState("Shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('auth-token'));

    useEffect(() => {
        setIsLoggedIn(!!getCookie('auth-token'));
    }, [location]);

    const logout = () => {
        document.cookie = 'auth-token=; path=/; max-age=0';
        window.location.replace('/');
    };

    return (
    <div className="navbar" >
        <Link to="/" className="nav-logo" onClick={()=>setMenu("Shop")}>
            <img src={logo} alt="Logo" />
            <p>Bangla Commerce</p>
        </Link>
        <ul className="nav-menu">
            <li onClick={()=>setMenu("Shop")}><Link to="/">Shop</Link>{menu==="Shop"? <hr/> : <></>}</li>
            <li onClick={()=>setMenu("Men")}><Link to="/mens">Men</Link>{menu==="Men"? <hr/> : <></>}</li>
            <li onClick={()=>setMenu("Women")}><Link to="/womens">Women</Link>{menu==="Women"? <hr/> : <></>}</li>
            <li onClick={()=>setMenu("Kids")}><Link to="/kids">Kids</Link>{menu==="Kids"? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
           {isLoggedIn? <button onClick={logout}>Logout</button> :
           <Link to='/login'><button>Login</button></Link>
        }

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
