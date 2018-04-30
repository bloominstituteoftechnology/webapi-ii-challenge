const express = require("express");
const db = require("./data/db.js");
const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json());

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
      console.log(err);
    });
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
    });
});

server.post("/api/posts", (req, res) => {
  db
    .insert(req.body)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .remove(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
    });
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .update(id, req.body)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
    });
});

server.listen(5000, () => console.log("\nwe doin it my broseph\n"));
