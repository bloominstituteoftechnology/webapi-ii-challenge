// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.use(cors());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log("posts: ", posts);
      res.json(posts);
    })
    .catch(e => res.json(e));
});

server.get("api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(e => res.json(e));
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  db.insert({ title, contents })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

const port = 3333;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
