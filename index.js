// MODULES
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// SERVER SETUP
const server = express();
server.use(cors());

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
