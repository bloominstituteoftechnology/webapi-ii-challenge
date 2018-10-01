// MODULES
const express = require('express');
const db = require('./data/db.js');

// SERVER SETUP
const server = express();

// API ENDPOINTS
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      console.log("posts", posts);
      res.json(posts);
    })
    .catch(err => res.send(err));
})

// PORT LISTENER
const port = 8000
server.listen(port, () => console.log(`=== ${port} active ===`))
