const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 8000;

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'failed to get posts' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(posts => {
      if (posts.length) {
        res.json(posts);
      } else {
        res.status(404).json({ message: 'post does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'failed to get post' });
    });
});

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
