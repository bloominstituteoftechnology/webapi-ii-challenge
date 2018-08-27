const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Fernando');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if( post.length < 1) {
            res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        }
        else {
            res.status(200).json(post);
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));