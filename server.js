// import your node modules
const bodyParser = require("body-parser");
const express = require("express");
const server = express();
server.use(bodyParser.json());
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
	console.log(id);
	console.log(typeof id);
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
	const post = req.body.post;
	// console.log(req.body.post);
	// console.log(post.title);
	// console.log(post.title.length);
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
	// id not found - error 404
	// error removing post - error 500
});

// PUT /api/posts/:id
server.put("/api/posts/:id", (req, res) => {
	// define id and object params for PUT request
	const id = req.params.id;
	console.log(id);
	// const post = req.body.update;
	// console.log(post);

	// request body missing title or contents - error 400
	if (update.title.length || update.contents.length === 0) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	}

	db
		.findById(id)
		.then(posts => {
			// id not found - error 404
			if (posts.length === 0) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			} else {
				// post found and new info is valid - code 200 return updated post
				res.status(200).json(posts[0]);
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
