const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

// Middleware

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

// POST requests:

server.post('/api/posts', (req, res) => {
  const post = req.body;
  const { title, contents } = post;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for the post.' })
  }

  db
    .insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'There was an error while saving the post to the database' })
    });
});


// GET requests:

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(posts => {
      if(posts[0]) {
        res.json(posts[0]);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});


// DELETE requests

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let post;

  db
    .findById(id)
    .then(response => {
      post = { ...response[0] };

      db
        .remove(id)
        .then(response => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(500).json({ error: 'The post could not be removed' });
        });
    })
    .catch(error => {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    });
});


// PUT requests

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const { title, contents } = update;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for the post.' })
  }

  db
    .update(id, update)
    .then(post => {
      if (post > 0) {
        db
          .findById(id)
          .then(updatedPost => {
            res.status(200).json(updatedPost);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });

});

const port = 5000;
server.listen(port, () => {
  console.log('API Running on port 5000');
})