// import your node modules

const db = require("./data/db.js");

// add your server code starting here
const express = require("express");

const server = express();
server.use(express.json()); // Body parser.

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

server.listen(8000, () => console.log("API running on port 8000"));
