// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
//
server = express();
server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err =>
      res
        .status(500)
        .json({message: 'The posts information could not be retrieved'}),
    );
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({error: 'The post with the specified ID does not exist'});
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({error: 'The post information could not be retrieved'}),
    );
});

server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({errorMessage: 'Please provide title and contents for the post.'});
  } else {
    db.insert(req.body)
      .then(newPost => {
        db.find(newPost.id)
          .then(post => res.status(200).json(post))
          .catch(err => res.status(500).json(err));
      })
      .catch(err =>
        res.status(500).json({
          error: 'There was an error while saving the post to the database',
        }),
      );
  }
});

server.listen(5000);
