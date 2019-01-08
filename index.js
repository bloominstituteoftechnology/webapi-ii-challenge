// import your node modules
const express = require('express');
const cors = require('cors');
const port = 8000;
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.get('/api/posts/:userid', (req, res) => {
  const id = req.params.userid;

  db.findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  db.insert(newPost)
    .then(result => res.status(201).json(result))
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length !== 0) {
        db.remove(id).then(count => {
          res.status(200).json(post);
        });
      } else {
        res
          .status(404)
          .json({ error: 'The post with the specific ID does not exist' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.title || !changes.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  db.findById(id).then(post => {
    if (post.length !== 0) {
      db.update(id, changes)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res
        .status(404)
        .json({ error: 'The post with the specific ID does not exist' });
    }
  });
});

server.listen(port, () => console.log(`API running on port ${port}`));
