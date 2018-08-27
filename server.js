const express = require('express');
const db = require('./data/db.js');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const fetchPosts = (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
};

server.get('/posts', fetchPosts);

server.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (!post) res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
      else res.status(200).json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  const post = { title, contents };
  db.insert(post)
    .then(id => {
      db.find(id)
        .then(post => res.status(201).json(post))
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'There was an error indexing and/or finding the post.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    });
});

server.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      db.remove(id)
        .then(success => {
          if (success) {
            fetchPosts(req, res);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'The post could not be removed.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
    });
});

server.put('/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      db.update(id, { title, contents })
        .then(success => {
          if (success) {
            fetchPosts(req, res);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'The post information could not be modified.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ message: `The post with an id of ${id} does not exist.` });
    });
});

server.listen(3333, () => 'server listening on port 3333');
