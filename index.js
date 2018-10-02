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
      console.log("\n** posts **", posts);
      res.json(posts);
    })
    .catch(err => res.send(err));
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        console.log(post);
        if (!post) {
          return res
            .status(422)
            .send({ Error: `Post does not exist by that id ${id}` });
        }
        res.status(201).json(post);
      });
    })
    .catch(err => console.error(err));
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});

const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
