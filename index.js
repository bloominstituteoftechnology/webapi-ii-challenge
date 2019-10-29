const express = require("express");
const cors = require("cors");
const posts = require("./data/db");

const server = express();

server.use(cors());
server.use(express.json());

// BEGINNING OF END POINTS

server.post("/api/posts", createPost);
server.post("/api/posts/:id/comments", createComment);
server.get("/api/posts", getPosts);
server.get("/api/posts/:id", getIndividualPost);

// END OF END POINTS

// BEGINNING OF REQUEST HANDLERS

function createPost(req, res) {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
      .end();
  }
  posts
    .insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        })
        .end();
    });
}

function createComment(req, res) {
  const { text } = req.body;
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." })
      .end();
  } else {
    posts
      .insertComment(req.body)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function getPosts(req, res) {
  posts
    .find()
    .then(data => {
      res
        .status(200)
        .json(data)
        .end();
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
        .end();
    });
}

function getIndividualPost(req, res) {
  const { id } = req.params;
  posts
    .findById(id)
    .then(data => {
      if (data.length === 0) {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
        .end();
    });
}

// END OF REQUEST HANDLERS

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || 3000}`);
});
