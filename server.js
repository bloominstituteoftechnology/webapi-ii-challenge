const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Node Express Lab')
})

server.post('/api/posts', (req, res) => {
    if(!req.body || !req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post' })
    }
    db.insert(req.body)
        .then(data => {
            db.findById(data.id)
                .then(post => {
                    res.status(201).json(post)
                })
                .catch(err => {
                    res.status(500).json({ error: 'There was an error accessing the database' })
                })
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the post to the database.' })
        })
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Could not get your info '})
        })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: 'The post information could not be retrieved.' })
        })
})

server.listen(3000, () => console.log('WORKING'));