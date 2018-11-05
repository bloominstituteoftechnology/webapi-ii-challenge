// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
// add your server code starting here

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Sorry!" });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id).then(post => {
    res.status(200).json(post);
  });
});

server.listen(9000);
