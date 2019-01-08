// import your node modules
const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
const server = express();
// .json() comes default with express
server.use(express.json());

// handles get requests
// get all posts
server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json({ posts });
		})
		.catch(() => {
			res.status(500).json({
				error: 'The posts information could not be retrieved.',
			});
		});
});

// get one post by ID
server.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id)
		.then(post => {
			if (post.length) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			}
		})
		.catch(() => {
			res.status(500).json({
				error: 'The post information could not be retrieved.',
			});
		});
});

// handles post requests
server.post('/api/posts', (req, res) => {
	console.log('req body: ', req.body);
	const post = req.body;

	db.insert(post)
		.then(response => {
			db.findById(response.id)
				.then(newPost => {
					res.status(201).json(newPost);
				})
				.catch(err =>
					res.status(500).json({
						message: 'Error!',
						error: err,
					})
				);
		})
		.catch(err =>
			res.status(500).json({
				message: 'There was an error while saving the post to the database',
				error: err,
			})
		);
});


// creates server that listens to port 5000
server.listen(5000, () => console.log('server running'));
