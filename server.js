const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());





module.exports = server;
