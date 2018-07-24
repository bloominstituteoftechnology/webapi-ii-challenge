
const express = require('express');
const server = express();
const db = require('./data/db.js');

server.use(express.json());

server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.status(200).json({ posts });
  })
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
  .findById(id)
  .then(post => {
    if (post.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
})

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    return;
  }
  db
  .insert({ title, contents })
  .then(post => {
    res.status(200).json({ post })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
})




server.listen(8000, () => console.log('API running on port 8000'));
