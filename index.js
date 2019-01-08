// import your node modules

const express = require('express');
const server = express();

const db = require('./data/db.js');

const myData = require('./data/seeds/posts');

// add your server code starting here

// Middleware - this teaches express how to parse the JSON request
// body. We need some middleware to read the HTTP message and
// turn it into a JS object
server.use(express.json());

server.get('/', (req, res) => {
  res.json('Working!');
});

server.get('/api/posts', (req, res) => {
  // Below we print out everything we get from req
  console.dir(req, { depth: 0 });
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: 'The posts information could not be retrieved.'
      });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    });
});

server.post('/api/posts', async (req, res) => {
  console.log('body:', req.body);
  try {
    const post = req.body;
    const postInfo = await db.insert(post);
    res.status(201).json(postInfo);
  } catch (error) {
    let message = 'error creating user';
    if (error.errno === 19) {
      res.status(400).json({
        errorMessage: 'Please provide both the title and the contents.'
      });
    }
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

server.put('/api/posts/:id', async (req, res) => {
  console.log('body from put:', req.body);
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      // if the count is 1, the data was updated correctly
      if (count) {
        res.status(200).json({ message: `${count} post updated.` });
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The post information could not be modified.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'The post could not be removed.' });
    });
});

server.listen(8000, () => console.log('Server is working!'));
