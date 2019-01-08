// import your node modules

const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());
// add your server code starting here
server.get("/api/posts", (req, res) => {
  const post = req.params.posts;

  db.find(post)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The posts information could not be retrieved."
        });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

server.get("/api/posts/:postid", (req, res) => {
  const pid = req.params.postid;

  db.findById(pid)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;

  if (title && contents) {
    db.insert({ title, contents })
      .then(id => {
        const postId = id.id;

        db.findById(postId)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(err =>
            res.status(400).json({
              errorMessage: "Please provide title and contents for the post."
            })
          );
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the post to the database "
        })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) {
        db.remove(id).then(count => {
          res.status(200).json(post);
        });
      } else {
        res.status(404).json({
          message: `The post with the specified ${id} does not exist.`
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "The post could not be removed", error: err })
    );
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;

  if (title && contents) {
    db.update(id, { title, contents })
      .then(post => {
        if (post) {
          res.status(200);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.listen(5000, () => console.log("server running"));
