// import your node modules
const express = require('express');

const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.listen(8000, () => console.log('API running on port 8000'));
