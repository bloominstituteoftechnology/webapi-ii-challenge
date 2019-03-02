const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('Lambda School');
});

module.exports = server;