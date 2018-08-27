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
			db.findById(id)
				.then(post=> {
					res.status(201).json(post)
				})
				.catch(err => {
					console.log(err);
				})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: "There was an error while saving the post to the database" })
		})
})

app.listen(9000, () => console.log('===server is running on port 9000==='));