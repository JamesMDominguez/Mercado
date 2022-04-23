import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./style.css"
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "./cart";
import SellingList from "./sellingList";

export default function RecordList() {
 const [records, setRecords] = useState([]);
 const navigate = useNavigate();
 const { user,isAuthenticated } = useAuth0();
 const [selected, setSelected] = useState("Browse all");
 const [listing, setListing] = useState({});
 const Record = (props) => (
    <div style={{"width":"24%","marginRight":"10px"}} onClick={()=>{
        setSelected("Listing")
        setListing(props.record)
        }}>
      <img src={props.record.imgURL} style={{"width":"100%","borderRadius":"10px"}}/>
      <h5 style={{"margin":"0px"}}>{props.record.price}</h5>
      <p style={{"margin":"0px"}}>{props.record.title}</p>
      <p style={{"margin":"0px"}}>{props.record.location}</p>
    </div>
   )

   const ListingComponent = (props) => (
    <>
     <div style={{"display":"flex"}}>
     <img src={props.listing.imgURL} style={{"width":"45%","borderRadius":"10px"}}/>
      <div style={{"marginLeft":"20px"}}>
        <h3>{props.listing.title}</h3>
        <p>{props.listing.price}</p>
        <p>{props.listing.description}</p>
        <p>{props.listing.catagory}</p>
        <p>{props.listing.location}</p>
     <button className="btn btn-outline-dark" onClick={(e)=>{setSelected("Browse all");  onSubmit(e)}}>Add to cart</button>
      </div>
     </div>
    </>
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

     async function onSubmit(e) {
        e.preventDefault();
      
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...listing };
        newPerson.cartUser = user.nickname;
        await fetch(`${process.env.REACT_APP_SERVER_URL}cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        setListing("Browse all")
      }
      
      function displayComponents(){
          if(selected === "Cart"){
           return <Cart/>
          }
          if(selected === "Listing"){
            return <ListingComponent listing={listing}/>
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
   <div className="listings">{displayComponents()}</div>
   <div className="listings" style={{"flexWrap":"wrap", "display":selected==="Selling"?"flex":"none"}}>{sellingList()}</div>
   </div>
   </>
 );
}