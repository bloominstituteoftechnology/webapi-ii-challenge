const express = require('express');
const server = express();
const router = require('./data/route')

server.use(express.json())

server.use('/api/posts', router);
server.get('/', (req, res) => {
    res.send('Node is running')
})
module.exports = server

