const express = require("express");

const db = require("./data/db.js");
const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//   res.send("Testing Server");
// });

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  let id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("\n== API on port 8k === \n"));
