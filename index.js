// implement your API here
// import db from './data/db.js'; 
const express = require('express');

const db = require('./data/db.js'); 

const server = express();

// wire up global middleware
server.use(express.json()); 

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'posts not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/posts', (req, res) => {
  const postInfo = req.body; 

  db.insert(postInfo) 
    .then(result => {
      db.findById(result.id)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err =>
          res.status(500).json({ message: 'the get by id failed', error: err })
        );
    })
    .catch(err =>
      res.status(500).json({ message: 'the post failed', error: err })
    );
});

server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) {
        db.remove(id).then(count => {
          res.status(200).json(post);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.get('/posts/first/:first/last/:last', (req, res) => {
  res.send({ hello: `${req.params.first} ${req.params.last}` });
});

server.listen(5000, () => console.log('server running'));

