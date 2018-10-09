// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(cors());

server.get('/', (req, res) => {
	res.send('<h1>Posts</h1>');
});

server.get('/api/posts', (req, res) => {
	db.find()
		.then((posts) => {
			console.log('POSTS', posts);
			res.status(200).json(posts);
		})
		.catch((error) =>
			res
				.status(500)
				.json({ error: 'The post information could not be retrieved.' })
		);
});

server.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id)
		.then((post) => {
			console.log('POST', post);
			res.json(post);
		})
		.catch((error) => res.send(error));
});

server.post('/api/posts', (req, res) => {
	const { title, contents } = req.body;
	db.insert({ title, contents })
		.then((response) => {
			res.json(response);
		})
		.catch((error) => {
			res.json(error);
		});
});

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then((deletePost) => {
			if (deletePost) {
				res.status(200).json({ message: 'Post Successfully Deleted!' });
			} else {
				res.status(404).json({ error: `Post with Id: ${id}, does not exist` });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: "Post Can't Be Removed" });
		});
});

server.put('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	const { title, contents } = req.body;
	const newPost = { title, contents };
	if (!title || !contents) {
		return res
			.status(400)
			.json({ error: 'Please provide title and contents for the post.' });
	}
	db.update(id, newPost)
		.then((post) => {
			res.status(200).json(post);
			if (post) {
				res.status(200).json(newPost);
			} else {
				res.status(404).json({ error: `Post with Id: ${id}, does not exist` });
			}
		})
		.catch((error) => {
			res.status(500).json({ error: 'This post cannot be changed' });
		});
});

server.listen(8000, () => console.log('API running on port 8000'));
