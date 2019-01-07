// import your node modules

const db = require('./data/db.js');

// add your server code starting here
// implement your API here
const express = require("express");

const server = express();

server.get("/api/posts", (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json({ posts });
		})
		.catch(() => {
			res.status(500).json({ error: "The posts information could not be retrieved." });
		});
});

server.get("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	db.findById(id)
		.then(post => {
            if(post.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post);
            }
		})
		.catch(() => {
			res.status(500).json({ error: "The post information could not be retrieved." });
		});
});

server.listen(5000, () => console.log("Server running"));
