const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const db = require('./data/db.js');
const port = 3000;

server.use(bodyParser.json());

// Get all posts.
server.get('/api/posts', (req, res, next) => db.find().then( posts => res.json(posts)).catch(next));

// Get post by id.
server.get('/api/posts/:id', (req, res, next) => {

  db.findById(req.params.id).then( post => {
    if (post.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      res.json(post)
    }
  }).catch(next);

});

// Insert a new post.
server.post('/api/posts', (req, res, next) => {

  if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('contents')) {
    db.insert(req.body).then( id => res.json(id)).catch(next);
  } else {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'});
  }
});

// Update a post.
server.put('/api/posts/:id', (req, res, next) => {

  if (req.body.hasOwnProperty("title") && req.body.hasOwnProperty("contents")) {
    db.update(req.params.id, req.body).then( count => {
      if (count === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } else {
        res.json(count);
      }
    }).catch(next);
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
});

// Delete a post.
server.delete('/api/posts/:id', (req, res, next) => {
  db.remove(req.params.id).then( count => {
    if (count === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      res.json(count);
    }
  }).catch(next);
});

server.use((err, req, res, next) => {
  console.log(err);

  switch(req.method) {
    case 'GET':
      res.status(500).json({ error: "The posts information could not be retrieved." });
      break;
    case 'POST':
      res.status(500).json({ error: "There was an error while saving the post to the database" });
      break;
    case 'PUT':
      res.status(500).json({ error: "The post information could not be modified." });
      break;
    case 'DELETE':
      res.status(500).json({ error: "The post could not be removed" });
      break;
    default:
      break;
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
