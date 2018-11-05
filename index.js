// import your node modules

const express = require("express");
const server = express();

const db = require("./data/db.js");

// add your server code starting here

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

server.listen(3002, () => console.log("Server Here"));
