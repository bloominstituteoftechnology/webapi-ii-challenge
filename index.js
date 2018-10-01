// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

server.get('/', (req, res) => {
	// request/route handler
	res.send('<h1>WHO SAID IT?</h1>');
});

server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			console.log('\n=== HERE ARE THE POSTS AS REQUESTED, SIR ===\n\n', posts);
			res.json(posts);
		})
		.catch(err => res.send(err));
});

const port = 5000;
server.listen(port, () =>
	console.log(`\n=== WATCHING PORT NUMBER ${port}, SIR ===\n`)
);
