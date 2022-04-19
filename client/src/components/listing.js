import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router";
import "./style.css"
import { useAuth0 } from "@auth0/auth0-react";

export default function RecordList() {
 const [record, setRecords] = useState([]);
 const navigate = useNavigate();
 const { user,isAuthenticated } = useAuth0();
 const params = useParams();

 // This method fetches the records from the database.
 useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
  
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
      record.cartUser = user.nickname
      setRecords(record);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
 

  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...record };
  
    await fetch("http://localhost:5000/cart/add", {
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
  
    setRecords({
     imgURL: "",
     title: "",
     price: "",
     description: "",
     catagory: "",
     condition: "",
     location: "",
     user:"",
     cartUser:"",
     });
    navigate("/");
  } 

 
 // This following section will display the table with the records of individuals.
 return (
   <>
   <aside class="sidebar">
   <input type="text" class="form-control" placeholder="🔍 Sreach Mercado" style={{"width":"90%","margin":"5%","borderRadius":"15px"}}/>
   <div class="sidebarItem">
       <h3>Browse all</h3>
       <h3>Cart</h3>
       <h3>Notifications</h3>
       <h3>Inbox</h3>
       <h3>Buying</h3>
       <h3>Selling</h3>
       <button class="btn btn-outline-dark" style={{"width":"100%"}} onClick={()=>{
           if(isAuthenticated){
            navigate("/create")
           }else{
               alert("Login to post listing")
           }
           }}>+ Create new listing</button>
   </div>
   </aside>

   <div style={{"marginLeft":"27%","backgroundColor":"#e0dfde","marginTop":"7%","marginRight":"2%","borderRadius":"10px","padding":"10px"}}>
    <div style={{"display":"flex","justifyContent":"space-between"}}>
     <h3>Preview</h3>
     <button className="btn btn-outline-dark" onClick={(e)=>{
         onSubmit(e)
         navigate("/")
         }}>Add to cart</button>
    </div>
     <div style={{"display":"flex"}}>
     <img src={record.imgURL!=""?record.imgURL:"https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"} style={{"width":"45%","borderRadius":"10px"}}/>
      <div style={{"marginLeft":"20px"}}>
        <h3>{record.title!=""?record.title:"Title"}</h3>
        <p>{record.price!=""?record.price:"Price"}</p>
        <p>{record.description!=""?record.description:"Description"}</p>
        <p>{record.catagory!=""?record.catagory:"Catagory"}</p>
        <p>{record.location!=""?record.location:"Location"}</p>
      </div>
     </div>

     </div>
   </>
 );
}