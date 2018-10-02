// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/posts', (req, res) => {
	db.find()
		.then(users => res.status(200).json(users))
		.catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

server.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id)
		.then(user => {
			if (!user.length) {
				return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
			res.status(200).json(user);
		})
		.catch(err => res.status(500).json({ message: 'The posts information could not be retrieved.' }));
});

server.post('/api/posts', (req, res) => {
	const { title, contents } = req.body;
	const newPost = { title, contents };
	if (!title || !contents || typeof(title) !== 'string' || typeof(contents) !== 'string') {
		return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
	}
	db.insert(newPost)
		.then(id => res.status(201).json(id))
		.catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database' }));
});

server.delete('/api/posts/:id', (req, res) => {
	db.remove(req.params.id)
		.then(id => {
			if (!id) {
				return res.status(404).json({ message: "The post with the specified ID does not exist." });
			}
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json({ error: "The post could not be removed" }));
});

const port = 5000;
server.listen(port, () => console.log(`\n=== Listening on port ${ port } ===`));
