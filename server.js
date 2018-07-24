// import your node modules

//import express from 'express'
const express = require("express");

const db = require("./data/db.js");
const server = express();

// add your server code starting here

// parse JSON to objects
server.use(express.json());

server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.insert({ title, contents })
    .then(posts => res.status(201).json({ title, contents }))
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(posts => {
      if (posts === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
      res.status(200).json({ message: "post deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "the post could not be removed" });
    });
});

server.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.update(id, { title, contents })
    .then(posts => {
      if (posts.length == 0) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
      res.status(200).json({ title, contents });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    });
});

server.listen(8000, () => console.log("API running..."));
