// import your node modules

const db = require("./data/db.js");

// add your server code starting here
const express = require("express");

const server = express();

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

server.listen(8000, () => console.log("API running on port 8000"));
