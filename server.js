// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ message: 'Error getting the data' })
        });
})

server.listen(8000, () => console.log('\n== API on port 8k ==\n'));
