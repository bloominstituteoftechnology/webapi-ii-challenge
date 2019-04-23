const express = require('express');

const db = require('../data/db');

const router = express.Router();

//add routes

//GET
router.get('/', (req, res) => {
	db
		.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The posts information could not be retrieved.' });
		});
});

//GET by ID
router.get('/:id', (req, res) => {
	const postId = req.params.id;
	db
		.findById(postId)
		.then((post) => {
			console.log(post.length);
			if (post.length === 0) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post information could not be retrieved.' });
		});
});

//DELETE post
router.delete('/:id', (req, res) => {
	const postId = req.params.id;
	db
		.remove(postId)
		.then((post) => {
			if (!post) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(204).end();
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post could not be removed' });
		});
});

//POST
router.post('/', (req, res) => {
	const postData = req.body;
	db
		.insert(postData)
		.then((post) => {
			if (!postData.title || !postData.contents) {
				res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
			} else {
				res.status(201).json(post);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the post to the database' });
		});
});

//PUT (update) Post
router.put('/:id', (req, res) => {
	const postId = req.params.id;
	const postData = req.body;
	db
		.update(postId, postData)
		.then((post) => {
			if (!post) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
			if (!postData.title || !postData.contents) {
				res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post information could not be modified.' });
		});
});

module.exports = router;
