// import your node modules
const express = require("express");
const PORT = 3000;
const db = require("./data/db.js");

// add your server code starting here
const server = express();
server.use(express.json());

// endpoints GETX2, POST, PUT & DELETE
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
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
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(404)
            .json({ message: "The post with the specified ID does not exist." })
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

server.put("/api/posts/:id", (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (post.title && post.contents) {
    db.update(id, post)
      .then(count => {
        if (count) {
          db.findById(id).then(post => {
            res.json(post);
          });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The post information could not be modified."});
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post."});
  }
});

// listen
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
