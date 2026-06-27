import { createContext } from  "react"
import { useState } from "react";
import all_product from "../component/Assets/all_product";
export const ShopContext=createContext(null);
 const getDefaultcart=()=>{
         let cart= {};
         for(let i=0; i<all_product.length; i++){
              cart[all_product[i].id]=0;

         }
         return cart;
    }
const ShopContextProvider=(props)=>{


    const [cartItems, setCartItems] = useState(getDefaultcart());
   const addToCart=(itemID)=>{
    setCartItems((prev)=>({...prev, [itemID]: prev[itemID] + 1}))
   }
   
   
   const removeFromCart=(itemID)=>{
    setCartItems((prev)=>({...prev, [itemID]: prev[itemID] - 1}))
   }
  
   const getTotalCartAmount=()=>{
     let totalAmount=0;
     for(let i=0; i<all_product.length; i++){
       const item = all_product[i];
       if(cartItems[item.id] > 0){
         totalAmount += item.new_price * cartItems[item.id];
       }
     }
     return totalAmount;
   }

    const getTotalCartItems=()=>{
     let totalItem=0;
     for(const item in cartItems){
       if(cartItems[item] > 0){
         totalItem += cartItems[item];
       }
     }
     return totalItem;
   }

   const contextValue={all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
   <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
    )


}
export default ShopContextProvider;