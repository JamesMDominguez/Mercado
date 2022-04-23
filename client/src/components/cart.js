import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const { user,isAuthenticated } = useAuth0();

    useEffect(() => {
        async function getCart() {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}cart/`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const cart = await response.json();
          setCart(cart);
    
        }
        getCart();
        return;
      }, [cart.length]);


      function cartList() {
        return cart.map((listing) => {
        if(isAuthenticated){
        if(user.nickname === listing.cartUser){
            return (
                <div style={{"width":"24%","marginRight":"10px"}}>
                <img src={listing.imgURL} style={{"width":"100%","borderRadius":"10px"}}/>
                <p>{listing.price}</p>
                <p>{listing.title}</p>
                <p>{listing.location}</p>
              </div>
              );
        }
    }
        });
    }
  return( 
  <>
    <h3>Cart</h3>
    <div style={{"display":"flex"}}>
    {cartList()}
    </div>
  </>
  )
};

export default Cart;