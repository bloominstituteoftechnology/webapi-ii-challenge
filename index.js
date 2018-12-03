// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();

const port = 4000;

server.use(express.json());

// GET
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
      // console.log('post ', post);
      if (post[0]) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      console.log('err ', err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// POST
server.post('/api/posts', (req, res) => {
  // console.log('BODY: ', req.body);
  const post = req.body;
  // console.log(post);
  if (post.title && post.contents) {
    db.insert(post)
      .then(idInfo => {
        db.findById(idInfo.id).then(res.status(201).json(idInfo));
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
});

// DELETE
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post[0]) {
        res.status(200).json(post);
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
  db.remove(id)
    .then(count => {
      if (count) {
        // console.log(count);
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

// PUT

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (post.title && post.contents) {
    db.update(id, post)
      .then(count => {
        if (count) {
          db.findById(id).then(post => {
            res.json(post);
          });
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The post information could not be modified.' });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
});

//LISTENING

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
