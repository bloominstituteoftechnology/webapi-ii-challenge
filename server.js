const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

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



server.post('/api/posts', (req, res) => {
 
	const {title, contents} = req.body;
  	const post = {title, contents};

	if (!title || !contents) {
                res.status(400).json({errorMessage: "Please provide title and content for the post."});
        }

	else{

  	const request = db.insert(post);

        request.then(response => {
                res.json(response);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the user to the database" });
        })

	}  });





server.listen(9000, () => console.log('API running on port 9000'));
