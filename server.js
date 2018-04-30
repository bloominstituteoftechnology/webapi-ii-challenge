// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());

// add new post
server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    throw res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db
  .insert(req.body)
  .then(data => {
    res.status(201).json(req.body);
  })
  .catch(err => {
    res.status(500).json({ 
      error: "There was an error while saving the post to the database"
    });
  });
});

// get all posts
server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
});

// get specific post
server.get('/api/posts/:id', (req, res) => {
  db
  .findById(req.params.id)
  .then(post => {
    if (post.length) {
      res.json(post);
    } else {
      res.status(404).json({
        err: "The post with the specified ID does not exist."
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  });
});

// delete a post
server.delete('/api/posts/:id', (req, res) => {
  db
    .remove(req.params.id)
    .then(id => {
      if (id) {
        res.json(id);
      } else {
        res.status(404).json({
          err: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

// update post by id
server.put('/api/posts/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    throw res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db
  .update(req.params.id, req.body)
  .then(found => {
    if (found) {
      res.json(found);
    } else {
      res.status(404).json({
        err: "The post with the specified ID does not exist."
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The post information could not be modified."
    });
  });
});

server.listen(5000, console.log('\n== API Running on port 500 ==\n'));