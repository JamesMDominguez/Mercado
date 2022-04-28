import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
import MessageBox from "./messageBox";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [message, setMessage] = useState({
    user1: user.email,
    user2: "",
    message: "",
    listing: {},
  });
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState("none");

  useEffect(() => {
    async function getCart() {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}cart?cartUser=${user.nickname}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const cart = await response.json();
      setCart(cart);
    }
    getCart();
    return;
  }, [cart.length]);

  async function deleteRecord(id) {
    await fetch(`${process.env.REACT_APP_SERVER_URL}cart/${id}`, {
      method: "DELETE",
    });
    const newCart = cart.filter((el) => el._id !== id);
    setCart(newCart);
  }

  function overlayComponent(record) {
    if (overlay === "block") {
      return (
        <div id="overlay" onClick={() => setOverlay("none")}>
          <MessageBox listing={record} />
        </div>
      );
    }
  }

  function cartList() {
    return cart.map((listing) => {
      return (
        <div
          style={{ width: "50%", marginRight: "10px", display: "flex" }}
          key={listing._id}
        >
          <img
            src={listing.imgURL}
            style={{ width: "50%", borderRadius: "10px", marginBottom: "10px" }}
          />
          <div style={{ marginLeft: "10px" }}>
            <p>{listing.price}</p>
            <p>{listing.title}</p>
            <p>{listing.location}</p>
            <button
              className="btn btn-outline-dark"
              style={{ marginRight: "10px" }}
              onClick={() => {
                if (window.confirm("Check")) {
                  deleteRecord(listing._id);
                }
              }}
            >
              Remove
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={(e) => {
                setOverlay("block");
              }}
            >
              Message
            </button>
          </div>
          {overlayComponent(listing)}
        </div>
      );
    });
  }
  return (
    <>
      <h3>Cart</h3>
      {cartList()}
    </>
  );
};

export default Cart;
