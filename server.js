// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id) // to access ids, refer react router stuff.
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
