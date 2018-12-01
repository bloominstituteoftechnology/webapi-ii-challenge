// import your node modules
const express = require("express");
const db = require("./data/db.js");
const parser = express.json();
// add your server code starting here
const server = express();
const PORT = 4000;

server.use(parser)

server.get("/", (req, res) => {
  res.json({ message: "server is listening" });
});

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
      if (post.length === 1) {
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

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (post.title && post.contents){
  db.insert(post).then(postId => {
      db.findById(postId.id).then(post => {
      res.status(201).json(post);
    });
  }).catch(err => {
      res
        .status(500)
        .json({message: "failed to insert post in db" });
    });
  }
  else{
    res.status(400).json({message: "missing title or content"});
  }
});



server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
