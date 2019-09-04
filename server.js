const express = require('express'); //import express;
const server = express();

//sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up....' });
});

//Export
module.exports = server;
