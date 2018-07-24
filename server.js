// import your node modules
const express = require("express");
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get("/api/posts", (req, res) => {
  db.find()
  .then(posts => {
            res.json({ posts });
        })
  .catch(error => {
    res.status(500).send({ error: "The posts information could not be retrieved." })
  })
});

server.get("/api/posts/:id", (req, res) => {
  let post = req.params;
  db.findById(post.id)
  .then(post => {
    if (post == ""){
      res.status(404).send({ message: "The post with the specified ID does not exist." })
    }
    else {
      res.send({ post });
    }
  })
  .catch(error => {
    res.status(404).send({ error: "The post information could not be retrieved." })
  })
})

server.post("/api/posts", (req, res) => {
  if (req.query.title == "" || req.query.contents == ""){
  res.status(400).send({ errorMessage: "Please provide title and contents for the post."});
        }
  else {
    db.insert({
      title: req.query.title,
      contents: req.query.contents
    })
    .then(response => res.status(201).send("Created"))
    .catch(error => {
      res.status(500).send({ error: "There was an error while saving the post to the database" });
    })
  }
});

server.delete("/api/posts/:id", (req, res) => {
  let post = req.params;
  db.findById(post.id)
  .then(db.remove(post.id)
        .then(res.send("Delete worked"))
        .catch(res.status(500).send({ error: "The post could not be removed" })))
  .catch(res.status(404).send({ message: "The post with the specified ID does not exist." }))
})

server.put("/api/posts/:id", (req, res) => {
  let post = req.params;
  let newPost = {
    title: req.query.title,
    contents: req.query.contents
  }
  db.findById(post.id)
  .then(db.update(post.id, newPost)
        .then(res.status(200).send("Update worked"))
        .catch(res.status(500).send({ error: "The post information could not be modified." })))
  .catch(res.status(404).send({ message: "The post with the specified ID does not exist." }))
})


server.listen(8000, () => console.log('API running on port 8000'));
