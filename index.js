// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();

const cors = require("cors");
server.use(cors());
server.use(express.json());

// add your server code starting here
server.get("/api/posts/", (req, res) => {
	db.find()
		.then(posts => res.json(posts))
		.catch(() =>
			res
				.status(500)
				.json({ error: "The posts information could not be retrieved." })
		);
});
server.get("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(posts => res.json(posts))
		.catch(() =>
			res
				.status(404)
				.json({ message: "The post with the specified ID does not exist." })
		);
});

server.post("/api/posts/", (req, res) => {
	const { title, contents } = req.body;
	const newPost = { title, contents };
	if (!title || !contents) {
		res.status(400).json({
			errormessage: "Please provide title and contents for the post."
		});
	} else {
		db.insert(newPost)
			.then(postId => {
				const { id } = postId;
				db.findById(id)
					.then(post => {
						res.status(201).json(post[0]);
					})
					.catch(() =>
						res.status(500).json({
							error: "there was an error while saving the post to the database."
						})
					);
			})
			.catch(err => res.status(204).json(err));
	}
});

server.put("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	const { title, contents } = req.body;
	const thisPost = { title, contents };
	if (!title || !contents) {
		res.status(400).json({
			error: "Please provide title and contents for the post."
		});
	} else {
		db.update(id, thisPost)
			.then(updatedPost => {
				if (updatedPost === 1) {
					db.findById(id)
						.then(posts => res.status(200).json(posts))
						.catch(() =>
							res.status(404).json({
								message: "The post with the specified ID does not exist."
							})
						);
				} else {
					res
						.status(500)
						.json({ error: "The post information could not be modified." });
				}
			})
			.catch(() =>
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." })
			);
	}
});

server.delete("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	const deletedPost = db
		.findById(id)
		.then(post => {
			console.log(post[0]);
			return post[0];
		})
		.catch(() =>
			res.status(404).json({
				message: "The post with the specified ID does not exist."
			})
		);
	db.remove(id).then(removedPost => {
		if (!removedPost) {
			res.status(500).json({ error: "The post could not be removed" });
		} else {
			res.status(200).json(deletedPost._rejectionHandler0);
		}
	});
});

const port = 8000;
server.listen(port, () =>
	console.log(`server started listening on port ${port}`)
);
