import React from "react";


const Cart = (props) => (
    <div style={{"width":"24%","marginRight":"10px"}}>
      <img src={props.record.imgURL} style={{"width":"100%","borderRadius":"10px"}}/>
      <p style={{"margin":"0px"}}>{props.record.price}</p>
      <p style={{"margin":"0px"}}>{props.record.title}</p>
      <p style={{"margin":"0px"}}>{props.record.location}</p>
    </div>
   )

export default Cart;