// import your node modules
const express = require("express");
const bodyParser = require("body-parser");

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const db = require("./data/db.js");

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/api/posts/:id", (req, res) => {
  db
    .findById(req.params.id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res.status(500).json(error);
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

// add your server code starting here
const port = 5000;

server.listen(port, () => {
  console.log("API Running");
});
