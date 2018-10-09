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

server.listen(8000, () => console.log('API running on port 8000'));
