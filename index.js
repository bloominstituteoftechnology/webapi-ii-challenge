const helpers = require('./data/db');
const express = require('express');

const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
    helpers.find()
    .then(allPosts => {
        res.json(allPosts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

const port = 4000;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})