const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const app = express();
app.use(cors()); // https://www.npmjs.com/package/cors
app.use(express.json());

const PORT = 3000;

// Endpoints
app.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get posts." });
    });
});

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Failed to get post." });
      }
    })
    .catch(error => {
      res.status(404).json({ message: `User ${id} does not exist.` });
    });
});

app.post("/api/posts", (req, res) => {
  const post = req.body;

  if (post.title && post.contents) {
    db.insert(post)
      .then(postId => {
        db.findById(postId.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create post." });
      });
  } else {
    res.status(400).json({ message: "Missing title or contents." });
  }
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) {
        res.json({ message: "Successfully deleted." });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist. " });
      }
    })
    .catch(error => {
      res.status(409).json({ message: `Problem deleting post ${id}.` });
      // Most applicable status code: https://stackoverflow.com/questions/25122472/rest-http-status-code-if-delete-impossible
    });
});

app.put("/api/posts/:id", (req, res) => {
  const post = req.body;
  const { id } = req.params;

  if (post.title && post.contents) {
    db.update(id, post)
      .then(count => {
        if (count) {
          db.findById(id).then(user => {
            res.json(user);
          });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist. "
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
});

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
