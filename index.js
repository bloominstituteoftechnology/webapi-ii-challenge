const express = require("express");
const cors = require("cors");
const posts = require("./data/db");

const server = express();

server.use(cors());
server.use(express.json());

// BEGINNING OF END POINTS

server.post("/api/posts", createPost);

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

// END OF REQUEST HANDLERS

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || 3000}`);
});
