import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Messages() {

 const params = useParams();
 const navigate = useNavigate();
 const [record, setRecord] = useState({});
 const { user,isAuthenticated } = useAuth0();

  
 // This following section will display the form that takes input from the user to update the data.
 return (
     <div style={{"marginTop":"80px"}}>
     <button className="btn btn-outline-dark" style={{"margin":"10px"}} onClick={(e)=>navigate("/")}>Back</button>
     <div style={{"display":"flex"}}>
        <div style={{"marginLeft":"20px"}}>
        <div style={{"display":"flex"}}>
        <button className="btn btn-outline-dark" onClick={(e)=>{ alert("feature unavailable")}}>Message</button>
        </div>
          </div>
         </div>
    </div>
 );
}