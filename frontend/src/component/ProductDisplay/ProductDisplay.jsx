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
       <div className="productdisplay-right-prices">
        <div className="productdisplay-right-price-old">
            ${product.old_price}
        </div>
        <div className="productdisplay-right-price-new">
            ${product.new_price}
        </div>
       </div>
       <div className="productdisplay-right-description">
        DESCRIPTIONNNNN.....must be written in future
       </div>
       <div className="productdisplay-right-size">
        <h1>
            Select Size
        </h1>
        <div className="productdisplay-right-sizes">
            <div className="size-option">XS</div>
            <div className="size-option">S</div>
            <div className="size-option">M</div>
            <div className="size-option">L</div>
            <div className="size-option">XL</div>
        </div>
       </div>
       <button>ADD TO CART</button>
       <p className='productdisplay-right-category'>
    <span>
        Category:
    </span>
    Women ,T-Shirt,Crop Top
       </p>
      <p className='productdisplay-right-category'>
    <span>
        Tags:
    </span>
    Mordern, Latest
       </p>

    </div>
    </div>
  )
}

export default ProductDisplay
