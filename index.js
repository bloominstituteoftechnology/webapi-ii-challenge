// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
    res.json('HELLO!');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch( err => {
        res
        .status(500)
        .json({message : 'post could not be found'})
    })
}) 

server.listen(4000, () => {
    console.log('server is running');
})