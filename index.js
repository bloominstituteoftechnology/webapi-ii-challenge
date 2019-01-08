
const db = require("./data/db.js");

const express = require("express");

const server = express();

server.use(express.json());

server.get("/api/posts", (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json({ posts });
		})
		.catch(() => {
			res.status(500).json({
				error: "The posts information could not be retrieved.",
			});
		});
});

server.get("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	db.findById(id)
		.then(post => {
			if (post.length < 1) {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			} else {
				res.status(200).json(post);
			}
		})
		.catch(() => {
			res.status(500).json({
				error: "The post information could not be retrieved.",
			});
		});
});

server.post("/api/posts", (req, res) => {
	const post = req.body;
	db.insert(post)
		.then(result => {
			if (post) {
				db.findById(result.id)
					.then(post => {
						res.status(201).json(post);
					})
					.catch(err =>
						res.status(500).json({
							errorMessage: "The POST findById failed",
							error: err,
						})
					);
			} else {
				res.status(400).json({
					errorMessage:
						"Please provide title and contents for the post.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				error:
					"There was an error while saving the post to the database",
			})
		);
});

server.put("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	const postUpdates = req.body;
	db.update(id, postUpdates)
		.then(result => {
			if (postUpdates && postUpdates.contents) {
				db.findById(result.id)
					.then(post => {
						console.log(postUpdates);
						res.status(201).json(postUpdates);
					})
					.catch(err =>
						res.status(500).json({
							errorMessage: "The PUT findById failed",
							error: err,
						})
					);
			} else {
				res.status(400).json({
					errorMessage:
						"Please provide title and contents for the post.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				error: "The post information could not be modified." ,
			})
		);
});

server.delete("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	db.findById(id)
		.then(post => {
			if (post) {
				db.remove(id).then(() => {
					res.status(200).json(post);
				});
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({ error: "The post could not be removed" })
		);
});

server.listen(5000, () => console.log("Server running"));
