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

const sendUserError = (status, errorMessage, res) => {
  res.status(status).json({ errorMessage: errorMessage });
};

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
server.get('/api/posts', async (req, res) => {
  try {
    const response = await data.find();
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

// Returns the post object with the specified id
server.get('/api/posts/:id', async (req, res) => {
  // if id isn't supplied, it's just a get all "/api/posts"
  const id = req.params.id;

  try {
    const response = await data.findById(id);
    if (response.length !== 0) {
      return res.status(200).json(response);
    } else {
      return res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

// delete a post - no ID given
server.delete('/api/posts/', (req, res) => {
  res.status(404).json({ error: 'You must supply an ID to delete a post.' });
});

// Removes the post with the specified id and returns the deleted post
server.delete('/api/posts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const findResponse = await data.findById(id);
    if (findResponse.length === 0) {
      return res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
    try {
      const delResponse = await data.remove(id);
      return res.status(200).json(findResponse);
    } catch (err) {
      return res.status(500).json({ error: 'The post could not be removed' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

// edit a post - no ID given
server.put('/api/posts/', (req, res) => {
  res.status(404).json({ error: 'You must supply an ID to edit a post.' });
});

// Updates the post with the specified id using data from the request body.
// Returns the modified document, NOT the original
server.put('/api/posts/:id', async (req, res) => {
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

  try {
    await data.update(id, post);
    try {
      const response = await data.findById(id);
      if (response.length === 0) {
        return res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        });
      } else {
        return res.status(200).json(response);
      }
    } catch (err) {
      return res.status(500).json({
        error: 'The post information could not be retrieved.',
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'The post information could not be modified.' });
  }
});

server.listen(PORT, console.log(`Server listening on port ${PORT}`));
