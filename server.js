// import your node modules
const express = require('express');
const helmet = require ('helmet');
const server = express();
const port = 8000;
const db = require('./data/db.js');

server.use(helmet());
server.use(express.json());

// add your server code starting here

server.listen(port, () => console.log(`Server is listening on port ${port}`))
