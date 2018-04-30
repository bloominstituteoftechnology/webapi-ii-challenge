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

// server GET, return 'API is running'
server.get("/", (req, res) => {
  res.send("API is running");
});

// server GET, find "posts", then return it.
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

// server GET, find by ID first, then return "post"
server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "Post not found. Try again." });
      } else {
        res.json(post[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// server POST, Insert post, then give response, which is id of the post
server.post("/api/posts", (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "Error; could not save post to database" });
    });
});
server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));

// server DELETE, find post by id, then all details of the post (content + title) is defined as 'post'.
// delete the 'post' then return the title and content of post deleted.
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db
  .findById(id)
  .then(response => {
    post = { ...response[0] };
    db
      .remove(id)
      .then(response => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({ error: "Nothing to delete" });
      });
  });
  db;
});
