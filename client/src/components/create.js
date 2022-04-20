import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css"
export default function Create() {
 const navigate = useNavigate();
 const { user,isAuthenticated } = useAuth0();
 const [form, setForm] = useState({
    imgURL: "",
    title: "",
    price: "",
    description: "",
    catagory: "",
    condition: "",
    location: "",
    user:isAuthenticated?user.email:"",
    });
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }


 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch(`${process.env.REACT_APP_SERVER_URL}/record/add`, {
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
 
   setForm({
    imgURL: "",
    title: "",
    price: "",
    description: "",
    catagory: "",
    condition: "",
    location: "",
    user:isAuthenticated?user.email:"",
    });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <>
    <aside class="sidebar">
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <input
           type="text"
           className="form-control"
           placeholder="Image Url"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           id="name"
           value={form.imgURL}
           onChange={(e) => updateForm({ imgURL: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           className="form-control"
           placeholder="Title"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           id="name"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           placeholder="Price"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           className="form-control"
           id="position"
           value={form.price}
           onChange={(e) => updateForm({ price: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="text"
           placeholder="Description"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           className="form-control"
           id="position"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>

       <div className="form-group">
         <input
           type="text"
           placeholder="Catagory"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           className="form-control"
           id="position"
           value={form.catagory}
           onChange={(e) => updateForm({ catagory: e.target.value })}
         />
       </div>

       <div className="form-group">
         <input
           type="text"
           placeholder="Condition"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           className="form-control"
           id="position"
           value={form.condition}
           onChange={(e) => updateForm({ condition: e.target.value })}
         />
       </div>

       <div className="form-group">
         <input
           type="text"
           placeholder="Location"
           style={{"width":"90%","margin":"5%","borderRadius":"15px"}}
           className="form-control"
           id="position"
           value={form.location}
           onChange={(e) => updateForm({ location: e.target.value })}
         />
       </div>

         <input
           type="submit"
           value="Create Listing"
           class="btn btn-outline-dark"
           style={{"width":"90%","marginLeft":"5%","borderRadius":"15px"}}
         />
     </form>
     </aside>
     <div style={{"marginLeft":"27%","backgroundColor":"#e0dfde","marginTop":"7%","marginRight":"2%","borderRadius":"10px","padding":"10px"}}>
     <h3>Preview</h3>
     <div style={{"display":"flex"}}>
     <img src={form.imgURL!=""?form.imgURL:"https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"} style={{"width":"45%","borderRadius":"10px"}}/>
      <div style={{"marginLeft":"10px"}}>
        <h3>{form.title!=""?form.title:"Title"}</h3>
        <p>{form.price!=""?form.price:"Price"}</p>
        <p>{form.description!=""?form.description:"Description"}</p>
        <p>{form.catagory!=""?form.catagory:"Catagory"}</p>
        <p>{form.location!=""?form.location:"Location"}</p>
      </div>
     </div>

     </div>
   </>
 );
}