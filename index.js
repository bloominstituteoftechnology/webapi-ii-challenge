// import your node modules

const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());

const db = require("./data/db.js");

// add your server code starting here

// GET Request for all posts

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        error: err
      });
    });
});

// GET request for specific post

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(400)
          .json({ message: "The  post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved.",
        error: err
      });
    });
});

server.listen(3002, () => console.log("Server Here"));
