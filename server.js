const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

const cors = require('cors');

server.use(express.json());

server.use(cors());

server.get('/', (req, res) => {
	res.send(`
	<h2>One Ring to Rule them All...</h2>
	`);
});

server.use('/api/posts', postsRouter);

module.exports = server;
