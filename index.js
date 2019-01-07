// import your node modules
const express = require('express');

const db = require('./data/db.js');

const port = 5000;
// add your server code starting here
const server = express();

server.get('/', (req, res) => {
    res.send('<h1>Welcome to the League of Shadows</h1>')
});

server.get('/api/posts', (req,res) => {
    db.find()
    .then(posts => {
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(500).json({ error: 'The posts information could not be retrieved.'})
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })

})

server.listen(port, () => console.log(`Port: ${port}`));