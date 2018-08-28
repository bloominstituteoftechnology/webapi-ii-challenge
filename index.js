const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/api/posts', async (req, res) => {
	try {
		const posts = await db.find();
		res.status(200).json(posts);
	}
	catch(err) {
		res.status(500).json({ error: 'The posts information could not be retrieved.' })
	}
});

app.post('/api/posts', async (req, res) => {
	if (!req.body || !req.body.title || !req.body.contents) {
		res.status(400).json({ error: 'The posts information could not be retrieved.' })
	}
	try {
		const id = await db.insert(req.body);
		const post = await db.findById(id.id);
		res.status(200).json(post);
	}
	catch(err) {
		res.status(500).json({ error: "There was an error while saving the post to the database" });
	}
})

app.get('/api/posts/:id', async (req, res) => {
	try {
		const post = await db.findById(req.params.id);
		post.length < 1 
		? res.status(404).json({ error: 'The post with the specified ID does not exist.' })
		: res.status(200).json(post)
	}
	catch(err) {
		res.status(500).json({ error: 'The post information could not be retrieved' });
	}
});

app.delete('/api/posts/:id', async (req, res) => {
	try {
		const deleted = await db.remove(req.params.id);
		deleted < 1 
		? res.status(404).json({ error: 'The post with the specified ID does not exist' })
		: res.status(200).json({ message: 'Succesfully deleted' })
	}
	catch(err) {
		res.status(500).json({ error: 'The post could not be removed' });
	}
})

app.put('/api/posts/:id', async (req, res) => {
	if (!req.body || !req.body.title || !req.body.contents) {
		res.status(400).json({ error: 'Please provide title and contents for the post.' })
	}
	try{
		const updated = await db.update(req.params.id, req.body);
		updated < 1
		? res.status(404).json({ error: 'The post with the specified ID does not exist.' })
		: res.status(200).json({ message: 'Succesfully updated' })
	}
	catch(err) {
		res.status(500).json({ error: "The post information could not be modified." })
	}
})

app.listen(9000, () => console.log('===server is running on port 9000==='));