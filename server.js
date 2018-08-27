// import your node modules

const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
const server = express();

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
        rest.status(500).json({ error: 'The post information could not be retrieved.'})
    })
});

server.listen(5000, () => console.log('/n== API on port 5k==/n') );