const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});



server.listen(3000, () => console.log('API running on port 3000'));