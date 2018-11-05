const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const server = express();
server.use(cors());
server.listen(9000, () => console.log("Listening on port 9000."));

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Can't get posts", err: err });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "404 not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Can't get post", err: err });
    });
});
