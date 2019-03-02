const express = require('express');

const dataRoutes = require('./data/Router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', dataRoutes);


module.exports = server;