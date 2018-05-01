const express = require("express");
const db = require("./data/db.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Api running");
});

server.get("/api/posts", (req, res) => {
  db
    .find()
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
  const id = req.params.id;
  db
    .findById(id)
    .then(post => {
      if (post.length !== 0) {
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
  db
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      if (
        !req.body.hasOwnProperty("title") ||
        !req.body.hasOwnProperty("contents")
      ) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        });
      }
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(post => {
      if (post.length !== 0) {
        db
          .findById(id)
          .then(posts => {
            post = { ...posts[0] };
            db.remove(id).then(response => {
              res.status(200).json(post);
            });
          })
          .catch(err =>
            res.status(500).json({ error: "The post could not be removed" })
          );
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

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(post => {
      if (
        !req.body.hasOwnProperty("title") ||
        !req.body.hasOwnProperty("contents")
      ) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else if (post.length !== 0) {
        db
          .update(id, req.body)
          .then(post => {
            db.findById(id).then(posts => {
              res.status(200).json(posts[0]);
            });
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The post information could not be modified." })
          );
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

server.listen(5000, () => console.log("\nwe doin it my broseph\n"));
