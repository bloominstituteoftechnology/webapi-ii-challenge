const express = require('express');
// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const server = express();

// start db
server.get('/', (req, res) => {
  res.send('API running');
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
