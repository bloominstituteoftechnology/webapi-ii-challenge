//Node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

//Server code
const server = express();

server.use(cors());
server.use(express.json());

//Get all posts
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err =>
      res.status(500).json({
        error: "The posts information could not be retrieved."
      })
    );
});

//Get post of a specific ID
server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.json(post);
      } else
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

//Create a new Post
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      })
    );
});

//Delete a post
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post => {
      if (post.length < 1) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The post could not be removed."
      })
    );
});

//Edit a post
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (post.length < 1) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  }
  if (!title || !contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
  db.update(id, newPost)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err =>
      res.status(500).json({
        error: "The post information could not be modified.."
      })
    );
});

//Port declaration
const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
