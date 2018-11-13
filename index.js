// import your node modules

const db = require('./data/db.js');

const express = require('express');

// add your server code starting here

const server = express();

server.listen(9000, () => console.log('hello world'));