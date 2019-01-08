// import your node modules

const db = require("./data/db.js");

const express = require("express");

const server = express();

server.use(express.json());

// add your server code starting here

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
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) {
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
        .json({ error: "The post information could not be retrieved." })
    );
});

server.post("/api/posts", (req, res) => {
  const postInfo = req.body;

  if (!postInfo.title || !postInfo.contents) {
    return res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }

  db.insert(postInfo).then(result => {
    db.findById(result.id)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err =>
        res
          .status(500)
          .jason({
            error: "There was an error while saving the post to the database"
          })
      );
  });
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id).then(post => {
    if (!post) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      db.remove(id)
        .then(count => {
          res.status(200).json(post);
        })
        .catch(err =>
          res.status(500).json({ error: "The post could not be removed" })
        );
    }
  });
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.findById(id).then(post => {
    if (!post) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!changes.title || !changes.contents) {
      return res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    } else {
      db.update(id, changes).then(count => {
        res.status(200).json(post);
      });
    }
  });
});

server.listen(5000, () => console.log("server running"));
