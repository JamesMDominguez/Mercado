import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect,logout,isAuthenticated,user,isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if(!isAuthenticated){
    return <button className="btn btn-outline-dark" onClick={() => {
      loginWithRedirect() 
    }}>Log In</button>;
  }
  return( 
  <div>
  <img src={isAuthenticated?user.picture:""} alt={user.name} style={{"borderRadius":"50px","width":"40px","height":"40px","marginRight":"10px"}}/>
  <button className="btn btn-outline-dark" onClick={() =>{ logout({ returnTo: window.location.origin })}}> Log Out</button>
  </div>
  )
};

export default LoginButton;