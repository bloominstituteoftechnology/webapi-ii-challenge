// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here

const server = express();
server.get("/", (req, res) => {
  res.json({ hello: "testing" });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "failed", error: err });
    });
});
server.listen(9000, () => console.log("the server is alive"));
