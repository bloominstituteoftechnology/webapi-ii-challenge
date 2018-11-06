// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");

// add your server code starting here

server.get("/", (req, res) => {
  res.status(200).send("sup");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error 500: Posts not found." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error 500: Post not found." });
    });
});

server.post("/api/posts/id", (req, res) => {
  const { id } = req.params;
});

// delete
server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Post not found!" });
    });
});

server.listen(9000, () => console.log("server be runnin: port 9000"));
