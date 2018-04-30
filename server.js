// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

server.listen(3000);