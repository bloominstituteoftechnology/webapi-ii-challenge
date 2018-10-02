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
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

// PORT LISTENER
const port = 8000
server.listen(port, () => console.log(`=== ${port} active ===`))
