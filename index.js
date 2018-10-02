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

server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			console.log('\n=== HERE ARE THE POSTS AS REQUESTED, SIR ===\n\n', posts);
			res.status(200).json(posts);
		})
		.catch(err => res.send(err));
});

server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(post => {
			if (!post[0]) {
				return res.status(422).send({ Error: `NO POSTS WITH ID ${id}` });
			}
			console.log('\n=== I FOUND IT, SIR ===\n\n', post[0]);
			res.status(200).json(post);
		})
		.catch(err => res.send(err));
});

server.post('/api/posts', (req, res) => {
	console.log(req.body);
	const { title, contents } = req.body;
	const newPost = { title, contents };
	db.insert(newPost)
		.then(postId => {
			const { id } = postId;
			db.findById(id).then(post => {
				if (!post[0]) {
					return res.status(422).send({ Error: `NO POSTS WITH ID ${id}` });
				}
				console.log('\n=== POST ADDED SUCCESSFULLY, SIR ===\n\n', post[0]);
				res.status(200).json(post);
			});
		})
		.catch(err => red.send(err));
});

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then(removedPost => {
			console.log(removedPost);
			res.status(200).json(removedPost);
		})
		.catch(err => console.error(err));
});

const port = 5000;
server.listen(port, () =>
	console.log(`\n=== WATCHING PORT ${port} FOR FURTHER INSTRUCTIONS, SIR ===\n`)
);
