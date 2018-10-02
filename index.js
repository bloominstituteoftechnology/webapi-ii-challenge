// import your node modules
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    return res
      .status(400)
      .send({ Error: `Please provide title and contents for the post.` });
  }
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        console.log(post);
        res.status(201).json(post);
      });
    })
    .catch(err => console.error(err));
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.update(id, newPost)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => console.error(err));
});

const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
