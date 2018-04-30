const express = require('express');
const db = require('./data/db.js');
const server = express();

// route handler
server.get('/', (req, res) => {
  res.send("your api is running");
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(err => req.status(500).json({ error: "The posts information could not be retrieved." }) )
})

server.get('/api/posts/:id', (request, response) => {
  const { id } = request.params;
  db.findById(id)
    .then(post => {
      post.length === 0 ? 
        response.status(404).json({ error: "The post with the specified ID does not exist." }) :
        response.json(post[0])
    })
    .catch(error => response.status(500).json({ error: "The post information could not be retrieved." }))
})

server.listen(5000);