import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";

const SellingList = () => {
    const [records, setRecords] = useState([]);
    const { user,isAuthenticated } = useAuth0();
    const navigate = useNavigate();

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

    



    const ListingForm = (props) =>{
        return(
     <>
        <p>{props.listing.title}</p>
        <p>{props.listing.location}</p>
        <p>{props.listing.price}</p>
       <div className="form-group">
         <button className="btn btn-outline-dark" style={{"marginLeft":"10px"}} onClick={()=>navigate(`/edit/${props.listing._id}`)}>Edit</button>
         <button className="btn btn-outline-dark" style={{"marginLeft":"10px"}}>Delete</button>
       </div>
     </>
        )
      }

    function recordFrom(listing){
 
        return <ListingForm listing={listing}/>
      
    }
    function recordsList() {
        return records.map((listing) => {
        if(isAuthenticated){
        if(user.email === listing.user){
            return (
                <div style={{"width":"50%","display":"flex"}}>
                <img src={listing.imgURL} style={{"width":"50%","marginRight":"10px","marginBottom":"10px","borderRadius":"10px"}}/>
                <div>
                {recordFrom(listing)}
                </div>
              </div>
            )
        }}})
    }

  return( 
  <>
    <div style={{"display":"flex"}}>
    <h3>Selling</h3>
    </div>
    <div>
        {recordsList()}
    </div>
  </>
  )
};

export default SellingList;