const express = require('express');
// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const server = express();

// start db
server.get('/', (req, res) => {
  res.send('API running');
});

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res
        .json(posts)
        .status(200)
        .send(response);
    })
    .catch(err => {
      req.abort(posts);
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

// get by id needs fixed
server.get('api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(post => {
      if (posts.length === 0) {
        res
          .status(404)
          .send({ message: 'The post with the specified ID does not exist' });
      } else {
        res.status(200).send(response);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: 'The post information could not be retrieved.' });
    });
});

// server.delete;

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
