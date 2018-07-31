// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

server.use(express.json());

// add your server code starting here


server.listen(8000, () => console.log('API running...'))

server.get('/posts', (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: 'The posts information could not be retrieved' })
        })
})