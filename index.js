const db = require('./data/db.js');
const cors = require('cors')
const express = require('express');
const port = 8000;
const server = express();

server.use(cors())
server.use(express.json());

server.get('/', (req, res) => {
	res.send('hello from express');
})

server.post('/api/posts', (req, res) => {
	const {title, contents} = req.body;
	if (!req.body.title || !req.body.contents){
		res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
	} else {
		db
		.insert({title, contents}).then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({ error: "There was an error while saving the post to the database" })
		})
	}
});


server.get('/api/posts', (req, res) => {
	db
	.find()
	.then(posts => {
		res.status(200).json(posts)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ error: "The posts information could not be retrieved." })
	});
})

server.get('/api/posts/:id', (req, res) => {
	const id = req.params.id
	db
	.findById(id)
	.then(post => {
		if (!post[0]){
			res.status(404).json({ message: "The post with the specified ID does not exist." })
		} else {
			res.status(200).json(post)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ error: "The post information could not be retrieved." })
	})
})

server.put('/api/posts/:id', (req, res) => {
	const id = req.params.id
	const {title, contents} = req.body;
	if (!req.body.title || !req.body.contents){
		res.status(400).json({ errorMessage: "Please provide title and contents editing the post." });
	} else {
		db
		.update(id, {title, contents})
		.then(post => {
			console.log(post)
			if (post === 0){
				res.status(404).json({message: "The post with the specificed ID does not exist"})
			}

			if (post === 1){
				res.status(200).json(post)
			}

		})
		.catch(error => {
			console.log(error);
			res.status(500).json({error: "The post information could not be retrieved." });
		});
	}
})

server.delete('/api/posts/:id', (req, res) => {
	const id = req.params.id
	db
	.remove(id)
	.then(post => {
		if (post === 0){
			res.status(404).json({ message: "The post with the specified ID does not exist." })
		}

		if (post === 1){
			res.json({post})
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({ error: "The post could not be removed" });
	});
})


server.listen(port, () => console.log(`server running on port ${port}`));