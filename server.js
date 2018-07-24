const express = require('express');
const server = express();
server.use(express.json());
const db = require('./data/db');

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


server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
  .remove(id)
  .then(post => {
    if(!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post could not be removed" })
  })
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if ( !title || !contents ) {
    res.status(400).json({ error: "Please provide title and contents for the post."});
    return;
  }
  db
  .update(id, { title, contents })
  .then(post => {
     if (post === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
      return;
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be modified." })
  })
})


server.listen(8000, () => console.log('API running on port 8000'));
