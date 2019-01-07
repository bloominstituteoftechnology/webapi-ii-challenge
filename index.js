// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
//
server = express();
// need this to read request body
server.use(express.json());

// get all posts
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

// get single post by id
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      // if a post is found, send it back
      if (post.length) {
        res.status(200).json(post);
      } else {
        // findById will return an empty array if there is no post found
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
  // ensure post has a title and contents
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({errorMessage: 'Please provide title and contents for the post.'});
  } else {
    // if post has correct properties, add it to the db
    db.insert(req.body)
      .then(newPost => {
        db.find(newPost.id)
          .then(post => res.status(200).json(post))
          .catch(err => res.status(500).json(err));
      })
      // throw an error
      .catch(err =>
        res.status(500).json({
          error: 'There was an error while saving the post to the database',
        }),
      );
  }
});

server.delete('/api/posts/:id', (req, res) => {
  // find the post first
  db.findById(req.params.id)
    .then(p => {
      //post is found, remove the post and send response
      db.remove(req.params.id)
        .then(res.status(200).json(p))
        // send error message if post cannot be deleted
        .catch(err =>
          res.status(500).json({error: 'The post could not be removed.'}),
        );
    })
    // send error message if post cannot be found
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: 'The post with the specified ID does not exist'}),
    );
});

// listen up, server
server.listen(5000);
