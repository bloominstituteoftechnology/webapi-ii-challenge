// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.send('Hello, Kelly');
})

server.post('/api/posts', (req,res) => {
	if (!req.body.title || !req.body.contents) {
		res.status(400);
		res.json({ errorMessage: "Please provide title and contents for the post." });
	}
	else {

	const { title, contents } = req.body;
	db.insert({ title, contents })
		.then(response => {
			res.status(201);
			db.findById(response.id)
				.then(posts => {
					res.json({ posts });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the post to the database."});
			})
	}
})

server.get('/api/posts', (req, res) => {
	db.find().then(posts => {
		res.json({ posts });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post information could not be retrieved."});
		})
});

server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db.findById(req.params.id).then(posts => {
		if (posts.length > 0) {
			res.json({ posts });
		}
		else {
			res.status(404);
			res.json({ message: "The post with the specified ID does not exist."});
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post information could not be retrieved." });
		})
});

server.put('/api/posts/:id', (req, res) => {
	if (req.body.title && req.body.contents) {
		res.status(200);
		res.json({ user });
	}
	else if (!req.body.title || !req.body.contents) {
		res.status(400);
		res.json({ errorMessage: "Please provide title and contents for the user." })
	}
	else {
		const { id } = req.params
		const { title, contents } = req.body
		db.update(id, { title, contents }).then(success => {
			if (posts.length > 0 ) {
				res.json({ success });
			}
			else {
				res.status(404);
				res.json({ message: "The post with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The post could not be found." });
			})
}
})

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params
	db.remove(id).then(success => {
		if (success) {
			res.status(200);
			res.json({ success });
			}
		else {
			res.status(404);
			res.json({ message: "The post with the specified ID does not exist." })
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post could not be removed." });
			})
	})


server.listen(port, () => console.log(`Server running on port ${port}`));
