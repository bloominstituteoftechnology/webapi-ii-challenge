const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data/db.js");

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/", function(req, res) {
  res.send({ api: "Running...." });
});
// add your server code starting here

server.get("/api/posts", function(req, res) {
  db
    .find()
    .then(posts => {
      res.send(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", function(req, res) {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      res.send(posts[0]);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.post("/api/posts", function(req, res) {
  const post = {
    title: req.body.title,
    contents: req.body.contents
  };
  db
    .insert(post)
    .then(posts => {
      res.send(posts);
    })
    .catch(error => {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    });
});

const port = 5000;
server.listen(port, () => console.log("API Running on port 5000"));
