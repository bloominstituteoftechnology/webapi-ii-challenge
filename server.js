const express = require('express') //importing in express

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Test<h1>`)
})

module.exports = server;