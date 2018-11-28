// import your node modules
const express = require("express");
const db = require("./data/db.js");

// add your server code starting here
const server = express();
const PORT = 4000;

//GET endpoints

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrived." });
    });
});

//start server listening

server.listen(PORT, () => {
  console.log("server is up and running");
});
