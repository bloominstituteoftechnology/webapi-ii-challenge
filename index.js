const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const db = require('./data/db.js');
const port = 3000;

server.use(bodyParser.json());

// Get all posts.
server.get('/api/posts', (req, res) => db.find().then( posts => res.json(posts)));

// Get post by id.
server.get('/api/posts/:id', (req, res) => db.findById(req.params.id).then( post => res.json(post)));

// Insert a new post.
server.post('/api/posts', (req, res) => db.insert(req.body).then( id => res.json(id)));

// Update a post.
server.put('/api/posts/:id', (req, res) => db.update(req.params.id, req.body).then( count => res.json(count)));

// Delete a post.
server.delete('/api/posts/:id', (req, res) => db.remove(req.params.id).then( count => res.json(count)));

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
