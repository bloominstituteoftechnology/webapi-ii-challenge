// import your node modules

const express = require("express");

const db = require("./data/db.js");

const server = express();

// add your server code starting here
server.get("/api/posts", (req, res) => {
  const post = req.params.posts;

  db.find(post)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The posts information could not be retrieved."
        });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

server.get("/api/posts/:postid", (req, res) => {
  const pid = req.params.postid;

  db.findById(pid)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json.apply(err));
});

server.listen(5000, () => console.log("server running"));
