import { useState, useEffect } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);
    const fetchinfo=async ()=>{
      await fetch(`${BACKEND_URL}/allproducts`)
        .then(response => response.json())
        .then(data => setAllProducts(data.products))
    }

     useEffect(() => {
      fetchinfo();
    }, []);

    const removeProduct = async (id) => {
      await fetch(`${BACKEND_URL}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
     await fetchinfo();
    }



  return (
    <div className="list-product">
            <h1>All product list</h1>
              <div className="listproduct-format-main">
              <p>Products</p>
                <p>TITLE</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p className="lp-category">Category</p>
                <p>Remove</p>

     </div>
       <div className="listproduct-allproducts">
        <hr/>
         {allproducts.map((product,index) => (
         <div key={index} className="listproduct-format-main  listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p className="lp-category">{product.category}</p>
            <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Remove" />
          </div>
        ))}
       </div>
    </div>
  )
}

export default ListProduct
