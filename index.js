// import your node modules
const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");
const server = express();
// add your server code starting here
server.use(cors());
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ error: "The post with the speicified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post with the specified ID does not exist." });
    });
});

server.post("/api/posts", async (req, res) => {
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    res.status(201).json(postId);
  } catch (error) {
    res.status(500).json({ message: "error creating post" });
  }
});

server.put("/api/posts/:id", (req, res) => {
  const userData = req.body;
  db.update(req.params.id, userData)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating post" });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting post" });
    });
});

server.listen(9000);
