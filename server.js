// import your node modules
const express = require("express");
const helmet = require("helmet");
const server = express();
const db = require("./data/db");

// middleware
server.use(helmet()); // 3rd party pkg
server.use(express.json()); // opting in to using json

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

// POST /api/posts
server.post("/api/posts", (req, res) => {
	const post = req.body;

	if (post.title.length === 0 || post.contents.length === 0) {
		res
			.status(400)
			.json({ error: "Please provide title and contents for the post." });
	} else {
		db
			.insert(post)
			.then(res.status(201).json(post))
			.catch(err => {
				res.status(500).json({
					error: "There was an error while saving the post to the database"
				});
			});
	}
});

// DELETE /api/posts/:id
server.delete("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	let user;

	db
		.findById(id)
		.then(users => {
			user = { ...users[0] };
			db.remove(id).then(response => {
				if (response === 0) {
					res.status(404).json({
						message: "The post with the specified ID does not exist."
					});
				} else {
					res.status(200).json(user); // user that was deleted;
				}
			});
		})
		.catch(err => {
			// error removing post - error 500
			res.status(500).json({ error: "The post could not be removed" });
		});
});

// PUT /api/posts/:id

server.put("/api/posts/:id", (req, res) => {
	// define id and object params for PUT request
	const id = req.params.id;
	const update = req.body;

	db
		.update(id, update)
		.then(count => {
			// post found and new info is valid - code 200 return updated post
			if (count > 0) {
				db.findById(id).then(users => {
					res.status(200).json(users[0]);
				});
			} else {
				// id not found - error 404
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			}
		})
		.catch(err => {
			// could not update post - error 500
			res
				.status(500)
				.json({ error: "The post information could not be modified." });
		});
});

server.listen(5000, () => {
	console.log("\n== API Running on port 5000 ==\n");
});
