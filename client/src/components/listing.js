import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Listing() {

 const params = useParams();
 const navigate = useNavigate();
 const [record, setRecord] = useState({});
 const { user,isAuthenticated } = useAuth0();
 const [message, setMessage] = useState({
    user1: user.email,
    user2: "",
    message: "",
    listing: {},
 });

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${process.env.REACT_APP_SERVER_URL}record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
     setRecord(record);

   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);

 
 async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...record };
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
  }
 
  async function onSubmitMessage(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.  
    await fetch(`${process.env.REACT_APP_SERVER_URL}message/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    navigate("/");
  }

 // This following section will display the form that takes input from the user to update the data.
 return (
     <div style={{"marginTop":"80px"}}>
     <button className="btn btn-outline-dark" style={{"margin":"10px"}} onClick={(e)=>navigate("/")}>Back</button>
     <div style={{"display":"flex"}}>
         <img src={record.imgURL} style={{"width":"75%","borderRadius":"10px","marginLeft":"10px"}}/>
          <div style={{"marginLeft":"20px"}}>
            <h3>{record.title}</h3>
            <p>{record.price}</p>
            <p>{record.description}</p>
            <p>{record.catagory}</p>
            <p>{record.location}</p>
        <div style={{"display":"flex"}}>
        <button className="btn btn-outline-dark" style={{"marginRight":"10px"}} onClick={(e)=>{ onSubmit(e); navigate("/")}}>Add to cart</button>
        <button className="btn btn-outline-dark" onClick={(e)=>{
            message.listing = record;
            message.user2 = record.user;
            onSubmitMessage(e)
            }}>Message</button>
        </div>
          </div>
         </div>
    </div>
 );
}