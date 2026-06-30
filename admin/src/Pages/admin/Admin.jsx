import React from 'react'
import './admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Addproduct from '../../Components/AddProduct/Addproduct'
import SeeOrders from '../../Components/SeeOrders/SeeOrders'
import {Routes,Route} from 'react-router-dom'
const Admin = () => {
  return (
    <div className="admin">
       <Sidebar/>
       <Routes>
         <Route path="/add-product" element={<Addproduct/>} />
         <Route path="/list-products" element={<ListProduct/>} />
         <Route path="/see-orders" element={<SeeOrders/>} />
       </Routes>
    </div>
  )
}

export default Admin
