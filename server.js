// import your node modules
const express = require("express");
// const morgan = require("morgan");
const bodyParser = require("body-parser");

const db = require("./data/db.js");

const server = express();
server.use(bodyParser.json());

// middleware
// server.use(morgan("dev"));
server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("API is running");
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: "Post not found. Try again." });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.post("/api/posts", (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      console.log("response", response);
      res.status(201).json;
    })
    .catch(err => {
      res.status(500).json({ error: "Error; could not save post to database" });
    });
});
server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));
