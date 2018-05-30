// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const port = 5000;
const server = express();

server.listen(port, () => console.log(`Server running on port ${port}`));
