// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
// const bodyParser = require('body-parser');

// add your server code starting here

// server.use(bodyParser.json());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to your training day user');
} );

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    })
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(post);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
});

server.post('/api/posts', (req, res) => {
    const { title, contents, created_at, updated_at } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
        return;
    }
    db.insert({
        title,
        contents,
        created_at,
        updated_at
    })
    .then(response => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.error('error', err);
        res.status(500).json({ error: 'There was an error while saving the post to the database' });
        return;
    })
})

server.listen(5000, () => console.log('/n== API on port 5k==/n') );