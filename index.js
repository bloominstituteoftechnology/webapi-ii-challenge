// import your node modules

const db = require('./data/db.js');
const express = require('express');
const PORT = 9000;


// add your server code starting here

const server = express();

server.listen(PORT, () => console.log('Server is running on port: ' + PORT));

