const express = require('express');
const db = require('./data/db.js');

const server = express();
const parser = express.json();
const PORT = 8000;

server.use(parser);

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    db.insert({ title, contents })
      .then(post =>
        db.findById(post.id).then(posts => res.status(201).json(posts))
      )
      .catch(err =>
        res.status(500).json({
          error: 'There was an error while saving the post to the database',
        })
      );
  } else {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length) {
        const deletedPost = post[0];
        db.remove(id).then(num => {
          if (num) {
            res.json(deletedPost);
          }
        });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

server.put('/api/posts/:id/', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  db.findById(id).then(post => {
    if (post.length) {
      if (title && contents) {
        db.update(id, { title, contents }).then(count => {
          if (count) {
            res.status(200).json({ title, contents });
          } else {
            res
              .status(500)
              .json({ error: 'The post information could not be modified.' });
          }
        });
      } else {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.',
        });
      }
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  });
});

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
