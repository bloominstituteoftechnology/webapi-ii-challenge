// import your node modules
const express = require("express");
const server = express();

const db = require("./data/db.js");

// add your server code starting here

server.get("/", (req, res) => {
  res.status(200).send("sup");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error 500: Posts not found." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error 500: Post not found." });
    });
});

// When the client makes a POST request to /api/posts:

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      if (!post) {
        return res
          .status(422)
          .send({
            error: "There was an error while saving the post to the database"
          });
      }
      db.findById(id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(err => console.log(err));
});

// delete
server.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(9000, () => console.log("server be runnin: port 9000"));
