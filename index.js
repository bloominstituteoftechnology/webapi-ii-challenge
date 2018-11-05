// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/', (req, res) => {
	res.json('alive');
});

// get all posts
server.get('/api/posts/', (req, res) => {
	db
		.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => err.status(500).json({ message: "Can't get post data!!" }));
});

// get post by ID
server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db
		.findById(id)
		.then((post) => {
			if (post.length <= 0) {
				res.status(404).json({ message: 'That post was not found' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((err) => err.status(500).json({ message: "Can't get that post data!!" }));
});

// add a post
// server.put('/api/posts/:id', (req, res) => {
// 	const { id } = req.params;

// 	db.insert((title, content) => {});
// });

server.listen(9000, () => console.log('The server is live'));
