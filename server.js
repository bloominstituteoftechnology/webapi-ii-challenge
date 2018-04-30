// import your node modules
const express = require('express');
const db = require('./data/db.js');
const bodyParser = require("body-parser");

const server = express();


// add your server code starting here
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Api running");
});

server.get("/api/posts", (req, res) => {
  //get the posts
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
      // do something with the error
    });
});

// /api/posts/123
server.get("/api/posts/:id", (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  db
    .findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: "post not found" });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      // do something with the error
      res.status(500).json({ error: err });
    });
});

server.post("/api/posts", (req, res) => {
  const post = req.body;

  if (post.title === "" || post.contents === "") {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db
      .insert(post)
      .then(response => {
        res.status(201).json({ post });
      })
      .throw(() => {
        res.status(500).send({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

let port = 8999;
server.listen(port, ()=> console.log('\n== API Running on port ' + port + ' =='));