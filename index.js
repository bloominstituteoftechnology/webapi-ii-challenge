// import your node modules
const express = require("express");

const db = require("./data/db.js");

const server = express();
const port = 9000;

// add your server code starting here
server.get("/", (_, res) => {
  res.json({ message: "Introduction" });
});

server.get("/api/posts", (_, res) => {
  db.find("posts")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deletedPost => {
      deletedPost
        ? res.status(200).send("The post has been deleted")
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be removed." });
    });
});

server.listen(port, () => {
  console.log(`server is working through ${port}`);
});
