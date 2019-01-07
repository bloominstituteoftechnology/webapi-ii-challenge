// import your node modules
const db = require("./data/db.js");
const express = require("express");

// add your server code starting here
const server = express();
server.use(express.json());

server.get("/api/posts", (req, res) => {
  db.find().then(
    doc => {
      res.status(200).send(doc);
    },
    err => res.status(500).json({ error: "The posts information could not be retrieved" })
  );
});

server.get(`/api/posts/:id`, (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post[0]) {
        res.json(post[0]);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }));
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let post;

  db.findById(id)
    .then(post => {
      post = post[0];
      if (post) {
        db.remove(id).then(doc => res.status(200).json(post));
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed" }));
});

server.post("/api/posts", (req, res) => {
  const post = req.body;

  db.insert(post)
    .then(doc => res.status(201).json(post))
    .catch(err => {
      if ((err.errno = 19)) {
        res
          .status(400)
          .json({ errorMessage: "Please provide BOTH a title and contents for the post." });
      } else {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
      }
    });
});

server.listen(3000, () => console.log("The server is up and listening on port 3000"));
