// import your node modules
const express = require("express");

const db = require("./data/db");

const server = express();
const PORT = 4000;

server.use(express.json());

const serverMessage = (status, message) => {
  res.status(status).json({ message: message });
};

// add your server code starting here

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
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
        .json({ message: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    db.insert(post)
      .then(idInfo => {
        db.findById(idInfo.id).then(post => {
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
    .then(num => {
      if (!num) {
        // serverMessage(404, "The post with the specified ID does not exist.");
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        // serverMessage(200, "successfully deleted");
        res.json({ message: "successfully deleted" });
      }
    })
    .catch(err => {
      // serverMessage(500, "The post could not be removed")
      res.status(500).json({ message: "The post could not be removed" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (post.title && post.contents) {
    db.update(id, post)
      .then(num => {
        if (!num) {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        } else {
          db.findById(id).then(post => {
            res.json(post);
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }
});

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
