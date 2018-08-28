// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("i suck at coding");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "you suck" });
    });
});

server.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "yousuck" });
    });
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return;
  }
  db.insert({
    title,
    contents
  })
    .then(response => {
      res.status(201).json(req.body);
    })
    .catch(error => {
      console.error("error", err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
      return;
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      res.status(204).end();
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => res.status(500).json(err));
});

server.listen(4000, () => console.log("/n= API on port 4000 =/n"));
