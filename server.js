const express = require('express');

const db = require('./data/db.js');

const server = express();


server.get('/', (req, res) => {
    res.send('API running');
});

server.post('/api/posts', (req, res) => {
    let title = req.body;
    let contents = req.body;
    const id = req.params.id;
    const post = { title, contents, id };
    db
        .insert(post)
        .then(post => {
            res.json(post);
        })
        .catch(err => { 
            res.status(500).json({ error: err });
        });
        if ( !title || !contents ) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.json(post);
        }
})

server.get('/api/posts/', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => { 
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(posts => {
            if (posts.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            } else {
                res.json(posts);
            }
        })
        .catch(err => { 
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
})

server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'));