// MODULES
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// SERVER SETUP
const server = express();
server.use(cors());
server.use(express.json())

// API ENDPOINTS
server.post('/api/posts', (req, res) => {
  const newPost = req.body;
  db.insert(newPost)
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ errorMessage: "Please provide title and contents for the post." }));
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }));
})

// PORT LISTENER
const port = 8000
server.listen(port, () => console.log(`=== ${port} active ===`))
