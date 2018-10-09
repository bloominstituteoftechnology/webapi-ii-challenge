// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const port = 7000;

server.listen(port, () => {console.log(`Server running on port ${port}`)});