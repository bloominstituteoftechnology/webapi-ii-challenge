// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");

// add your server code starting here
server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "unexpected failure, my bad" });
    });
});
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
