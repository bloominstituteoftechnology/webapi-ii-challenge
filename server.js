const express = require("express");

const server = express();
const db = require("./data/db.js");

server.get("/api/posts", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "sorry we failed you", err: err });
    });
});

server.post("/api/posts", (req, res) => {
  const post = { ...req.body };
  db.insert(post)
    .then(num_added => {
      res.status(200).json(num_added);
    })
    .catch(err => {
      res.status(500).json({ message: "sorry we failed you", err: err });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "sorry we failed you", err: err });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "sorry we failed you", err: err });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  db.update(id, body)
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).json({ message: "sorry we failed you", err: err });
    });
});

server.listen(8000, () => console.log("API RUNNING ON PORT 8000..."));
