// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(express.json()); // formatting our req.body obj to json

server.get('/', (req, res) => {
	res.json('alive');
});

// get all posts
server.get('/api/posts/', (req, res) => {
	db
		.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => err.status(500).json({ message: "Can't get post data!!" }));
});

// get post by ID
server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db
		.findById(id)
		.then((post) => {
			post.length <= 0
				? res.status(404).json({ message: 'That post was not found' })
				: res.status(200).json(post);
		})
		.catch((err) => err.status(500).json({ message: "Can't get that post data!!" }));
});

// add a post
server.post('/api/posts/', async (req, res) => {
	console.log('body', req.body);
	//promises version
	// db.insert(req.body).then(postData => {
	// 	res.status(201).json(postData);
	// })
	// .catch(error => res.status(500).json({ message: 'error creating user', error }));

	//async and await version
	try {
		const postData = req.body;
		const post = await db.insert(postData);
		res.status(201).json(postData);
	} catch (err) {
		res.status(500).json({ message: 'error creating post', error });
	}
});

// delete a post

server.delete('/api/posts/:id', (req, res) => {
	db
		.remove(req.params.id)
		.then((count) => {
			count
				? res.status(200).json({ message: 'Post deleted successfully' })
				: res.status(404).json({ message: 'That post was not found or already deleted' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error deleting post' });
		});
});

// update a post

server.put('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db
		.update(id, changes)
		.then((count) => {
			count
				? res.status(200).json({ message: 'Post updated successfuly' })
				: res.status(404).json({ message: 'That post was not found or already updated' });
		})
		.catch((err) => {
			res.status(500).json({ message: 'error updating post', err });
		});
});

// query search by id or post

server.get('/posts/', (req, res) => {
	const { id } = req.query;

	if (id) {
		db.findById(id).then((posts) => res.send(posts));
	} else {
		db.find().then((posts) => res.send(posts));
	}
});

const port = 9000;

server.listen(port, () => console.log(`The port is OVER ${port}!!`));
