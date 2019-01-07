// import your node modules
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data/db.js");

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my first API" });
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

server.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;

  db.findById(postId)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({
          error: "Cannot find a post with requested id"
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => res.status(500).json(error));
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ error: "Did not receive the required title or contents" });
  } else {
    db.insert({ title, contents })
      .then(postId => res.status(200).json(postId))
      .catch(error => res.status(500).json(error));
  }
});

server.listen(5000, () => console.log("Server is running on port: 5000"));
