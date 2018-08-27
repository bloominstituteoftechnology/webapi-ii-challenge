const express = require('express');
const db = require('./data/db.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'The posts information could not be retrieved.'});
		});
});

app.post('/api/posts', (req, res) => {
	if (!req.body || !req.body.title || !req.body.contents) {
		res.status(400).json({ error: 'The posts information could not be retrieved.' })
	}
	db.insert(req.body)
		.then(id => {
			res.status(200).json(req.body);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: "There was an error while saving the post to the database" })
		})
})

app.get('/api/posts/:id', (req, res) => {
	db.findById(req.params.id)
		.then(post => {
			if (post.length < 1) {
				res.status(404).json({ error: 'The post with the specified ID does not exist.' })
			}
			else {
				res.status(200).json(post);
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'The post information could not be retrieved' })
		})
});

app.delete('/api/posts/:id', (req, res) => {
	db.remove(req.params.id)
		.then(data => {
			if (data < 1){
				res.status(404).json({ error: 'The post with the specified ID does not exist' });
			}
			else {
				res.status(200).json({ message: 'Succesfully deleted' })
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'The post could not be removed' });
		})
})

app.put('/api/posts/:id', (req, res) => {
	if (!req.body || !req.body.title || !req.body.contents) {
		res.status(400).json({ error: 'Please provide title and contents for the post.' })
	}
	db.update(req.params.id, req.body)
		.then(data => {
			if (data < 1){
				res.status(404).json({ error: 'The post with the specified ID does not exist.' });
			}
			else {
				res.status(200).json({ message: 'Succesfully updated' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: "The post information could not be modified." })
		})
})

app.listen(9000, () => console.log('===server is running on port 9000==='));