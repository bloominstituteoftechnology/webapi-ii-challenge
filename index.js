// import your node modules
const express = require("express");

const db = require("./data/db.js");

const server = express();
server.use(express.json());
const PORT = 4000;

// add your server code starting here

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
  console.log(req);
  // const { title, contents } = req.body;
  db.insert(req.body)
    .then(post => {
      console.log(post);
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(201).json(req.body);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
