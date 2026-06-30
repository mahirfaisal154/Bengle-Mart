import React from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../component/Assets/dropdown_icon.png'
import Item from '../component/items/Item'
const ShopCategory = (props) => {
    const {allproducts} = React.useContext(ShopContext);

  return (
    <div className="shop-category">
      <img src={props.banner} alt={props.category} />
      <div className="shopcategory-indexsort">
        <p>
  <span>
    Showing 1-12
  </span> out of 36 products
   </p>
   <div className="shopcategory-sort">
    Sort by <img src={dropdown_icon} alt="Sort" />
   </div>
      </div>
<div className="shopcategory_products">
  {allproducts.map((item,index) => {
    if(props.category.toLowerCase() === item.category.toLowerCase()) {
      return (
        <Item
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
        />
      );
    }
    else {
      return null;
    }
    return null;
  })}
</div>
    </div>
  )
}

export default ShopCategory
