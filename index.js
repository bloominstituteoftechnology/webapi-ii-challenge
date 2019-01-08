// import your node modules
const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");
const PORT = 5000;

const server = express();
server.use(cors());
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;

  if (!newPost.title || !newPost.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db.insert(newPost)
    .then(result => {
      db.findById(result.id)
        .then(post => res.status(201).json(post))
        .catch(err =>
          res.status(500).json({
            message: "There was an error while saving the post to the database"
          })
        );
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      if (!changes.title || !changes.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      }
      db.update(id, changes).then(newPost => {
        res.status(200).json(newPost);
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length) {
        db.remove(id).then(res.status(200).json(post));
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
