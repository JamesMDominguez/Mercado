import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import LoginButton from "./login.js"
import "bootstrap/dist/css/bootstrap.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const navigate = useNavigate();
    const { user,isAuthenticated } = useAuth0();

 return (
        <div class="image" style={{"display":"flex","justifyContent":"space-between", "padding":"10px","backgroundColor":"rgb(224, 223, 222)","borderStyle":"solid","position":"fixed","width":"100%","top":"0"}}>
        <img style={{"height":"40px","marginLeft":"5px"}} src="https://i.ibb.co/qYw0YzG/Screen-Shot-2022-04-16-at-1-30-23-PM-removebg-preview.png" onClick={()=>navigate("/")}/>
        <div id="container">
        <LoginButton/>
        <img src="https://www.freeiconspng.com/thumbs/shopping-basket-icon/grocery-basket-icon-3.png" onClick={()=>navigate("/")}/>
       <button class="btn btn-outline-dark" onClick={()=>{
           if(isAuthenticated){
            navigate("/create")
           }else{
               alert("Login to post listing")
           }
           }}>List Item</button>
        </div>
       </div>
 );
}

