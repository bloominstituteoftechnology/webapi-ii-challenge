// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ error: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    res
      .status(400)
      .json({ error: 'Please provide title and contents for the post.' });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deletedPost => {
      if (!deletedPost) {
        return res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
      res
        .status(200)
        .json({ message: `The post with the id of ${id} was deleted.` });
    })
    .catch(error => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;
  const updatedPost = { title, contents };

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  db.update(id, updatedPost)
    .then(post => {
      if (!post) {
        return res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
      res.status(200).json(`Post with the ID of ${id} has been updated`);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

server.listen(8500, () => console.log('Server is running on port 8500...'));
