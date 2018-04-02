const express = require("express");

const db = require("./data/db.js");

const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser());

server.post("/api/posts", (req, res) => {
    const { title, content } = req.body;
    if (!title || !contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db
    .insert(posts);
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

server.delete("/api/posts/:id", (req, res) => {
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

  server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
  
    db
      .findById(id)
      .then(posts => {
        res.json(posts);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

const port = 3000;
server.listen(port, () => console.log("API Running on port 3000"));
