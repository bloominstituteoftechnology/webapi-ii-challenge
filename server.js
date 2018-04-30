// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
  res.send('API running');
});

server.get('/api/users', (req, res) => {
  // req.send('API running');
});

let port = 8999;
server.listen(port, ()=> console.log('\n== API Running on port ' + port + ' =='));