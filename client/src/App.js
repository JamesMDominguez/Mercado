import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Listing from "./components/listing";
import Create from "./components/create";
import { Auth0Provider } from "@auth0/auth0-react";

 
const App = () => {
 return (
    <Auth0Provider
    domain="dev-x8a3sk5w.us.auth0.com"
    clientId="ew3tglzDXbF8eaQH1UyyVl7R5CstPR1s"
    redirectUri={window.location.origin}>
   <div>
     <Navbar/>
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/listing/:id" element={<Listing />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
   </Auth0Provider>
 );
};
 
export default App;