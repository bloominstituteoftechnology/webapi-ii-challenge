// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 8080;

server.use(express.json());

// GET /api/posts
server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

// GET /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    })
});

// POST /api/posts
server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    db.insert(post).then(idInfo => {
      db.findById(idInfo.id).then(post => {
        res.status(201).json(idInfo);
      });
    })
    .catch(err => {
      res
        .status(500)
        .json( { message: 'failed to insert post in db' });
    });
  } else {
    res.status(400).json({ errorMessage: 'Please provide title and contens for the posts.' });
  }
});

// DELETE /api/posts/:id

// PUT /api/posts/:id


server.listen(PORT, () => {
  console.log(`server running on port: ${8080}`);
});
