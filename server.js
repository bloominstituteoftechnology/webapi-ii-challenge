const express = require('express');

const neonRouter = require('./neon/neon-router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/neon', neonRouter)

server.get('/', (req, res) => {
    res.send(`Welcome To Neon!`);
});

module.exports = server;