// import your node modules
const express = require('express');
const port = 8000;
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    );
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
    .catch(err =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    );
});

server.listen(port, () => console.log(`API running on port ${port}`));
