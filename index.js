// import your node modules
// import db from './data/db.js';
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(400).json(posts);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get("/api/posts/:postsid", (req, res) => {
  const id = req.params.postsid;

  db.findById(id)
    .then(posts => {
      if (posts) {
        res.status(201).json(posts);
      } else {
        res.status(400).json({ message: "The post information could not be retrieved." });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.listen(5000, () => console.log("server running"));
