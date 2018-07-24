const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const data = require('./data/db');

const server = express();
// turn on the body parser, using JSON data
server.use(express.json());
// lets localhost work
server.use(cors());
// security features, activated!
server.use(helmet());

const PORT = 8001;

// Creates a post using the information sent inside the request body
server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
    return;
  }

  // our post object
  const post = { title, contents };

  data
    .insert(post)
    .then(response => {
      data
        .findById(response.id)
        .then(response => res.status(201).json(response))
        .catch(() => {
          res
            .status(500)
            .json({ error: 'The post information could not be retrieved.' });
        });
    })
    .catch(() => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    });
});

// Returns an array of all the post objects contained in the database
server.get('/api/posts', (req, res) => {
  data
    .find()
    .then(response => res.json(response))
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' }),
    );
});

// Returns the post object with the specified id
server.get('/api/posts/:id', (req, res) => {
  // if id isn't supplied, it's just a get all "/api/posts"
  const id = req.params.id;

  data
    .findById(id)
    .then(response => {
      if (response.length !== 0) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' }),
    );
});

// delete a post - no ID given
server.delete('/api/posts/', (req, res) => {
  res.status(404).json({ error: 'You must supply an ID to delete a post.' });
});

// Removes the post with the specified id and returns the deleted post
server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  // Removes the post with the specified id and returns the deleted post
  data
    .findById(id)
    .then(findResponse => {
      if (findResponse.length === 0) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
        return;
      }
      data
        .remove(id)
        .then(() => res.status(200).json(findResponse))
        .catch(() =>
          res.status(500).json({ error: 'The post could not be removed' }),
        );
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' }),
    );
});

// edit a post - no ID given
server.put('/api/posts/', (req, res) => {
  res.status(404).json({ error: 'You must supply an ID to edit a post.' });
});

// Updates the post with the specified id using data from the request body.
// Returns the modified document, NOT the original
server.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
    return;
  }

  // post object
  const post = { title, contents };

  data
    .update(id, post)
    .then(() => {
      data
        .findById(id)
        .then(response => {
          if (response.length === 0) {
            res.status(404).json({
              message: 'The post with the specified ID does not exist.',
            });
          } else {
            res.status(200).json(response);
          }
        })
        .catch(() => {
          res.status(500).json({
            error: 'The post information could not be retrieved.',
          });
        });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

server.listen(PORT, console.log(`Server listening on port ${PORT}`));
