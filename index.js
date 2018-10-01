// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors());

const port = 8000;
server.listen(port, () => {
    console.log(`\n *** API Running on Port ${port} *** \n`);
})

// server.get('/', (req, res) => {
//     res.send('Please visit /api/users/');
// })

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(error => res.send(error));
})

// POST

// GET POSTS

// GET ID

// DELETE

// PUT