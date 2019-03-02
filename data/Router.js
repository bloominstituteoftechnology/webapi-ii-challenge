const express = require('express');
const db = require('./db.js');
const router = express.Router();

// POST
router.post('/', async (req, res) => {
	const { title, contents } = req.body;
	try {
		if (title && contents) {
			const posts = await db.insert({ title, contents });
			res.status(201)
				.json(posts);
		}
		else {
			res.status(400)
				.json({ errorMessage: "Please provide title and contents for the post." });
		}
	}
	catch (err) {
		res.status(500)
			.json({ error: "There was an error while saving the post to the database" });
	}
});

// GET ALL
router.get('/', async (req, res) => {
	try {
		const posts = await db.find();
		res.json(posts);
	}
	catch (err) {
		res.status(500)
			.json({ error: "The posts information could not be retrieved." });
	}
});

// GET by ID
router.get('/:id', async (req, res) => {
	try {
		const posts = await db.findById(req.params.id);
		if (posts) {
			res.json(posts)
		}
		else {
			res.status(404)
				.json({ message: "The post with the specified ID does not exist." });
		}
	}
	catch (err) {
		res.status(500)
			.json({ error: "The post information could not be retrieved." });
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	try {
		const posts = await db.remove(req.params.id);
		if (posts) {
			res.json(posts)
		}
		else {
			res.status(404)
				.json({ message: "The post with the specified ID does not exist." });
		}
	}
	catch (err) {
		res.status(500)
			.json({ error: "The post could not be removed" });
	}
});


module.exports = router;






















