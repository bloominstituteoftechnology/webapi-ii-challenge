// import your node modules
const express = require("express");
const server = express();
const db = require("./data/db");

// home
server.get("/", (req, res) => {
	res.send("API running");
});

// GET api/posts
server.get("/api/posts", (req, res) => {
	// make a request for list of posts
	// resolve by returning posts or throw an error
	db
		.find()
		.then(posts => {
			res.json(posts);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
});

// GET /api/posts/:id
server.get("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	db
		.findById(id)
		.then(posts => {
			// validate
			if (posts.length === 0) {
				res
					.status(404)
					.json({ error: "The posts information could not be retrieved." });
			} else {
				res.json(posts[0]);
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." });
		});
});

server.listen(5000, () => {
	console.log("\n== API Running on port 5000 ==\n");
});
