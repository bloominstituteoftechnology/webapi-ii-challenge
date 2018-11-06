// import your node modules
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.use(express.json());
server.use(cors());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    db.insert(req.body)
      .then(postId => {
        db.findById(postId.id).then(post => res.status(201).json(post));
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
});

server.put("/api/posts/:id", (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    db.update(req.params.id, req.body)
      .then(count => {
        count
          ? db.findById(req.params.id).then(post => res.send(200).json(post))
          : res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      count
        ? res.status(204)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
