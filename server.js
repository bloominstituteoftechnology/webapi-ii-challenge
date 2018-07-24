// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware
server.use(express.json());

//route handlers
server.get('/', (req, res) => {

  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
	db.find()
	.then(posts => {
		res.json(posts);
	})
	.catch(err => {
		res.status(500).json({error: "Please provide title and contents for the post."});
	});
});






// add your server code starting here
server.listen(3000, () => console.log('API is running'));
