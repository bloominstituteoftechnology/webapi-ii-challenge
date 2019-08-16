const express = require('express');
const helmet = require('helmet');

const router = require('./router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/posts', router);

server.get('/', (res, req) => {
    res.send(`
    `)
});

module.exports = server;