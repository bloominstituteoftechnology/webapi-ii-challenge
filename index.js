// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();
const port = 8000;
server.listen(port, () =>
	console.log(`server started listening on port ${port}`)
);
// add your server code starting here
server.get("/", (req, res) => {
	res.send(
		`<h1>Welcome! Type /api/posts at the end of your localhost:${port} to get started!</h1>`
	);
});
server.get("/api/posts", (req, res) => {
	db.find()
		.then(posts => res.json(posts))
		.catch(err => res.send(err));
});
