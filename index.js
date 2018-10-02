// import your node modules

const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');


// add your server code starting here
const server = express();
server.use(cors());

// server.post('/api/posts');

server.get('/api/posts', (req, res) => {
    db.find()
	.then(posts => {
	    console.log(`\n ** posts ** \n`, posts);
	res.json(posts);
    })
	.catch(err => res.status(500).send(err));
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
	.then(posts => {
	    console.log(`\n ** posts ** \n`, posts);
	    res.json(posts);
    })
	.catch(err => res.send(err));
});

const port = 8001;

server.listen(port, () => console.log(`\n === API running on port ${port} === \n`));
