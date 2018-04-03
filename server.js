// import your node modules
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(posts => {
      if (posts.length < 1) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(posts[0]);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
    return;
  }
  db
    .insert(newPost)
    .then(() => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id).then(posts => {
    if (posts.length < 1) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
      return;
    } else {
      db
        .remove(id)
        .then(posts => {
          console.log(posts);
          res
            .status(200)
            .json({ message: 'The post was successfully deleted.' });
        })
        .catch(error => {
          res.status(500).json({ error: 'The post could not be removed' });
        });
    }
  });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const updatedPost = { title, contents };
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
    return;
  }
  db.findById(id).then(posts => {
    if (posts.length < 1) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
      return;
    } else {
      db
        .update(id, updatedPost)
        .then(posts => {
          res.status(200).json(updatedPost);
        })
        .catch(error => {
          res
            .status(500)
            .json({ error: 'The post information could not be modified.' });
        });
    }
  });
});

// add your server code starting here
const port = 5010;
server.listen(port, () => console.log('API running on port 5010'));
