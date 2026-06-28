import React from 'react'
import './admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Addproduct from '../../Components/AddProduct/Addproduct'
 import {Routes,Route} from 'react-router-dom'
const Admin = () => {
  return (
    <div className="admin">
       <Sidebar/>
       <Routes>
         <Route path="/add-product" element={<Addproduct/>} />
         <Route path="/list-products" element={<ListProduct/>} />
       </Routes>
    </div>
  )
}

export default Admin
