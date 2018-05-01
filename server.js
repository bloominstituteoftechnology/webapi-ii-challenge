// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();

// add your server code starting here

server.get("/", (req, res) => {
  res.send("API is running");
});

// GET posts; find()
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "Can't get posts!" });
    });
});

// GET posts by ID; findById()
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(post => {
      res.json(post[0]); // ??? [id] ???
    })
    .catch(error => {
      res.status(404).json({
        error: "Unable to find specified post."
      });
    });
});

// POST; insert()
server.post("/api/posts", (req, res) => {
  const post = req.body;
  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "Error adding new post."
      });
    });
});
