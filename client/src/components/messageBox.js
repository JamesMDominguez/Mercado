import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const MessageBox = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [message, setMessage] = useState({
    user1: user.email,
    user2: props.listing.user,
    message: "",
    listing: props.listing,
  });

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
    navigate("/messages");
  }
  return (
      <div
        id="text"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
          style={{ borderRadius: "15px", marginTop: "10px" }}
          onClick={(e) => {
            message.message = newMessage;
            onSubmitMessage(e);
          }}
        >
          Send
        </button>
      </div>
  );
};

export default MessageBox;
