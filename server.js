const express = require('express');
const server = express();
const router = require('./data/router');
server.use(express.json());
server.use('.api/posts', router)




module.exports = server;