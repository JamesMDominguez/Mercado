import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Messages() {
  const params = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [userList, setUserList] = useState([]);
  const { user } = useAuth0();
  const [selectedMessage, setSelectedMessage] = useState("Select a message");
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState({
    user1: "",
    user2: "",
    message: "",
    listing: "",
  });

  useEffect(() => {
    async function getRecords() {
      let users = [];
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}message/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      records.forEach((record) => {
        if (record.user2 === user.email && !users.includes(record.user1+","+record.user2)) {
          users.push(record.user1+","+record.user2);
        }
        if(record.user1 === user.email && !users.includes(record.user2+","+record.user1)){
          users.push(record.user2+","+record.user1);
        }
      });
      setUserList(users);
      setRecords(records);
    }
    getRecords();
    return;
  }, [records]);

  async function onSubmitMessage(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    await fetch(`${process.env.REACT_APP_SERVER_URL}message/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  function showMessages() {
    return userList.map((record) => {
        let message = record.split(",")
        return(
            <div key={record} onClick={() => setSelectedMessage(message[0])}>
            <p>{message[0]}</p>
          </div>
        )
    
    });
  }

  function showSelectedMessages() {
    return records.map((record) => {
      if (record.user1 === selectedMessage ||record.user2 === selectedMessage) {
        if (record.user1 === user.email || record.user2 === user.email) {
          return (
            <div style={{display: "flex",justifyContent:record.user1 === user.email ? "end":"start"}} className="messagesShown" key={record._id}>
              <p style={{backgroundColor:record.user1 === user.email ? "#3385FF":"#25A734",padding:"10px",borderRadius:"30px"}}>{record.message}</p>
            </div>
          );
        }
      }
    });
  }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div style={{ marginTop: "80px" }}>
      <aside className="sidebar">
        <h2 style={{marginLeft:"30px"}}>Messages</h2>
        <div className="sidebarItem">
          {showMessages()}
          <button
            className="btn btn-outline-dark"
            style={{ width: "100%" }}
            onClick={(e) => navigate("/")}
          >
            Back
          </button>
        </div>
      </aside>
      <div style={{ marginLeft: "27%", marginTop: "6.5%", marginRight: "2%" }}>
        <h1>{selectedMessage}</h1>
        {showSelectedMessages()}
        <div style={{display:"flex"}}>
        <textarea
          type="text"
          placeholder="Message"
          className="form-control"
          style={{ borderRadius: "15px" }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="btn btn-outline-dark"
          style={{ borderRadius: "15px", marginLeft: "10px" }}
          onClick={(e) => {
          if(selectedMessage === "Select a message"){
            alert("select message")
          }else{
              message.user1 = user.email;
              message.user2 = selectedMessage;
              message.message = newMessage;
              onSubmitMessage(e)
              setNewMessage("")
          }

          }}
        >
          Send
        </button>
        </div>
      </div>
    </div>
  );
}
