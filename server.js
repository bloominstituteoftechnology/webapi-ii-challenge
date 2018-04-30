// import your node modules
const express = require("express");

const server = express();
const bodyParser = require("body-parser");
const db = require("./data/db.js");

server.use(bodyParser.json());
// add your server code starting here
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//duplicate check missing
server.post("/api/posts", (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db
    .insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        db.remove(id).then(res.status(200).json(post));
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const newPost = req.body;
  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!newPost.title || !newPost.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        db.update(id, newPost).then(res.status(200).json(newPost));
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

server.listen(5000, () => console.log("\n== API running on port 5000 ==\n"));
