import { createContext, useEffect } from  "react"
import { useState } from "react";
import all_product from "../component/Assets/all_product";
export const ShopContext=createContext(null);
 const getCookie=(name)=>{
   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
   return match ? match[2] : null;
 }
const ShopContextProvider=(props)=>{

  const [allproducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(()=>{
      fetch('http://localhost:4000/allproducts')
        .then(response => response.json())
        .then(data => setAllProducts(data.products));
    }, []);

    useEffect(()=>{
      const token = getCookie('auth-token');
      if (token) {
        fetch('http://localhost:4000/getcart', {
          headers: { 'auth-token': token }
        })
          .then(response => response.json())
          .then(data => {
            console.log('getcart response:', data);
            if (data.success) {
              setCartItems(data.cartData);
            }
          })
          .catch(err => console.error('getcart request failed:', err));
      } else {
        console.log('getcart: no auth-token cookie found, skipping');
      }
    }, []);

   const addToCart=(itemID)=>{
    setCartItems((prev)=>({...prev, [itemID]: (prev[itemID] || 0) + 1}));
    if(getCookie('auth-token')){
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
             'Accept':'application/form-data',
             'auth-token': getCookie('auth-token'),
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemID": itemID }),
      }).then(response => response.json())
        .then(data => {
          console.log('addtocart response:', data);
        })
        .catch(err => console.error('addtocart request failed:', err));
    } else {
      console.log('addToCart: no auth-token cookie found, skipping backend sync');
    }
   }
   
   
   const removeFromCart=(itemID)=>{
    setCartItems((prev)=>({...prev, [itemID]: prev[itemID] - 1}))
    if(getCookie('auth-token')){
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
             'Accept':'application/form-data',
             'auth-token': getCookie('auth-token'),
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemID": itemID }),
      }).then(response => response.json())
        .then(data => {
          console.log('removefromcart response:', data);
        })
        .catch(err => console.error('removefromcart request failed:', err));
    } else {
      console.log('removeFromCart: no auth-token cookie found, skipping backend sync');
    }
   }
  
   const getTotalCartAmount=()=>{
     let totalAmount=0;
     for(let i=0; i<allproducts.length; i++){
       const item = allproducts[i];
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

   const contextValue={all_product, allproducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
   <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
    )


}
export default ShopContextProvider;







