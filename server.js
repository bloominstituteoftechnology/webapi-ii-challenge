const express = require('express');

const router = require('./router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', router);

server.get('/', (res, req) => {
    res.send(`
    `)
});

module.exports = server;