import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from  '../Assets/cart_cross_icon.png'
const CartItems = () => {
    const {all_product,cartItems,removeFromCart,getTotalCartAmount,} = useContext(ShopContext);

    let totalAmount = 0;
    for (const item of all_product) {
        if (cartItems[item.id] > 0) {
            totalAmount += item.new_price * cartItems[item.id];
        }
    }

  return (
    <div className="cartitems">
          <div className="cartitems-format-main">
             <p>Products</p>
             <p>Title</p>
             <p>Price</p>
             <p>Quantity</p>
             <p>Total</p>
             <p>Remove</p>
         
        
          </div>
          <hr/>
           {all_product.map((e)=>{
            if(cartItems[e.id] > 0){
                return    <div>
             <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} className="carticon-product-icon"/>         
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="Remove Icon"/>
          </div>
          <hr/>
    </div>
            }
            return null;
           })}
           <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div>
                      <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                      </div>
                      <hr/>
                      <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                      </div>
                      <hr/>
                      <div className="cartitems-total-item">
                        <p>Total</p>
                        <p>${getTotalCartAmount()}</p>
                      </div>
                </div>
                <button>Proceed to Checkout</button>
            </div>
            <div className="cartritems-promocode">
                <p>Have a promo code?</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder="Enter promo code"/>
                    <button>Apply</button>
                </div>
            </div>
           </div>
    </div>
  )
}

export default CartItems
