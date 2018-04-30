const express = require("express");
const db = require("./data/db.js");
const server = express();

server.get("/", (req, res) => {
  res.send("Api running");
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      newId = posts[posts.length - 1].id + 1;
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
  const testPost = {
    id: db.find().then(posts => {
      posts[posts.length - 1].id + 1;
    }),
    title: "TEST TITLE",
    contents: "test contents"
  };
  db
    .insert(testPost)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
    });
});

server.listen(5000, () => console.log("\nwe doin it my broseph\n"));
