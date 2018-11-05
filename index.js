// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/', (req, res) => {
	res.json('alive');
});

server.get('/api/posts', (req, res) => {
	db
		.find()
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ message: 'Post not found' });
			}
		})
		.catch((err) => res.status(500).json({ message: "Can't get post data!!" }));
});

server.listen(9000, () => console.log('The server is live'));
