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
    .catch(err => req.status(404).json({ error: err }) )
})

server.listen(5000);