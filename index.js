// import your node modules

const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const server = express();

server.use(cors());

server.use(express.json());

// add your server code starting here

// GET posts
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log(posts);
      res.json(posts);
    })
    .catch(err => res.send(err));
});

// POST
server.post("/api/posts", (req, res) => {
  console.log(req.body);
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(id => {
      db.findById(id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(err => {
      console.error(err);
    });
});

//DELETE
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});

//PUT
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.update(id, newPost)
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(err => console.error(err));
});

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
