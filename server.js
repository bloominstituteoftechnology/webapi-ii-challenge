// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

server.use(express.json());
// add your server code starting here

server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.json(response); // send response if it exists
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db.insert(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error while saving the post to the database' });
    });
});

server.listen(5000, () => console.log('API running on port 5000'));
