const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Node Express Lab')
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





server.listen(3000, () => console.log('This is working'));