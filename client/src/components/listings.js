import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const Listings = () => {
    const [records, setRecords] = useState([]);
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

const Thislisting = (props) => (
    <>
    <img src={props.listing.imgURL} style={{"width":"100%","borderRadius":"10px"}}/>
    <p>{props.listing.price}</p>
    <p>{props.listing.title}</p>
    <p>{props.listing.location}</p>
   </>
)

function recordsList() {
    return records.map((listing) => {
        return (
            <div style={{"width":"24%","marginRight":"10px"}} onClick={()=>navigate(`/listing/${listing._id}`)}>
                <Thislisting listing={listing}/>
            </div>
        )})
    }

    
  return( 
  <div>
    <h3>Today's picks</h3>
    {recordsList()}
  </div>
  )
};

export default Listings;