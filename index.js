// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here

const server = express();
server.get("/", (req, res) => {
  res.json({ hello: "testing" });
});

// get
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "failed", error: err });
    });
});

// get by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user.length) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed", error: err });
    });
});

// server listen
server.listen(9000, () => console.log("the server is alive"));
