const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());
server.listen(9000, () => console.log("Listening on port 9000."));

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Can't get posts", err: err });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "404 not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Can't get post", err: err });
    });
});

server.post("/api/posts/", (req, res) => {
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
      res
        .status(200)
        .json(
          removedPost
            ? `Post ${id} successfully deleted.`
            : `Error attempting to delete post ${id}.`
        );
    })
    .catch(err => console.error(err));
});
