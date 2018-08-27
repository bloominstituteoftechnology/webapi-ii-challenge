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

        res.status(500).json({ message: 'Error getting the data' });
    })
})


server.listen(5000, () => console.log('/n== API on port 5k==/n') );