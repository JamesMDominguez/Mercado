import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./style.css"
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "./cart";
import SellingList from "./sellingList";
import Listings from "./listings";

export default function RecordList() {
 const [records, setRecords] = useState([]);
 const navigate = useNavigate();
 const { user,isAuthenticated } = useAuth0();
 const [selected, setSelected] = useState("Browse all");


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

     
      
      function displayComponents(){
          if(selected === "Browse all"){
            return <Listings/>
          }
          if(selected === "Cart"){
           return <Cart/>
          }
          if(selected === "Selling"){
            return <SellingList/>
          }
      }
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
       <h4>Messages</h4>
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
   {displayComponents()}
   </div>
   </>
 );
}