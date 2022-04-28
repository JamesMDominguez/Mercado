import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import EditListing from "./components/editListing";
import Create from "./components/create";
import Listing from "./components/listing";
import Messages from "./components/messages";
import { Auth0Provider } from "@auth0/auth0-react";

 
const App = () => {
 return (
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID} 
    redirectUri={window.location.origin}>
   <div>
     <Navbar/>
     <Routes>
       <Route exact path="/" element={<RecordList/>} />
       <Route path="/edit/:id" element={<EditListing/>} />
       <Route path="/create" element={<Create/>} />
       <Route path="/listing/:id" element={<Listing/>} />
       <Route path="/messages" element={<Messages/>} />
     </Routes>
   </div>
   </Auth0Provider>
 );
};
 
export default App;