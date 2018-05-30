// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());
// add your server code starting here

server.listen(port, () => console.log(`Server running on ${port}`));