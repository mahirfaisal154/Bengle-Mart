import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
const Sidebar = () => {
  return (
    <div className="sidebar">
         <Link to='/add-product'>
           <div className="sidebar-item">
            <img src={add_product_icon} alt="Add Product"/>
            <p>Add Product</p>
           </div>
         </Link>
         <Link to='/list-products'>
           <div className="sidebar-item">
            <img src={list_product_icon} alt="Product List"/>
            <p>Product List</p>
           </div>
         </Link>
         <Link to='/see-orders'>
           <div className="sidebar-item">
            <p>See Orders</p>
           </div>
         </Link>
    </div>
  )
}

export default Sidebar
