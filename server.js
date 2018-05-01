// import your node modules

const db = require("./data/db.js");
const express = require("express");
const server = express();

// add your server code starting here

server.get("/", (req, res) => {
  res.send("API is running");
});

// GET posts; find()
server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "Can't get posts!" });
    });
});

// GET posts by ID; findById()
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(post => {
      res.json(post[0]); // ??? [id] ???
    })
    .catch(error => {
      res.status(404).json({
        error: "Unable to find specified post."
      });
    });
});

// POST new post; insert()
server.post("/api/posts", (req, res) => {
  const post = req.body;
  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "Error adding new post."
      });
    });
});

//UPDATE post; update()
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatePost => {
          res.status(200).json(updatePost[0]);
        });
      } else {
        res.status(400).json({ error: "The specified post does not" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE post; remove()
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let post;

  db
    .findById(id)
    .then(response => {
      post = { ...response[0] };

      db.remove(id).then(response => {
        res.status(500).json(response);
      });
    })
    .catch(error => {
      res.status(500).json({
        error: "The post could not be deleted."
      });
    });
});
