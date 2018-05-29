// import your node modules

const bodyParser = require("body-parser");
const express = require("express");
const db = require("./data/db");
const server = express();
const port = 5000;

server.use(bodyParser.json());

// add your server code starting here

server.get("/api/posts", (req, res) => {
  db
    .find()
    .than(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ errormsg: "This post could not be found" });
    });
});

server.get("/api/post/:id", (req, res) => {
  db
    .findById(id)
    .than(post => {
      if (post.length > 0) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({ msg: "No post found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The post with that specified ID does not exist." });
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
