import React from 'react'
import './ProductDisplay.css'  
import stat_icon from "../Assets/star_icon.png"
import stat_dull_icon from "../Assets/star_dull_icon.png"
    

 const ProductDisplay = (props) => {
   const {product} = props;
    return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />

            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />

        </div>
        <div className="productdisplay-img">
       <img className="productdisplay-main-img" src={product.image} alt={product.name} />

        </div>
      </div>
    
    
    <div className="productdisplay-right">
    <h1>{product.name}</h1>
    <div className="productdisplay-right-star">
    <img src={stat_icon} alt="Star" />
    <img src={stat_icon} alt="Star" />
    <img src={stat_icon} alt="Star" />
    <img src={stat_icon} alt="Star" />
    <img src={stat_dull_icon} alt="Star" />
    <p>(122)</p>
    
    </div>
    

    </div>
    </div>
  )
}

export default ProductDisplay
