// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// Requests
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: 'There was an error', err }));
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(
      post =>
        post
          ? res.status(200).json(post)
          : res.status(404).json({ message: 'That post does not exist' })
    )
    .catch(err => res.status(500).json({ message: 'There was an error', err }));
});

server.listen(4000, (req, res) => console.log('Server started on port 4000'));
