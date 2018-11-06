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
server.put('/api/posts', (req, res) => {
	const post = req.body;
	const posts = db.posts;
	posts.push(post);
	req.status(201).json(posts);
});

// delete a post

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params.id;
	res
		.status(200)
		.json({
			url: `/api/posts/${id}`,
			operation: `Delete for post with id ${id}`
		})
		.catch((err) => err.status(500).json({ message: 'Could not delete that user' }));
});

const port = 9000;

server.listen(port, () => console.log(`The port is OVER ${port}!!`));
