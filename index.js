// import your node modules
const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here

server.listen(9000, () => console.log('server is live'));
