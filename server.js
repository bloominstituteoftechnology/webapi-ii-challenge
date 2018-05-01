const express = require("express");

const db = require("./data/db.js");

let bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Api running, do you mean /api/posts?");
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
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: "post not found" });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.post("/api/posts", (req, res) => {
  const post = req.body;

  if (post.title === "" || post.contents === "") {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db
      .insert(post)
      .then(response => {
        res.status(201).json({ post });
      })
      .catch(() => {
        res.status(500).send({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  let tempPost;
  db
    .findById(id)
    .then(response => {
      if (response.length === 0) {
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist" });
      } else {
        tempPost = response[0];
      }
    })
    .catch(error =>
      res
        .status(500)
        .send({ error: "The post with the specified ID does not exist." })
    );
  db
    .remove(id)
    .then(response => res.status(201).send(tempPost))
    .catch(error => {
      error: "The post could not be removed";
    });
});

server.put("/api/posts/:id", function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(posts => {
          res.status(200).json(posts[0]);
        });
      } else {
        res.status(404).json({ msg: "note not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));
