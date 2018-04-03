const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const db = require("./data/db.js");

const server = express();

server.use(morgan("dev")); //logger
server.use(helmet()); //security
server.use(bodyParser());

server.get("/", function(req, res) {
  res.json({ api: "Running..." });
});

server.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !contents) {
    return res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }

  db
    .insert(posts)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the posts to the database"
      });
    });
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
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
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let posts;

  db
    .findById(id)
    .then(response => {
      posts = { ...response[0] };

      db
        .remove(id)
        .then(response => {
          res.status(200).json(posts);
        })
        .catch(error => {
          res.status(500).json({ error: "The post could not be removed" });
        });
    })
    .catch(error => {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const { title, content } = req.body;
  if (!title || !contents) {
    return res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }


  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedPosts => {
          res.status(200).json(updatedPosts[0]);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
});

const port = 3000;
server.listen(port, () => console.log("API Running on port 3000"));
