import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./style.css"
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "./cart";

export default function RecordList() {
 const [records, setRecords] = useState([]);
 const navigate = useNavigate();
 const { user,isAuthenticated } = useAuth0();
 const [cart, setCart] = useState([]);
 const [selected, setSelected] = useState("Browse all");

 const Record = (props) => (
    <div style={{"width":"24%","marginRight":"10px"}} onClick={()=>navigate(`/listing/${props.record._id}`)}>
      <img src={props.record.imgURL} style={{"width":"100%","borderRadius":"10px"}}/>
      <h5 style={{"margin":"0px"}}>{props.record.price}</h5>
      <p style={{"margin":"0px"}}>{props.record.title}</p>
      <p style={{"margin":"0px"}}>{props.record.location}</p>
    </div>
   )

 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`${process.env.REACT_APP_SERVER_URL}record/`);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
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
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         key={record._id}
       />
     );
   });
 }

 function cartList() {
    return cart.map((listing) => {
    if(isAuthenticated){
    if(user.nickname === listing.cartUser){
        return (
            <Cart
            record={listing}
            key={listing._id}
          />
          );
    }
}
    });
  }
 
  function sellingList() {
    return records.map((record) => {
    if(isAuthenticated){
    if(user.email === record.user){
        return (
            <Record
            record={record}
            key={record._id}
          />
          )
     }}})}
 // This following section will display the table with the records of individuals.
 return (
   <>
   <aside className="sidebar">
   <input type="text" className="form-control" placeholder="🔍 Sreach Mercado" style={{"width":"90%","margin":"5%","borderRadius":"15px"}}/>
   <div className="sidebarItem">
       <div onClick={()=>setSelected("Browse all")}>
       <h4>Browse all</h4>
       </div>
       <div onClick={()=>setSelected("Cart")}> 
       <h4>Cart</h4>
       </div>
       <div onClick={()=>setSelected("Notifications")}>
       <h4>Notifications</h4>
       </div>
       <div onClick={()=>setSelected("Inbox")}>
       <h4>Inbox</h4>
       </div>
       <div onClick={()=>setSelected("Buying")}>
        <h4>Buying</h4>
       </div>
       <div onClick={()=>setSelected("Selling")}>
       <h4>Selling</h4>
       </div>
       <button className="btn btn-outline-dark" style={{"width":"100%"}} onClick={()=>{
           if(isAuthenticated){
            navigate("/create")
           }else{
               alert("Login to post listing")
           }
           }}>+ Create new listing</button>
   </div>
   </aside>

   <div style={{"marginLeft":"27%","marginTop":"6.5%","marginRight":"2%"}}>
    <h3 style={{ "display":selected==="Browse all"?"flex":"none","flexWrap":"wrap"}}>Today's picks</h3>
    <div className="listings" style={{"flexWrap":"wrap", "display":selected==="Browse all"?"flex":"none"}}>{recordList()}</div>

    <h3 style={{ "display":selected==="Cart"?"flex":"none","flexWrap":"wrap"}}>Cart</h3>
   <div className="listings" style={{ "display":selected==="Cart"?"flex":"none","flexWrap":"wrap"}}>{cartList()}</div>

    <h3 style={{ "display":selected==="Selling"?"flex":"none","flexWrap":"wrap"}}>Selling</h3>
    <div className="listings" style={{"flexWrap":"wrap", "display":selected==="Selling"?"flex":"none"}}>{sellingList()}</div>
   </div>
   </>
 );
}