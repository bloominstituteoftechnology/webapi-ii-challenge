// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

// add your server code starting here
const server = express();
server.use(cors());

server.get("/", (req, res) => {
  res.send("<h1>Hello from Anthony's first server!!!</h1>");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log("POSTS", posts);
      res.json(posts);
    })
    .catch(error => res.send(error));
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      console.log("POST", post);
      res.json(post);
    })
    .catch(error => res.send(error));
});
const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
