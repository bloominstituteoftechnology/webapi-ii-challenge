// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

// add your server code starting here
const server = express();
const port = 8000;

server.listen(port, () => {
  console.log("API running");
});
server.get("/", (req, res) => {
  res.send("Hello Posts!");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res.json({ error: "The posts information could not be retrieved" })
    );
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist" });
      }
      res.status(200).json(post);
    })
    .catch(err =>
      res.json({ error: "The post information could not be retrieved" })
    );
});
