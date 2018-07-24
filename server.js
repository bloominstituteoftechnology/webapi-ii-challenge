const express = require('express');
const db = require('./data/db.js');

const server = express();


server.get('/', (req, res) => {
	res.send('Test');

});


server.get('/api/posts', (req, res) => {
	const request = db.find();

	request.then(response => {
	res.status(200).json(response);
	})

	.catch(err => {
	res.status(404).json({error: "The posts information could not be retrieved."});
	})

});

server.get('/api/posts/:id', (req, res) => {
	const id = req.params.id;

        const request = db.findById(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The user with the specified ID does not exist."});
        })

});





server.listen(9000, () => console.log('API running on port 9000'));
