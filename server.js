// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware
server.use(express.json());


// add your server code starting here
server.listen(3000, () => console.log('API is running'));
