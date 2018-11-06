// import your node modules

const db = require("./data/db.js");

// add your server code starting here

const express = require("express");
const server = express();
server.use(express.json());


server.get("/api/posts", (req, res) => {
  console.log(req.params);
  db.find()
    .then(posts => res.json(posts))
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved.",
        error: err
      });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  db.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved.",
        error: err
      });
    });
});

server.post("/api/posts", (req, res) => {
  const addedPost = req.body;
console.log(addedPost);
  // - cancel the request.
  // - respond with HTTP status code `400` (Bad Request).
  // - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

  if (addedPost.title && addedPost.contents) {
    db.insert(addedPost)
      .then(id => {
        res.json(id);
      })
      .catch(err => {
        res.status(500).json({
          message: "error: There was an error while saving the post to the database",
          error: err
        });
      });
  } else
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
});

server.listen(9000, console.log("\n Server ALIVE \n"));
