// import your node modules
const express =require('express');
const PORT = 4000;
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.listen(PORT, () =>console.log(`API running on port ${PORT}`))
