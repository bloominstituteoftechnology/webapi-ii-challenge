// import your node modules
const express = require("express");
const server = express();
const db = require("./data/db.js");

server.use(express.json());

// add your server code starting here
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.json(err));
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "No post found" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.post("/api/posts", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    db.insert(post)
      .then(postID => {
        db.findById(postID.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  } else if (post.title) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else if (post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post) {
        const deletePost = post[0];
        db.remove(id).then(count => {
          if (count) {
            res.json(deletePost);
          }
        });
      } else {
        res.status(400).json({ error: "Invalid Id" });
      }
    })

    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (post.title && post.contents) {
    db.update(id, post)
      .then(count => {
        if (count) {
          db.findById(id).then(post => {
            res.json(post[0]);
          });
        } else {
          res.status(404).json({ errorMessage: "Invalid ID" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            errorMessage: "An error occurred while updating this post."
          });
      });
  } else if (post.title) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else if (post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.listen(5000, () => console.log("server running"));