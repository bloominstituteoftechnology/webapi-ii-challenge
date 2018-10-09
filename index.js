// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.use(cors());

// Returns an array of all the post objects contained in the database
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log("posts: ", posts);
      res.json(posts);
    })
    .catch(e => res.json(e));
});

// Creates a post using the information sent inside the request body
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

// Returns the post object with the specified id
server.get("api/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(e => res.json(e));
});

const port = 3333;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
