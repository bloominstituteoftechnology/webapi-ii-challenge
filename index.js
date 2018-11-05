// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();

// add your server code starting here

//GET request for /api/posts

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "The posts information could not be retrieved." });
    });
});

//GET request posts by ID

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
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
        .json({ message: "The post information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("Server is listening on port 8000"));
