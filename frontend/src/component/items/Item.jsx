import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'
const Item = (Props) => {
  return (
    <div className="item">
      <Link to={`/product/${Props.id}`}>
            <img src={Props.image} alt={Props.name}  />

      </Link>
      <p>{Props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
   ${Props.new_price}
        </div>

         <div className="item-price-old">
        ${Props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
