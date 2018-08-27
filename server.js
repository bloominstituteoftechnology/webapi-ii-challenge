// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("i suck at coding");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "you suck" });
    });
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "yousuck" });
    });
});

server.listen(4000, () => console.log("/n= API on port 4000 =/n"));
