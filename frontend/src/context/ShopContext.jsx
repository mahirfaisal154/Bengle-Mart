import { createContext } from  "react"
import { useState } from "react";
import all_product from "../component/Assets/all_product";
export const ShopContext=createContext(null);
 const getDefaultcart=()=>{
         let cart= {};
         for(let i=0; i<all_product.length; i++){
              cart[i]=0;

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
       if(cartItems[i] > 0){
         totalAmount += all_product[i].new_price * cartItems[i];
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