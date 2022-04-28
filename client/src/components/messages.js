import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Messages() {
  const params = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}message/`);
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
  }, [records]);

function showMessages(){
    return records.map((record)=>{
        return <p key={record._id}>{record.user1}</p>
    })
}

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div style={{ marginTop: "80px" }}>
      <aside className="sidebar">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Sreach Messages"
          style={{ width: "90%", margin: "5%", borderRadius: "15px" }}
        />
        <div className="sidebarItem">
          <button
            className="btn btn-outline-dark"
            style={{ width: "100%" }}
            onClick={(e) => navigate("/")}
          >Back</button>
        </div>
        <div>
            {showMessages()}
        </div>
      </aside>
    </div>
  );
}
