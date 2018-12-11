// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

// add your server code starting here

server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The posts information could not be retrieved.' });
		});
});

server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(post => {
			if (post) {
				res.json(post);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
			res.status(200).json(post);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The post information could not be retrieved.' });
		});
});

server.listen(8000, () => console.log('API running on port 8000'));
