// import your node modules

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(bodyParser.json());

server.use(cors());

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

server.post('/api/posts', async (req, res) => {
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    res.status(201).json(postId);
  } catch (error) {
    res.status(500).json({
      message: 'There was an error while saving the post to the database'
    });
  }
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'The post could not be removed' });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID doesn't exist" });
      }
      res.status(200).json(count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The post information could not be modified' });
    });
});

server.listen(5800, () => console.log('this is the server'));
