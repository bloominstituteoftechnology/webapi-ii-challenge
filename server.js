// import your node modules
const express = require('express');
const db = require('./data/db.js');
const port = 5000;

const server = express();
server.use(express.json());

// add your server code starting here



server.listen(port, () => console.log(`Magic Happening on port ${port}`))