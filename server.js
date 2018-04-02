const express = require("express");

const db = require("./data/db.js");

const server = express();

server.post("/api/posts", (req, res) => {
  db
    .insert(posts)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 3000;
server.listen(port, () => console.log("API Running on port 3000"));
