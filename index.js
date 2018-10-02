// MODULES
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// SERVER SETUP
const server = express();
server.use(cors());
server.use(express.json());

// API ENDPOINTS
server.post('/api/posts', (req, res) => {
  const newPost = req.body;
  const { title, contents } = newPost
  if (!title || !contents) return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  db.insert(newPost)
    .then(post => {
      return res.status(201).json(post);
    })
    .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }));
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (!post.length) return res.status(404).json({ message: "The post with the specified ID does not exist." });
      return res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }));
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      if (!removedPost) return res.status(404).json({ message: "The post with the specified ID does not exist." });
      return res.status(202).json({ message: "The post was successfully deleted." })
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed." }));
})

// PORT LISTENER
const port = 8000;
server.listen(port, () => console.log(`=== ${port} active ===`));
