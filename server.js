// import your node modules

const db = require("./data/db.js");

// add your server code starting here
const express = require("express");

const server = express();
server.use(express.json()); // Body parser.

// CORS
const cors = require("cors");
server.use(cors());

// Get Request
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});

// Post Request
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  }
  db.insert({ title, contents })
    .then(posts => res.status(201).json({ title, contents }))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

// Get Specific Request
server.get("/api/posts/:id", (req, res) => {
  console.log("req.params: ", req.params);
  console.log("req.params.id: ", req.params.id);
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length !== 0) {
        return res.status(200).json(posts);
      } else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// Delete Request
server.delete("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
      res.status(200).json(response);
      db.remove(req.params.id)
        .then(count => {
          if (count === 0)
            return res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
        })
        .catch(err =>
          res.status(500).json({ error: "The post could not be removed" })
        );
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

// Put Request
server.put("/api/posts/:id", (req, res) => {
  const { title, contents } = req.body;
  db.findById(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post"
        });
      }
      db.update(req.params.id, { title, contents })
        .then(posts => {
          return res.status(200).json({ title, contents });
        })
        .catch(err => {
          return res
            .status(500)
            .json({ error: "The post information could not be modified." });
        });
    })
    .catch(err => {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
