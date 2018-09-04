// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Hello FSW12");
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
        .json({ error: "The posts information could not be retrieved." });
    });
});
server.get("/posts/:id", (req, res) => {
  db.findById(`/posts/${posts.id}`)
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

server.post("/posts", (req, res) => {
  res.status(201).json({ url: "./posts", operation: "POST" });
});

server.delete("./posts/:id", (req, res) => {
  db.remove(`/posts/${posts.id}`).then(post => {
    res
      .status(200)
      .json(posts)
      .catch(err => {
        console.error("error", err);
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  });
});

server.listen(9000, () => console.log("API on port 9k"));
// add your server code starting here
