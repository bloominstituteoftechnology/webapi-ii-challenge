// import your node modules
const express = require('express');
const helmet = require('helmet');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(helmet());
server.use(express.json());
