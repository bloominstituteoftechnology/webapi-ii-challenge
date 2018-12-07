// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());

server.get('/api/users', (req, res) => {
	db.find()
		.then(users => {
			console.log('\n** users **', users);
			res.json(users)})
		.catch(err => res.send(err))
});

const port = 9000;
server.listen(port, () => console.log(`API running on port ${port}`));