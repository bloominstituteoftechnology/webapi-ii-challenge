// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
  res.send("what's up ma brutha?")
});

server.get('/api/users', (req, res) => {
  db.find().then((results) => {
    res.status(200).json(results);
  })
});

server.listen(8000, () => console.log('API running on port 8000'))
