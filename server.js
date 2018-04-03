// import your node modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
server.use(bodyParser.json());
server.use(cors());
// server.use(bodyParser.urlencoded({ extended: false }));

const db = require("./data/db.js");

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The posts' information could not be retrieved."
      });
    });
});

server.get("/api/posts/:id", (req, res) => {
  db
    .findById(req.params.id)
    .then(posts => {
      if (posts.length < 1) {
        res.status(404).json({ error: "That post doesn't exist." });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

server.post("/api/posts/", (req, res) => {
  console.log(req);
  if (!req.body)
    return res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for post" });
  db
    .insert(req.body)
    .then(post => {
      res.status(201).json(req.body);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the post to the database."
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  db
    .remove(req.params.id)
    .then(posts => {
      if (posts < 1) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.json(posts);
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The post could not be removed."
      });
    });
});

server.put("/api/posts/:id", (req, res) => {
  if (!req.body) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db
    .update(req.params.id, req.body)
    .then(posts => {
      if (posts > 0) {
        res.status(200).json(req.body);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

// add your server code starting here
const port = 5000;

server.listen(port, () => {
  console.log("API Running");
});
