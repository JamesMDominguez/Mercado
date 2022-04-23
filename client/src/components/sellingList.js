import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SellingList = () => {
    const [records, setRecords] = useState([]);
    const { user,isAuthenticated } = useAuth0();

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


      function recordsList() {
        return records.map((listing) => {
        if(isAuthenticated){
        if(user.email === listing.user){
            return (
                <div style={{"width":"24%","marginRight":"10px"}}>
                <img src={listing.imgURL} style={{"width":"100%","borderRadius":"10px"}}/>
                <p>{listing.price}</p>
                <p>{listing.title}</p>
                <p>{listing.location}</p>
              </div>
            )
        }}})
    }

  return( 
  <>
    <h3>Selling</h3>
    <div style={{"display":"flex"}}>
        {recordsList()}
    </div>
  </>
  )
};

export default SellingList;