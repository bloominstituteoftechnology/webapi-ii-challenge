// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

server.use(express.json());

server.get('/', (req, res) => {
	// request/route handler
	res.send('<h1>WHO SAID IT?</h1>');
});

// get posts
server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			console.log('\n=== HERE ARE THE POSTS AS REQUESTED, SIR ===\n\n', posts);
			res.status(200).json(posts);
		})
		.catch(err => {
			console.log('\n=== RAN INTO A PROBLEM, SIR ===\n\n', err);
			res
				.status(500)
				.json({ error: 'The posts information could not be retrieved.' });
		});
});

// get post by id
server.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id)
		.then(post => {
			if (!post[0]) {
				console.log("\n=== DON'T SEEM TO HAVE A POST BY THAT ID, SIR ===\n\n");
				return res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
			console.log('\n=== FOUND THE POST YOU WANTED, SIR ===\n\n', post[0]);
			res.status(200).json(post);
		})
		.catch(err => {
			console.log('\n=== RAN INTO A PROBLEM, SIR ===\n\n', err);
			res
				.status(500)
				.json({ error: 'The post information could not be retrieved.' });
		});
});

// add new post
server.post('/api/posts', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}
	db.insert(req.body)
		.then(({ id }) => {
			db.findById(id).then(post => {
				console.log('\n=== POST ADDED SUCCESSFULLY, SIR ===\n\n', post[0]);
				res.status(201).json(post[0]);
			});
		})
		.catch(err => {
			console.log('\n=== RAN INTO A PROBLEM, SIR ===\n\n', err);
			res.status(500).json({
				error: 'There was an error while saving the post to the database'
			});
		});
});

// delete post by id
server.delete('/api/posts/:id', (req, res) => {
	db.remove(req.params.id)
		.then(removedPost => {
			if (!removedPost) {
				console.log(`\n=== NO POST BY THAT ID TO DELETE, SIR ===\n\n`);
				return res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
			console.log('\n=== POST ERADICATED, SIR ===\n\n');
			res.status(204).json(removedPost);
		})
		.catch(err => {
			console.log('\n=== RAN INTO A PROBLEM, SIR ===\n\n', err);
			res.status(500).json({ error: 'The post could not be removed' });
		});
});

// update post by id
server.put('/api/posts/:id', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}
	db.findById(req.params.id).then(post => {
		if (!post[0]) {
			console.log("\n=== DON'T SEEM TO HAVE A POST BY THAT ID, SIR ===\n\n");
			return res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
		db.update(req.params.id, req.body)
			.then(post => {
				console.log('\n=== POST UPDATED, SIR ===\n\n');
				res.status(200).json(post);
			})
			.catch(err => {
				console.log('\n=== RAN INTO A PROBLEM, SIR ===\n\n', err);
				res.status(500).json({ error: 'The post could not be removed' });
			});
	});
});

// listen to port
const port = 5000;
server.listen(port, () =>
	console.log(`\n=== WATCHING PORT ${port} FOR FURTHER INSTRUCTIONS, SIR ===\n`)
);
