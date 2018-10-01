// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(cors());

server.get('/', (req, res) => {
	db.find()
		.then(users => res.json(users))
		.catch(err => console.log(err))
});

const port = 5000;
server.listen(port, () => console.log(`\n=== Listening on port ${ port } ===`));
