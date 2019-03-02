const express = require('express');
const db = require('./db.js');
const router = express.Router();

// POST
/*router.post('/', async (req, res) => {
	const { title, contents } = req.body;
	try {
		if (title && contents) {
			const 
		}
	}
});*/

// GET ALL
router.get('/', async (req, res) => {
	try {
		const posts = await Posts.find();
		res.json(posts);
	}
	catch (err) {
		res.status(500)
			.json({ error: "The posts information could not be retrieved." });
	}
});


module.exports = router;