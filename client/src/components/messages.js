import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Messages() {
  const params = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [userList, setUserList] = useState([]);
  const { user } = useAuth0();
  const [selectedMessage, setSelectedMessage] = useState("");

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
  }, [records.length]);

  function showMessages() {
    return userList.map((record) => {
        let message = record.split(",")
    if(message[0]===user.email){
      return (
        <div key={record} onClick={() => setSelectedMessage(message[1])}>
          <p>{message[1]}</p>
        </div>
      );
    }else{
        return(
            <div key={record} onClick={() => setSelectedMessage(message[0])}>
            <p>{message[0]}</p>
          </div>
        )
    }
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
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Sreach Messages"
          style={{ width: "90%", margin: "5%", borderRadius: "15px" }}
        />
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
        <input
          type="text"
          className="form-control"
          placeholder="Message"
          style={{ width: "100%", borderRadius: "15px" }}
        />
      </div>
    </div>
  );
}
