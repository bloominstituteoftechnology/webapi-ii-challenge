// import your node modules
const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

// add your server code starting here
const server = express();
const parser = express.json();
const PORT = 4010;

server.use(parser);
server.use(cors());

//GET endpoints

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
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
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
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      count
        ? db.find().then(posts => {
            res.status(200).json(posts);
          })
        : res.status(404).json({ message: "Invalid Id" });
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to delete the post" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (post.title && post.contents) {
    db.update(id, post)
      .then(count => {
        count
          ? db.findById(id).then(post => {
              res.json(post);
            })
          : res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

//start server listening

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
