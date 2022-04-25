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

      async function deleteRecord(id) {
        await fetch(`${process.env.REACT_APP_SERVER_URL}cart/${id}`, {
          method: "DELETE"
        });
      
        const newCart = cart.filter((el) => el._id !== id);
        setCart(newCart);
      }
      
      function cartList() {
        return cart.map((listing) => {
        if(isAuthenticated){
        if(user.nickname === listing.cartUser){
            return (
                <div style={{"width":"50%","marginRight":"10px","display":"flex"}}>
                <img src={listing.imgURL} style={{"width":"50%","borderRadius":"10px","marginBottom":"10px"}}/>

                <div style={{"marginLeft":"10px"}}>
                <p>{listing.price}</p>
                <p>{listing.title}</p>
                <p>{listing.location}</p>
                <button className="btn btn-outline-dark" style={{"marginRight":"10px"}} onClick={()=>deleteRecord(listing._id)}>Remove</button>
                <button className="btn btn-outline-dark" onClick={()=>alert("feature unavailable")}>Message</button>
                </div>
              </div>
              );
        }
    }
        });
    }
  return( 
  <>
    <h3>Cart</h3>
    {cartList()}
  </>
  )
};

export default Cart;