// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/db.js');

const server = express();

//middleware
server.use(morgan('dev')); // logging
server.use(helmet()); // security
server.use(express.json()); // parsing
server.use(cors());

// CREATE
server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    const newPost = {
      title: title,
      contents: contents
    };
    db
      .insert(newPost)
      .then(newPost => {
        res.status(201).json({ newPost });
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

// READ
server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

//READ BY ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(posts => {
      if (posts[0]) {
        res.json(posts[0]);
      } else
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// UPDATE
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const updatedPost = { title, contents };

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  db.findById(id).then(posts => {
    if (posts[0]) {
      db
        .update(id, { updatedPost })
        .then(id => {
          res.status(200).json({ updatedPost });
        })
        .catch(error => {
          res
            .status(500)
            .json({ error: 'The post information could not be modified.' });
        });
    } else
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
  });
});

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id).then(posts => {
    if (posts[0]) {
      db
        .remove(id)
        .then(() => {
          res.status(200).json({ message: 'The post was deleted.' });
        })
        .catch(error => {
          res.status(500).json({ error: 'The post could not be removed' });
        });
    } else
      res.status(404).json({
        message: 'The post with the specified ID does not exist.'
      });
  });
});

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));
