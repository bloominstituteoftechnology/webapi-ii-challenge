// import your node modules
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

// add your server code starting here

// POST; insert(post)
server.post("/api/posts", (req, res) => {
  const post = req.body;
  if (!post) {
    res.status(400).json({
      errorMsg: "please provide the title and contents for the post!"
    });
  }
  db
    .insert(post)
    .then(response => {
      res.status(201).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the post!" });
    });
});

// GET; find()
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved!" });
    });
});

// GET; findById(id)
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  if (db.findById(id) === 0) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist!" });
  }
  db
    .findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

// DELETE; findById(id), remove(id)
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  if (db.findById(id) === 0) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exists!" });
  }
  db.findById(id).then(response => {
    db
      .remove(id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
      });
  });
});

// PUT; findById(id), update(id, post)
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (db.findById(id) === 0) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }
  if (!post) {
    res
      .status(400)
      .json({ errorMsg: "Please provide title and contents for the post!" });
  }
  db
    .update(id, post)
    .then(response => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified!" });
    });
});

const port = 5000;
server.listen(port, () => console.log("API Running on port 5000 capt'!"));
