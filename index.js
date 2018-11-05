// import your node modules

const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors({ origin: 'http://localhost:5800' }));

server.get('/', (req, res) => {
  res.json('Welcome to Hobbiton!');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'The posts information could not be retrieved',
        error: err
      });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post && post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved',
        error: err
      });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(postDelete => {
      postDelete
        ? res.status(200).json('Success!')
        : res
            .status(404)
            .json({
              message: 'The post with the specified ID does not exist.'
            });
    })
    .catch(err => {
      res.status(500).json({ message: 'The post cold not be removed' });
    });
});

server.listen(5800, () => console.log('this is the server'));
