const express = require('express');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('API running');
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const id = req.params.id;
    const post = { title, contents, id };
    db
        .insert(post)
        .then(post => {
            res.status(201).json(post);
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

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(posts => {
            if (posts.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            } else {
                res.json(posts);
            }
        })
        .catch(err => { 
            res.status(500).json({ error: "The post could not be removed." });
        });
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
        db
            .update( id, req.body)
            .then(post => {
                if (post.length === 0) {
                    res.status(404).json({ message: 'The post with the specified ID does not exist.' })
                } else {
                    if ( !title || !contents ) {
                        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                    } else {
                    res.status(200).json(post);
            }}})
        .catch(err => { 
            res.status(500).json({ error: "The post information could not be modified." });
        });
})


server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'));