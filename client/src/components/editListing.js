import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
    imgURL: "",
    title: "",
    price: "",
    description: "",
    catagory: "",
    condition: "",
    location: "",
    user: "",
    cartUser: "",
    });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${process.env.REACT_APP_SERVER_URL}record/${params.id.toString()}`);
 
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
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    imgURL: form.imgURL,
    title: form.title,
    price: form.price,
    description: form.description,
    catagory: form.catagory,
    condition: form.condition,
    location: form.location,
    user: form.user,
    cartUser: form.cartUser,
    };
 
   // This will send a post request to update the data in the database.
   await fetch(`${process.env.REACT_APP_SERVER_URL}update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <aside className="sidebar">
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
           value="Edit Listing"
           className="btn btn-outline-dark"
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
   </div>
 );
}