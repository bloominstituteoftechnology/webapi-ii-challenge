// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");

server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World");
});

// POST Request
server.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db.insert({
    title: req.body.title,
    contents: req.body.contents
  })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database"
        })
    );
});

server.listen(8000, () => console.log("API running on port 8000"));
