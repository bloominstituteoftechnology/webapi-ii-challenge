// import your node modules
const db = require('./data/db.js');

const express = require('express');
const server = express();
const PORT = 3000;

// add your server code starting here

server.get('/', (req , res) => {
    res.send('Shot in the dark..')
})

server.listen(PORT, () => {
    console.log(`My server is running on port ${PORT}`);
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those posts`)
    })
})
