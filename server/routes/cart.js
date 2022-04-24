const express = require("express");

// cartRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /cart.
const cartRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the carts.
cartRoutes.route("/cart").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("carts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single cart by id
cartRoutes.route("/cart/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("carts")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

  

// This section will help you create a new cart.
cartRoutes.route("/cart/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    imgURL: req.body.imgURL,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    catagory: req.body.catagory,
    condition: req.body.condition,
    location: req.body.location,
    user: req.body.user,
    cartUser: req.body.cartUser,
    };
  db_connect.collection("carts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a cart by id.
cartRoutes.route("/cart/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
    imgURL: req.body.imgURL,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    catagory: req.body.catagory,
    condition: req.body.condition,
    location: req.body.location,
    user: req.body.user,
    cartUser: req.body.cartUser,
    },
  };
  db_connect
    .collection("carts")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a cart
cartRoutes.route("/cart/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("carts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = cartRoutes;