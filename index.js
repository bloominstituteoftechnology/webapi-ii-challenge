// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(express.json()); // formatting our req.body obj to json

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
			post.length <= 0
				? res.status(404).json({ message: 'That post was not found' })
				: res.status(200).json(post);
		})
		.catch((err) => err.status(500).json({ message: "Can't get that post data!!" }));
});

// add a post
server.post('/api/posts/', (req, res) => {
	console.log(req.body);
	const { title, content } = req.body;
	const newPost = { title, content };
	db
		.insert(newPost)
		.then((insertedPost) => {
			res.status(201).json({ message: 'Post created', insertedPost });
		})
		.catch((err) => res.send(err));
});

// delete a post

// server.delete('/api/posts/:id', (req, res) => {
// 	const { id } = req.params.id;
// 	res
// 		.status(200)
// 		.json({
// 			url: `/api/posts/${id}`,
// 			operation: `Delete for post with id ${id}`
// 		})
// 		.catch((err) => err.status(500).json({ message: 'Could not delete that user' }));
// });

const port = 9000;

server.listen(port, () => console.log(`The port is OVER ${port}!!`));
