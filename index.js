// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());

server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			console.log('\n** posts **', posts);
			res.json(posts)})
		.catch(err => res.send(err))
});

const port = 9000;
server.listen(port, () => console.log(`API running on port ${port}`));