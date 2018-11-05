// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.listen(4000, (req, res) => console.log('Server started on port 4000'));
