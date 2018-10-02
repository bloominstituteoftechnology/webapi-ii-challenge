// import your node modules
const express = require('express');
const cors = require('cors');

// import database handler
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());
server.use(express.json());

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(newPost => {
      if (!newPost) {
        return res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      }
      res.status(201).json({ 'Post created': newPost });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(posts => {
      if (!posts) {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      if (!id) {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
      res.status(200).json(removedPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const updatedPost = { title, contents };
  db.update(id, updatedPost)
    .then(updatedPost => {
      if (!id) {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
      if (!updatedPost) {
        return res
          .status(400)
          .json({
            errorMessage: 'Please provide title and contents for the post.'
          });
      }
      res.status(200).json(updatedPost);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

const port = 8000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
