// import your node modules
const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

const cors = require("cors");

server.use(cors());
const port = 8000;

server.listen(port, () => `running on port: ${port}`);

server.get("/api/posts", (req, res) => {
  console.log(req);
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = db.findById(id);
  if (foundPost) {
    console.log("post found");
    db.remove(id).then(() => {
      db.find().then(post => {
        console.log(post);
        res.json(post);
      });
    });
  }
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };
  db.insert(newPost).then(() => {
    db.find().then(post => {
      console.log(post);
      res.json(post);
    });
  });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };
  console.log(newPost);
  db.update(id, newPost).then(() => {
    db.find().then(post => {
      console.log(post);
      res.json(post);
    });
  });
});
// add your server code starting here
