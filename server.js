// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
const cors = require('cors');

// server.use(helmet());

server.use(express.json());
server.use(cors());
// add your server code starting here

server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.json(response); // send response if it exists
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(404).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db.insert(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error while saving the post to the database' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'The post could not be removed'
      });
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }

  db.findById(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      } else {
        db.update(id, post).then((id) => {
          res.status(200).json(id);
        });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The post information could not be modified.' });
    });
});

server.listen(8000, () => console.log('API running on port 8000'));
