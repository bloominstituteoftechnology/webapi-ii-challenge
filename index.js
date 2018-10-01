// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/posts', (req, res) => {
	db.find()
		.then(users => res.json(users))
		.catch(err => console.log(err))
});

server.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id)
		.then(user => res.json(user))
		.catch(err => console.log(err))
});

server.post('/api/posts', (req, res) => {
	db.insert(req.body)
		.then(id => res.json(id))
		.catch(err => console.log(err))
});

server.delete('/api/posts/:id', (req, res) => {
	db.remove(req.params.id)
		.then(id => res.json(id))
		.catch(err => console.log(err))
});

const port = 5000;
server.listen(port, () => console.log(`\n=== Listening on port ${ port } ===`));
