// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
      .then()
      .catch();
    
});

server.get('/api/posts/:id', (req, res) => {
    db.find()
      .then()
      .catch();
    
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
});

